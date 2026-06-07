// @ts-check
'use strict';

// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { BpmEstimator } = require('./bpm-estimator');

/**
 * @extends {BpmEstimator}
 */
class RhythmBpmDetector extends BpmEstimator {
  /** @type {import('essentia.js/dist/core_api').default} */
  #essentia;
  /** @type {number} */ #inputSampleRate;
  /** @type {number} */ #sampleRate;
  /** @type {number} */ #windowSamples;
  /** @type {number} */ #hopSamples;
  /** @type {Float32Array} */ #buffer;
  #writePos = 0;
  #bufferFilled = false;
  #samplesSinceLastHop = 0;

  /**
   * @param {number} [inputSampleRate]
   * @param {number} [windowSeconds]
   * @param {number} [hopSeconds]
   */
  constructor(inputSampleRate = 48000, windowSeconds = 8, hopSeconds = 2) {
    super();
    this.#inputSampleRate = inputSampleRate;
    this.#sampleRate = 44100; // RhythmExtractor2013 requires 44100 Hz
    this.#windowSamples = Math.round(windowSeconds * this.#sampleRate);
    this.#hopSamples = Math.round(hopSeconds * this.#sampleRate);
    this.#buffer = new Float32Array(this.#windowSamples);
    this.#essentia = new Essentia(EssentiaWASM);
  }

  /** @param {Buffer} buffer */
  process(buffer) {
    const inputSamples = buffer.length / 4 / 2;

    const mono = new Float32Array(inputSamples);
    for (let i = 0; i < inputSamples; i++) {
      mono[i] = (buffer.readFloatLE(i * 8) + buffer.readFloatLE(i * 8 + 4)) * 0.5;
    }

    let resampled;
    if (this.#inputSampleRate !== this.#sampleRate) {
      const vec = this.#essentia.arrayToVector(mono);
      const inSize = inputSamples % 2 === 0 ? inputSamples : inputSamples - 1;
      const outSizeRaw = Math.round(inSize * this.#sampleRate / this.#inputSampleRate);
      const outSize = outSizeRaw % 2 === 0 ? outSizeRaw : outSizeRaw - 1;
      const result = this.#essentia.ResampleFFT(vec, inSize, outSize);
      vec.delete();
      resampled = this.#essentia.vectorToArray(result.output);
    } else {
      resampled = mono;
    }

    const samples = resampled.length;
    for (let i = 0; i < samples; i++) {
      this.#buffer[this.#writePos] = resampled[i];
      this.#writePos = (this.#writePos + 1) % this.#windowSamples;
    }

    if (!this.#bufferFilled) {
      this.#samplesSinceLastHop += samples;
      if (this.#samplesSinceLastHop >= this.#windowSamples) {
        this.#bufferFilled = true;
        this.#samplesSinceLastHop = 0;
        this.#detect();
      }
      return;
    }

    this.#samplesSinceLastHop += samples;
    if (this.#samplesSinceLastHop >= this.#hopSamples) {
      this.#samplesSinceLastHop = 0;
      this.#detect();
    }
  }

  #detect() {
    const linear = new Float32Array(this.#windowSamples);
    const tail = this.#windowSamples - this.#writePos;
    linear.set(this.#buffer.subarray(this.#writePos), 0);
    linear.set(this.#buffer.subarray(0, this.#writePos), tail);

    let rmsSum = 0;
    for (let i = 0; i < linear.length; i++) {
      const s = linear[i];
      if (!isFinite(s)) return;
      rmsSum += s * s;
    }

    if (rmsSum / linear.length < 1e-6) return;

    try {
      const vec = this.#essentia.arrayToVector(linear);
      const result = this.#essentia.RhythmExtractor2013(vec, 208, 'multifeature', 40);
      vec.delete();
      if (result?.bpm != null) this._submitBpm(result.bpm);
    } catch {}

    try {
      const vec = this.#essentia.arrayToVector(linear);
      const result = this.#essentia.Danceability(vec, 8800, 310, this.#sampleRate, 1.1);
      vec.delete();
      if (result != null) this._submitDanceability(Math.min(1, result.danceability / 3));
    } catch {}
  }
}

module.exports = { RhythmBpmDetector };
