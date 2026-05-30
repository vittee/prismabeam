// @ts-check
'use strict';

class PatchHop {
  /** @type {number} */ size;
  #frameCount = 0;

  /**
   * @param {number} patchSize
   * @param {number} ratio
   */
  constructor(patchSize, ratio) {
    this.size = Math.floor(patchSize * ratio);
  }

  incrementFrame() {
    this.#frameCount = (this.#frameCount + 1) % this.size;
  }

  readyToHop() {
    return this.#frameCount === 0;
  }
}

module.exports = { PatchHop };
