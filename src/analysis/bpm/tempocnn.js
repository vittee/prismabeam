// @ts-check
'use strict';

const path = require('path');
const { TypedEmitter } = require('tiny-typed-emitter');
// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { median } = require('../../utils/math');
const { foldBpm, tempoDirection, correctHarmonicError } = require('../../utils/bpm');

// TempoCNN: output [batch, 256] softmax, classes span 30–286 BPM linearly
// bpm(i) = 30 + i * (286 - 30) / 255
const BPM_CLASSES = 256;
const BPM_CLASS_MIN = 30;
const BPM_CLASS_MAX = 286;

// TempoCNN mel params — model trained at 11025 Hz
const SAMPLE_RATE = 11025;
const FRAME_SIZE = 1024;
const HOP_SIZE = 512;
const MEL_BANDS = 40;
const PATCH_SIZE = 256;
const INFER_EVERY = 64; // run inference every N new mel frames (~3s at 11025Hz)

/**
 * @extends {TypedEmitter<BpmDetectorEvents>}
 */
class TempoCNNBpmDetector extends TypedEmitter {
  /** @type {any} */ #tf;
  /** @type {any} */ #model = null;
  /** @type {import('essentia.js/dist/core_api').default} */ #essentia;

  // Ring buffer for incoming mono samples at 16000 Hz
  #ringBuffer = new Float32Array(FRAME_SIZE + HOP_SIZE * PATCH_SIZE * 2);
  #writePos = 0;
  #sampleCount = 0;

  // Mel spectrogram accumulator: array of MEL_BANDS-length rows
  /** @type {Float32Array[]} */
  #melFrames = [];

  #framesSinceLastInfer = 0;
  #lastRawBpm = 0;
  #tempoDir = 0;

  // Smoothed BPM history
  /** @type {number[]} */ #bpmHistory = [];
  #historySize = 8;

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
   * @param {number} energy 0–1
   * @param {number} dance  0–1
   */
  setContext(energy, dance) {
    this.#tempoDir = tempoDirection(energy, dance);
  }

  /** @param {number} kickBpm */
  /** @param {number} kickBpm */
  applyKickBpm(kickBpm) {
    if (!isFinite(kickBpm) || kickBpm <= 0 || this.#bpmHistory.length < 4) return;
    const current = median(this.#bpmHistory);
    const corrected = correctHarmonicError(current, kickBpm, this.#tempoDir);
    if (corrected !== current) {
      this.#bpmHistory = [corrected];
      this.#lastRawBpm = corrected;
    }
  }

  /**
   * Process stereo interleaved float32 PCM buffer (2 ch at 16000 Hz).
   * @param {Buffer} buffer
   */
  process(buffer) {
    const inputSamples = buffer.length / 4 / 2;

    // Downmix to mono
    const mono = new Float32Array(inputSamples);
    for (let i = 0; i < inputSamples; i++) {
      mono[i] = (buffer.readFloatLE(i * 8) + buffer.readFloatLE(i * 8 + 4)) * 0.5;
    }

    // Resample to 11025 Hz
    let resampled;
    if (this.#inputSampleRate !== SAMPLE_RATE) {
      const vec = this.#essentia.arrayToVector(mono);
      const inSize = inputSamples % 2 === 0 ? inputSamples : inputSamples - 1;
      const outSizeRaw = Math.round(inSize * SAMPLE_RATE / this.#inputSampleRate);
      const outSize = outSizeRaw % 2 === 0 ? outSizeRaw : outSizeRaw - 1;
      const result = this.#essentia.ResampleFFT(vec, inSize, outSize);
      vec.delete();
      resampled = this.#essentia.vectorToArray(result.output);
    } else {
      resampled = mono;
    }

    for (let i = 0; i < resampled.length; i++) {
      this.#ringBuffer[this.#writePos] = resampled[i];
      this.#writePos = (this.#writePos + 1) % this.#ringBuffer.length;
      this.#sampleCount++;
    }

    // Extract mel frames whenever we have enough samples
    while (this.#sampleCount >= FRAME_SIZE) {
      this.#extractMelFrame();
      this.#sampleCount -= HOP_SIZE;

      this.#framesSinceLastInfer++;
      if (this.#framesSinceLastInfer >= INFER_EVERY && this.#melFrames.length >= INFER_EVERY) {
        this.#framesSinceLastInfer = 0;
        this.#runInference();
        // Keep up to PATCH_SIZE frames for context, drop oldest beyond that
        if (this.#melFrames.length > PATCH_SIZE) {
          this.#melFrames.splice(0, this.#melFrames.length - PATCH_SIZE);
        }
      }
    }
  }

  #extractMelFrame() {
    // Read FRAME_SIZE samples from ring buffer (oldest samples first)
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
        5000,               // highFrequencyBound (from essentia source)
        FRAME_SIZE / 2 + 1, // inputSize = spectrum bins
        false,              // log
        20,                 // lowFrequencyBound (from essentia source)
        'unit_tri',         // normalize
        MEL_BANDS,          // numberBands
        SAMPLE_RATE,        // sampleRate
        'magnitude',        // type
        'slaneyMel',        // warpingFormula (from essentia source)
        'warping'           // weighting
      );
      vec.delete();

      const bands = new Float32Array(MEL_BANDS);
      for (let i = 0; i < MEL_BANDS; i++) {
        bands[i] = melResult.bands.get(i);
      }

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

      // Argmax: class i = BPM_CLASS_MIN + i (matches essentia TempoCNN source)
      let argmax = 0;
      for (let i = 1; i < BPM_CLASSES; i++) {
        if (probs[i] > probs[argmax]) argmax = i;
      }

      let bpm = BPM_CLASS_MIN + argmax;

      console.log(`[TempoCNN] raw=${bpm.toFixed(1)}`);

      const ref = this.#bpmHistory.length >= 4
        ? median(this.#bpmHistory)
        : this.#lastRawBpm > 0
          ? this.#lastRawBpm
          : 0;
      if (ref > 0) bpm = foldBpm(bpm, ref, BPM_CLASS_MIN, BPM_CLASS_MAX);
      this.#lastRawBpm = bpm;

      this.#bpmHistory.push(bpm);
      if (this.#bpmHistory.length > this.#historySize) this.#bpmHistory.shift();

      this.emit('bpm', Math.round(median(this.#bpmHistory)));
    }).catch((/** @type {unknown} */ e) => {
      tensor.dispose();
      console.error('[BpmDetectorTempoCNN] inference failed:', e);
    });
  }
}

module.exports = { BpmDetectorTempoCNN: TempoCNNBpmDetector };
