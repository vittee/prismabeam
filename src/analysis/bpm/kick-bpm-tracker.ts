// @ts-check

import { median } from '../../utils/math';

/**
 * Tracks kick timestamps and estimates BPM from inter-kick intervals.
 * Emits a stable BPM once enough kicks have been observed.
 *
 * @deprecated
 */
export class KickBpmTracker {
  #timestamps: number[] = [];
  #maxHistory: number;
  #minKicks: number;

  constructor(maxHistory = 12, minKicks = 4) {
    this.#maxHistory = maxHistory;
    this.#minKicks = minKicks;
  }

  kick(): void {
    this.#timestamps.push(Date.now());
    if (this.#timestamps.length > this.#maxHistory) {
      this.#timestamps.shift();
    }
  }

  /**
   * Returns kick-derived BPM, or null if not enough data.
   * Filters out intervals that deviate too far from the median (outlier rejection).
   */
  getBpm(): number | null {
    if (this.#timestamps.length < this.#minKicks) return null;

    const intervals: number[] = [];
    for (let i = 1; i < this.#timestamps.length; i++) {
      intervals.push(this.#timestamps[i] - this.#timestamps[i - 1]);
    }

    const medianInterval = median(intervals);

    // Keep only intervals within ±40% of median (reject double/missed kicks)
    const filtered = intervals.filter(iv => Math.abs(iv - medianInterval) / medianInterval < 0.4);
    if (filtered.length < this.#minKicks - 1) return null;

    const avgInterval = filtered.reduce((s, v) => s + v, 0) / filtered.length;
    const bpm = 60000 / avgInterval;

    if (!isFinite(bpm) || bpm < 60 || bpm > 220) return null;
    return bpm;
  }

  reset(): void {
    this.#timestamps = [];
  }
}
