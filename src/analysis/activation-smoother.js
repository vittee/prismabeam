// @ts-check
'use strict';

const { median } = require('../utils/math');
const { tagLabels } = require('./labels');

class ActivationSmoother {
  /** @type {Record<string, number[]>} */
  #memory = {};
  #size = 0;

  /** @param {number} [memorySize] */
  constructor(memorySize = 3) {
    this.#size = memorySize;
    for (const label of tagLabels) {
      this.#memory[label.join(':')] = Array(memorySize).fill(0);
    }
  }

  /** @param {number[]} activations */
  push(activations) {
    if (activations.length < tagLabels.length) throw new RangeError();
    if (this.#size === 1) return activations;
    return tagLabels.map((l, i) => {
      const key = l.join(':');
      this.#memory[key].shift();
      this.#memory[key].push(activations[i]);
      return /** @type {number} */ (median(this.#memory[key]));
    });
  }

  set memorySize(newSize) {
    if (newSize === this.#size) return;
    if (newSize < 1) newSize = 1;
    const diff = newSize - this.#size;
    for (const label of tagLabels) {
      const key = label.join(':');
      if (diff > 0) this.#memory[key].splice(0, 0, ...Array(diff).fill(0));
      else this.#memory[key].splice(0, -diff);
    }
    this.#size = newSize;
  }

  get memorySize() {
    return this.#size;
  }
}

module.exports = { ActivationSmoother };
