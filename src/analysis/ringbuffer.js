// @ts-check
'use strict';

class RingBuffer {
  #readIndex = 0;
  #writeIndex = 0;
  #framesAvailable = 0;
  /** @type {number} */ #channelCount;
  /** @type {number} */ #length;
  /** @type {Float32Array[]} */ #channelData;

  /**
   * @param {number} length
   * @param {number} channelCount
   */
  constructor(length, channelCount) {
    this.#channelCount = channelCount;
    this.#length = length;
    this.#channelData = [];
    for (let i = 0; i < channelCount; ++i) {
      this.#channelData[i] = new Float32Array(length);
    }
  }

  get framesAvailable() {
    return this.#framesAvailable;
  }

  /** @param {Float32Array[]} channels */
  push(channels) {
    const sampleCount = channels[0].length;
    for (let i = 0; i < sampleCount; ++i) {
      const writeIndex = (this.#writeIndex + i) % this.#length;
      for (let channel = 0; channel < this.#channelCount; ++channel) {
        this.#channelData[channel][writeIndex] = channels[channel][i];
      }
    }
    this.#writeIndex += sampleCount;
    if (this.#writeIndex >= this.#length) this.#writeIndex = 0;
    this.#framesAvailable += sampleCount;
    if (this.#framesAvailable > this.#length) this.#framesAvailable = this.#length;
  }

  /** @param {Float32Array[]} channels */
  pull(channels) {
    if (this.#framesAvailable === 0) return;
    const destinationLength = channels[0].length;
    for (let i = 0; i < destinationLength; ++i) {
      const readIndex = (this.#readIndex + i) % this.#length;
      for (let channel = 0; channel < this.#channelCount; ++channel) {
        channels[channel][i] = this.#channelData[channel][readIndex];
      }
    }
    this.#readIndex += destinationLength;
    if (this.#readIndex >= this.#length) this.#readIndex = 0;
    this.#framesAvailable -= destinationLength;
    if (this.#framesAvailable < 0) this.#framesAvailable = 0;
  }
}

module.exports = { RingBuffer };
