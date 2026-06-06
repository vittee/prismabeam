// @ts-check
'use strict';

const { TypedEmitter } = require('tiny-typed-emitter');
// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { median } = require('../../utils/math');
const { foldBpm, tempoDirection, correctHarmonicError } = require('../../utils/bpm');

/**
 * @extends {TypedEmitter<BpmDetectorEvents>}
 */
class PercivalBpmDetector extends TypedEmitter {
  /**
   * @type {import('essentia.js/dist/core_api').default}
   */
  #essentia;
  /** @type {number} */ #sampleRate;
  /** @type {number} */ #windowSamples;
  /** @type {number} */ #hopSamples;
  /** @type {Float32Array} */ #buffer;
  #writePos = 0;
  #bufferFilled = false;
  #samplesSinceLastHop = 0;
  /** @type {number[]} */ #bpmHistory = [];
  #historySize = 8;
  #lastRawBpm = 0;
  #tempoDir = 0;

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

  /**
   * @param {number} energy 0–1
   * @param {number} dance  0–1
   */
  setContext(energy, dance) {
    this.#tempoDir = tempoDirection(energy, dance);
  }

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

    {
      try {
        let vec = this.#essentia.arrayToVector(linear);
        const result = this.#essentia.PercivalBpmEstimator(
          vec,
          1024, 2048, 128, 256, 210, 50,
          this.#sampleRate
        );

        vec.delete();
        vec = undefined;

        if (result?.bpm != null) {
          let bpm = result.bpm;
          if (isFinite(bpm) && bpm >= 60 && bpm <= 220) {
            const ref = this.#bpmHistory.length >= 4
              ? median(this.#bpmHistory)
              : this.#lastRawBpm > 0
                ? this.#lastRawBpm
                : 0;
            if (ref > 0) bpm = foldBpm(bpm, ref);
            this.#lastRawBpm = bpm;
            this.#bpmHistory.push(bpm);
            if (this.#bpmHistory.length > this.#historySize) this.#bpmHistory.shift();
            this.emit('bpm', Math.round(median(this.#bpmHistory)));
          }
        }
      } catch {

      }
    }

    {
      try {
        let vec = this.#essentia.arrayToVector(linear);
        const result = this.#essentia.Danceability(vec, 8800, 310, this.#sampleRate, 1.1);
        vec.delete();
        vec = undefined;

        if (result != null) {
          this.emit('danceability', Math.min(1, result.danceability / 3));
        }
      } catch {

      }
    }
  }
}

module.exports = { BpmDetector: PercivalBpmDetector };
