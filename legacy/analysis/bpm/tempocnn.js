// @ts-check
'use strict';

const path = require('path');
// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { BpmEstimator } = require('./bpm-estimator');

// TempoCNN: output [batch, 256] softmax, classes span 30–286 BPM linearly
// bpm(i) = 30 + i * (286 - 30) / 255
const BPM_CLASSES = 256;
const BPM_CLASS_MIN = 30;

// TempoCNN mel params — model trained at 11025 Hz
const SAMPLE_RATE = 11025;
const FRAME_SIZE = 1024;
const HOP_SIZE = 512;
const MEL_BANDS = 40;
const PATCH_SIZE = 256;
const INFER_EVERY = 64; // run inference every N new mel frames (~3s at 11025Hz)

/**
 * @extends {BpmEstimator}
 */
class TempoCNNBpmDetector extends BpmEstimator {
  /** @type {any} */ #tf;
  /** @type {any} */ #model = null;
  /** @type {import('essentia.js/dist/core_api').default} */ #essentia;

  // Ring buffer for incoming mono samples at 11025 Hz
  #ringBuffer = new Float32Array(FRAME_SIZE + HOP_SIZE * PATCH_SIZE * 2);
  #writePos = 0;
  #sampleCount = 0;

  // Mel spectrogram accumulator: array of MEL_BANDS-length rows
  /** @type {Float32Array[]} */
  #melFrames = [];

  #framesSinceLastInfer = 0;

  /** @type {string} */ #modelPath;
  /** @type {number} */ #inputSampleRate;

  /**
   * @param {any} tf
   * @param {string} modelDir
   * @param {number} [inputSampleRate] sample rate of incoming PCM (e.g. 48000)
   */
  constructor(tf, modelDir, inputSampleRate = 48000) {
    super();
    this.#tf = tf;
    this.#inputSampleRate = inputSampleRate;
    this.#modelPath = `file://${path.join(modelDir, 'model.json').replace(/\\/g, '/')}`;
    this.#essentia = new Essentia(EssentiaWASM);
  }

  async initialize() {
    this.#model = await this.#tf.loadGraphModel(this.#modelPath);
  }

  /**
   * Process stereo interleaved float32 PCM buffer (2 ch at inputSampleRate).
   * @param {Buffer} buffer
   */
  process(buffer) {
    const inputSamples = buffer.length / 4 / 2;

    const mono = new Float32Array(inputSamples);
    for (let i = 0; i < inputSamples; i++) {
      mono[i] = (buffer.readFloatLE(i * 8) + buffer.readFloatLE(i * 8 + 4)) * 0.5;
    }

    let resampled;
    if (this.#inputSampleRate !== SAMPLE_RATE) {
      const vec = this.#essentia.arrayToVector(mono);
      const inSize = inputSamples % 2 === 0 ? inputSamples : inputSamples - 1;
      const outSizeRaw = Math.round(inSize * SAMPLE_RATE / this.#inputSampleRate);
      const outSize = outSizeRaw % 2 === 0 ? outSizeRaw : outSizeRaw - 1;
      const result = this.#essentia.ResampleFFT(vec, inSize, outSize);
      vec.delete();
      resampled = this.#essentia.vectorToArray(result.output);
      result.output.delete();
    } else {
      resampled = mono;
    }

    for (let i = 0; i < resampled.length; i++) {
      this.#ringBuffer[this.#writePos] = resampled[i];
      this.#writePos = (this.#writePos + 1) % this.#ringBuffer.length;
      this.#sampleCount++;
    }

    while (this.#sampleCount >= FRAME_SIZE) {
      this.#extractMelFrame();
      this.#sampleCount -= HOP_SIZE;

      this.#framesSinceLastInfer++;
      if (this.#framesSinceLastInfer >= INFER_EVERY && this.#melFrames.length >= INFER_EVERY) {
        this.#framesSinceLastInfer = 0;
        this.#runInference();
        if (this.#melFrames.length > PATCH_SIZE) {
          this.#melFrames.splice(0, this.#melFrames.length - PATCH_SIZE);
        }
      }
    }
  }

  #extractMelFrame() {
    const ringLen = this.#ringBuffer.length;
    const startPos = (this.#writePos - this.#sampleCount + ringLen * 2) % ringLen;

    const frame = new Float32Array(FRAME_SIZE);
    for (let i = 0; i < FRAME_SIZE; i++) {
      frame[i] = this.#ringBuffer[(startPos + i) % ringLen];
    }

    let rmsSum = 0;
    for (let i = 0; i < FRAME_SIZE; i++) rmsSum += frame[i] * frame[i];
    if (rmsSum / FRAME_SIZE < 1e-10) {
      this.#melFrames.push(new Float32Array(MEL_BANDS));
      return;
    }

    try {
      const vec = this.#essentia.arrayToVector(frame);
      // normalized=false matches TensorflowInputTempoCNN C++ source
      const windowed = this.#essentia.Windowing(vec, false, FRAME_SIZE, 'hann', 0, false);
      const spectrum = this.#essentia.Spectrum(windowed.frame, FRAME_SIZE);
      const melResult = this.#essentia.MelBands(
        spectrum.spectrum,
        5000,               // highFrequencyBound
        FRAME_SIZE / 2 + 1, // inputSize = spectrum bins
        false,              // log
        20,                 // lowFrequencyBound
        'unit_tri',         // normalize
        MEL_BANDS,          // numberBands
        SAMPLE_RATE,        // sampleRate
        'magnitude',        // type
        'slaneyMel',        // warpingFormula
        'warping'           // weighting
      );
      vec.delete();
      windowed.frame.delete();
      spectrum.spectrum.delete();

      const bands = new Float32Array(MEL_BANDS);
      for (let i = 0; i < MEL_BANDS; i++) {
        bands[i] = melResult.bands.get(i);
      }
      melResult.bands.delete();

      this.#melFrames.push(bands);
    } catch {
      this.#melFrames.push(new Float32Array(MEL_BANDS));
    }
  }

  #runInference() {
    if (!this.#model) return;

    const timeFrames = Math.min(this.#melFrames.length, PATCH_SIZE);
    const n = MEL_BANDS * timeFrames;
    const data = new Float32Array(n);

    for (let t = 0; t < timeFrames; t++) {
      const row = this.#melFrames[t];
      for (let b = 0; b < MEL_BANDS; b++) {
        data[b * timeFrames + t] = row[b];
      }
    }

    // z-score normalization (TensorNormalize scaler='standard' in essentia pipeline)
    let mean = 0;
    for (let i = 0; i < n; i++) mean += data[i];
    mean /= n;
    let variance = 0;
    for (let i = 0; i < n; i++) { const d = data[i] - mean; variance += d * d; }
    const std = Math.sqrt(variance / n) || 1;
    for (let i = 0; i < n; i++) data[i] = (data[i] - mean) / std;

    const tensor = this.#tf.tensor4d(data, [1, MEL_BANDS, timeFrames, 1]);

    Promise.resolve(this.#model.predict(tensor)).then((/** @type {any} */ output) => {
      tensor.dispose();

      const probs = output.dataSync();
      output.dispose();

      let argmax = 0;
      for (let i = 1; i < BPM_CLASSES; i++) {
        if (probs[i] > probs[argmax]) argmax = i;
      }

      const bpm = BPM_CLASS_MIN + argmax;
      if (bpm < 60) return;

      this._submitBpm(bpm);
    }).catch((/** @type {unknown} */ e) => {
      tensor.dispose();
      console.error('[BpmDetectorTempoCNN] inference failed:', e);
    });
  }
}

module.exports = { TempoCNNBpmDetector };
