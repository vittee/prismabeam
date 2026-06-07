// @ts-check
'use strict';

// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { BpmEstimator } = require('./bpm-estimator');

/**
 * @extends {BpmEstimator}
 */
class PercivalBpmDetector extends BpmEstimator {
  /** @type {import('essentia.js/dist/core_api').default} */
  #essentia;
  /** @type {number} */ #sampleRate;
  /** @type {number} */ #windowSamples;
  /** @type {number} */ #hopSamples;
  /** @type {Float32Array} */ #buffer;
  #writePos = 0;
  #bufferFilled = false;
  #samplesSinceLastHop = 0;

  /**
   * @param {number} [sampleRate]
   * @param {number} [windowSeconds]
   * @param {number} [hopSeconds]
   */
  constructor(sampleRate = 44100, windowSeconds = 8, hopSeconds = 2) {
    super();
    this.#sampleRate = sampleRate;
    this.#windowSamples = Math.round(windowSeconds * sampleRate);
    this.#hopSamples = Math.round(hopSeconds * sampleRate);
    this.#buffer = new Float32Array(this.#windowSamples);
    this.#essentia = new Essentia(EssentiaWASM);
  }

  /** @param {Buffer} buffer */
  process(buffer) {
    const samples = buffer.length / 4 / 2;
    for (let i = 0; i < samples; i++) {
      this.#buffer[this.#writePos] = buffer.readFloatLE(i * 8);
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
      let vec = this.#essentia.arrayToVector(linear);
      const result = this.#essentia.PercivalBpmEstimator(
        vec, 1024, 2048, 128, 256, 210, 50, this.#sampleRate
      );
      vec.delete();
      if (result?.bpm != null) this._submitBpm(result.bpm);
    } catch {}

    try {
      let vec = this.#essentia.arrayToVector(linear);
      const result = this.#essentia.Danceability(vec, 8800, 310, this.#sampleRate, 1.1);
      vec.delete();
      if (result != null) this._submitDanceability(Math.min(1, result.danceability / 3));
    } catch {}
  }
}

module.exports = { PercivalBpmDetector };
