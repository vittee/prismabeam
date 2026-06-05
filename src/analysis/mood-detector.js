// @ts-check
'use strict';

const path = require('path');
const { TypedEmitter } = require('tiny-typed-emitter');
// @ts-ignore
const { EssentiaModel, EssentiaWASM } = require('essentia.js');

const MOOD_NAMES = /** @type {const} */ (['acoustic', 'aggressive', 'happy', 'party', 'relaxed']);

/**
 * @typedef {{ acoustic: number; aggressive: number; happy: number; party: number; relaxed: number }} MoodScores
 */

/**
 * @typedef {Object} MoodDetectorEvents
 * @property { (scores: MoodScores) => any } mood
 */


/**
 * @extends {TypedEmitter<MoodDetectorEvents>}
 */
class MoodDetector extends TypedEmitter {
  /** @type {any[]} */ #models = [];
  /** @type {import('essentia.js/dist/machinelearning').EssentiaTFInputExtractor} */ #extractor;

  // mel patch accumulator (187 frames × 96 bands)
  /** @type {number[][]} */
  #melSpectrum = Array(128).fill(Array(96).fill(0));
  #frameCount = 0;
  // run inference every ~3 hops (~11.6s at 16kHz)
  #hopInterval = 3;
  #hopCount = 0;

  /** @type {string} */ #modelDir;
  /** @type {any} */ #tf;

  /**
   * @param {any} tf
   * @param {string} modelDir  path to models/mood/
   */
  constructor(tf, modelDir) {
    super();
    this.#tf = tf;
    this.#modelDir = modelDir;
    this.#extractor = new EssentiaModel.EssentiaTFInputExtractor(EssentiaWASM, 'musicnn');
  }

  async initialize() {
    for (const name of MOOD_NAMES) {
      const modelPath = `file://${path.join(this.#modelDir, name, 'model.json').replace(/\\/g, '/')}`;
      const model = new EssentiaModel.TensorflowMusiCNN(this.#tf, modelPath);
      await model.initialize();
      this.#models.push(model);
    }
  }

  /**
   * Accepts same stereo 16kHz float32 PCM as FeatureExtractor (ml stream).
   * @param {Buffer} buffer
   */
  process(buffer) {
    const sampleCount = buffer.length / 4 / 2;
    const frame = new Float32Array(512);
    let frameIdx = 0;

    for (let i = 0; i < sampleCount; i++) {
      frame[frameIdx++] = (buffer.readFloatLE(i * 8) + buffer.readFloatLE(i * 8 + 4)) * 0.5;

      if (frameIdx === 512) {
        const rms = Math.sqrt(frame.reduce((s, x) => s + x * x, 0) / 512);
        if (rms > 1e-6) {
          const computed = this.#extractor.compute(frame);
          /** @ts-ignore */
          this.#melSpectrum.push(computed.melSpectrum);
        } else {
          this.#melSpectrum.push(Array(96).fill(0));
        }
        this.#melSpectrum.shift();

        this.#frameCount++;
        frameIdx = 0;

        if (this.#frameCount >= 187) {
          this.#hopCount++;
          if (this.#hopCount >= this.#hopInterval) {
            this.#hopCount = 0;
            this.#runInference();
          }
        }
      }
    }
  }

  #runInference() {
    const features = {
      melSpectrum: this.#melSpectrum.slice(-187),
      melBandsSize: 96,
      patchSize: 128,
      frameSize: 128,
    };

    const hasSignal = features.melSpectrum.some(row => row.some(v => v > 1e-6));
    if (!hasSignal) return;

    Promise.all(
      this.#models.map(model => model.predict(features, true))
    ).then((/** @type {number[][][]} */ results) => {
      /** @type {MoodScores} */
      const scores = {
        acoustic:   0,
        aggressive: 0,
        happy:      0,
        party:      0,
        relaxed:    0,
      };

      for (let i = 0; i < MOOD_NAMES.length; i++) {
        // Each model output: [[not_mood_prob, mood_prob]]
        const pred = results[i];
        const prob = Array.isArray(pred[0]) ? pred[0][1] : pred[1] ?? 0;
        scores[MOOD_NAMES[i]] = typeof prob === 'number' ? prob : 0;
      }

      this.emit('mood', scores);
    }).catch(() => {});
  }
}

module.exports = { MoodDetector };
