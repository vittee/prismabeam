// @ts-check
'use strict';

const { TypedEmitter } = require('tiny-typed-emitter');
const { median } = require('../../utils/math');
const { foldBpm } = require('../../utils/bpm');

/**
 * Shared BPM smoothing and outlier rejection.
 * Subclasses call `_submitBpm(raw)` and `_submitDanceability(value)`.
 *
 * @extends {TypedEmitter<BpmDetectorEvents>}
 */
class BpmEstimator extends TypedEmitter {
  /** @type {number[]} */ #history = [];
  #historySize = 8;
  #lastDetected = 0;
  #consecutiveOutliers = 0;
  /** @type {number[]} */ #danceHistory = [];
  #danceHistorySize = 8;

  /**
   * @param {number} raw  raw BPM from detector algorithm
   */
  _submitBpm(raw) {
    if (!isFinite(raw) || raw < 55 || raw > 240) return;

    let bpm = raw;

    // Use history ref only when raw is directly consistent with previous raw
    const histRef = this.#history.length >= 4 ? median(this.#history) : 0;
    const prevDetected = this.#lastDetected;
    const directlyConsistent = prevDetected <= 0 || Math.abs(bpm - prevDetected) / prevDetected < 0.2;
    const ref = directlyConsistent && histRef > 0 ? histRef : prevDetected > 0 ? prevDetected : 0;
    this.#lastDetected = bpm;
    bpm = foldBpm(bpm, ref);

    // Outlier rejection: single bad readings don't corrupt stable history
    const isOutlier = histRef > 0 && this.#history.length >= 6 && Math.abs(bpm - histRef) / histRef > 0.2;
    if (isOutlier) {
      this.#consecutiveOutliers++;
      if (this.#consecutiveOutliers >= 3) {
        // 3 consecutive outliers = song changed — reset and accept
        this.#history = [];
        this.#consecutiveOutliers = 0;
        this.#history.push(bpm);
        this.emit('bpm', Math.round(bpm));
      }
    } else {
      this.#consecutiveOutliers = 0;
      this.#history.push(bpm);
      if (this.#history.length > this.#historySize) this.#history.shift();
      this.emit('bpm', Math.round(median(this.#history)));
    }
  }

  /** @param {number} value  normalized danceability 0–1 */
  _submitDanceability(value) {
    if (!isFinite(value) || value < 0 || value > 1) return;
    this.#danceHistory.push(value);
    if (this.#danceHistory.length > this.#danceHistorySize) this.#danceHistory.shift();
    this.emit('danceability', median(this.#danceHistory));
  }
}

module.exports = { BpmEstimator };
