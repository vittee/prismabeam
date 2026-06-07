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

      if (result?.bpm != null) {
        const meter = this.#detectMeter(linear, result.bpm);
        this._submitBpm(this.#correctMeter(result.bpm, meter));
      }
    } catch {}

    try {
      let vec = this.#essentia.arrayToVector(linear);
      const result = this.#essentia.Danceability(vec, 8800, 310, this.#sampleRate, 1.1);
      vec.delete();
      if (result != null) this._submitDanceability(Math.min(1, result.danceability / 3));
    } catch {}
  }

  /**
   * Synthesises beat positions from bpm, runs BeatsLoudness → Beatogram → Meter.
   * Returns detected meter integer, or 4 on failure.
   *
   * @param {Float32Array} signal
   * @param {number} bpm
   * @returns {number}
   */
  #detectMeter(signal, bpm) {
    if (bpm <= 0) return 4;
    const windowDuration = signal.length / this.#sampleRate;
    const beatInterval = 60 / bpm;

    const beats = [];
    for (let t = beatInterval; t < windowDuration - beatInterval; t += beatInterval) {
      beats.push(t);
    }
    if (beats.length < 4) return 4;

    try {
      const sigVec = this.#essentia.arrayToVector(signal);
      const beatsVec = this.#essentia.arrayToVector(new Float32Array(beats));
      const blResult = this.#essentia.BeatsLoudness(
        sigVec, 0.05, 0.1, beatsVec, [20, 150, 400, 3200, 7000, 22000], this.#sampleRate
      );
      sigVec.delete();
      beatsVec.delete();

      const bgResult = this.#essentia.Beatogram(blResult.loudness, blResult.loudnessBandRatio, 16);
      const meterResult = this.#essentia.Meter(bgResult.beatogram);
      return typeof meterResult.meter === 'number' ? Math.round(meterResult.meter) : 4;
    } catch {
      return 4;
    }
  }

  /**
   * Adjusts BPM based on detected meter to handle 3/4 and 6/8 misreads.
   * - meter=3: Percival may have counted every beat as 4/4 → try ×(3/4)
   * - meter=6: compound duple, beat unit is dotted quarter → try ×(2/3) or ×(3/2)
   * Keeps correction within 50–210 BPM range.
   *
   * @param {number} bpm
   * @param {number} meter
   * @returns {number}
   */
  #correctMeter(bpm, meter) {
    /** @type {number[]} */
    let candidates;
    if (meter === 3) {
      candidates = [bpm * (3 / 4), bpm * (4 / 3)];
    } else if (meter === 6) {
      candidates = [bpm * (2 / 3), bpm * (3 / 2)];
    } else {
      return bpm;
    }

    // Pick candidate closest to sweet spot (90–160) that's in range
    const SWEET_MIN = 90, SWEET_MAX = 160;
    const inRange = candidates.filter(b => b >= 50 && b <= 210);
    if (inRange.length === 0) return bpm;

    const inSweet = inRange.filter(b => b >= SWEET_MIN && b <= SWEET_MAX);
    if (inSweet.length > 0) return inSweet[0];

    // bpm itself already in sweet spot — no correction needed
    if (bpm >= SWEET_MIN && bpm <= SWEET_MAX) return bpm;

    return inRange[0];
  }

}

module.exports = { PercivalBpmDetector };
