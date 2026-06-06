// @ts-check
'use strict';

const { TypedEmitter } = require('tiny-typed-emitter');
const { chain, min, max } = require('lodash');
// @ts-ignore
const { EssentiaModel, EssentiaWASM } = require('essentia.js');

const { RingBuffer } = require('../ringbuffer');
const { PatchHop } = require('../patch-hop');
const { ActivationSmoother } = require('./activation-smoother');
const { tagLabels } = require('../labels');

/**
 * @typedef {import('../analysis-manager').ActivationTag} ActivationTag
 */

/**
 * @param {ActivationTag[]} activations
 * @returns {ActivationTag[]}
 */
function normalizeActivations(activations) {
  const scores = activations.map(t => t.score);
  const maxV = /** @type {number} */ (max(scores));
  const minV = /** @type {number} */ (min(scores));
  const range = maxV - minV;
  if (range === 0) return activations;
  return activations.map(({ parentGenre, name, score }) => ({
    parentGenre,
    name,
    score: (score - minV) / range,
  }));
}

/**
 * @typedef {Object} FeatureExtractorEvents
 * @property {(tags: ActivationTag[]) => any} extracted
 */

/**
 * @extends {TypedEmitter<FeatureExtractorEvents>}
 */
class FeatureExtractor extends TypedEmitter {
  #frameSize = 512;
  #hopSize = 256;
  #channelCount = 1;
  /** @type {import('../patch-hop').PatchHop} */ #patchHop;
  /** @type {import('../ringbuffer').RingBuffer} */ #hopRingBuffer;
  /** @type {import('../ringbuffer').RingBuffer} */ #frameRingBuffer;
  /** @type {Float32Array[]} */ #hopData;
  /** @type {Float32Array[]} */ #frameData;
  /**
   * @type {import('essentia.js/dist/machinelearning').EssentiaTFInputExtractor}
   */
  #extractor;
  #activationSmoother = new ActivationSmoother(8);

  #features = {
    melSpectrum: /** @type {number[][]} */ (Array(128).fill(Array(96).fill(0))),
    frameSize: 128,
    melBandsSize: 96,
    patchSize: 128,
  };

  /** @param {any} model */
  constructor(model) {
    super();
    this.model = model;
    this.#patchHop = new PatchHop(187, 1 / 3);
    this.#extractor = new EssentiaModel.EssentiaTFInputExtractor(EssentiaWASM, 'musicnn');
    this.#hopRingBuffer = new RingBuffer(this.#hopSize * 256, this.#channelCount);
    this.#frameRingBuffer = new RingBuffer(this.#frameSize * 64, this.#channelCount);
    this.#hopData = Array(this.#channelCount).fill(new Float32Array(this.#hopSize));
    this.#frameData = Array(this.#channelCount).fill(new Float32Array(this.#frameSize));
  }

  /** @param {Buffer} buffer */
  process(buffer) {
    const sampleCount = buffer.length / 4 / 2;
    const samples = new Float32Array(sampleCount);
    for (let i = 0; i < sampleCount; i++) {
      samples[i] = (buffer.readFloatLE(i * 8) + buffer.readFloatLE(i * 8 + 4)) / 2;
    }

    this.#hopRingBuffer.push([samples]);

    while (this.#hopRingBuffer.framesAvailable >= this.#hopSize) {
      this.#frameRingBuffer.push(this.#hopData);
      this.#hopRingBuffer.pull(this.#hopData);
      this.#frameRingBuffer.push(this.#hopData);

      if (this.#frameRingBuffer.framesAvailable < this.#frameSize) break;
      this.#frameRingBuffer.pull(this.#frameData);

      const frame = this.#frameData[0];
      const rms = Math.sqrt(frame.reduce((s, x) => s + x * x, 0) / frame.length);

      if (rms > 1e-6) {
        const computed = this.#extractor.compute(frame);
        /** @ts-ignore */
        this.#features.melSpectrum.push(computed.melSpectrum);
      } else {
        this.#features.melSpectrum.push(Array(96).fill(0));
      }

      this.#features.melSpectrum.shift();
      this.#patchHop.incrementFrame();

      if (!this.#patchHop.readyToHop()) break;

      const hasSignal = this.#features.melSpectrum.some(row => row.some(v => v > 1e-6));
      if (!hasSignal) break;

      this.model.predict(this.#features, true).then((/** @type {number[][]} */[p]) => {
        const smoothed = this.#activationSmoother.push(p);
        const scoreTagMap = chain(smoothed)
          .map(/** @return {[number, string, string]} */(score, index) => [score, ...tagLabels[index]])
          .map(([score, parentGenre, name]) => ({ parentGenre, name, score }))
          .sortBy(({ score }) => -score)
          .take(5)
          .value();
        this.emit('extracted', normalizeActivations(scoreTagMap));
      }).catch((/** @type {unknown} */ e) => {
        console.error('model.predict failed:', e);
      });
    }
  }
}

module.exports = { FeatureExtractor };
