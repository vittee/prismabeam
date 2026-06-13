/** @deprecated */
// @ts-check
'use strict';

const { workerData, parentPort: outerPort } = require('worker_threads');
const tf = require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-backend-wasm');
// @ts-ignore
const { EssentiaModel, EssentiaWASM } = require('essentia.js');

const { PercivalBpmDetector } = require('./bpm/percival');
const { RhythmBpmDetector } = require('./bpm/rhythm');
const { TempoCNNBpmDetector } = require('./bpm/tempocnn');
const { FeatureExtractor } = require('./feature/feature-extractor');

/** @typedef {'tempocnn' | 'rhythm' | 'percival'} BpmDetectorType */

process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (reason) => {
  console.error('[analysis-worker] unhandledRejection:', reason);
  process.exit(1);
});

EssentiaWASM['onAbort'] = (/** @type {unknown} */ what) => {
  console.error('[analysis-worker] Essentia WASM abort:', what);
};

async function init(/** @type {BpmDetectorType} */ type) {
  if (!outerPort) {
    console.error('No parent ports');
    process.exit(1);
  }

  const parentPort = outerPort;

  await tf.setBackend('wasm');

  /**
   * @type {import('essentia.js/dist/machinelearning').TensorflowMusiCNN}
   */
  const model = new EssentiaModel.TensorflowMusiCNN(tf, workerData.modelPath);
  await model.initialize();

  // arrayToTensorAsBatches leaks featureTensor on every call — patch with tf.tidy
  const _modelAny = /** @type {any} */ (model);
  const _origArrayToTensor = _modelAny.arrayToTensorAsBatches.bind(model);
  _modelAny.arrayToTensorAsBatches = (/** @type {any[]} */ ...args) => {
    return tf.tidy(() => _origArrayToTensor(...args));
  };

  model.predict({
    melSpectrum: Array(128).fill(Array(96).fill(0)),
    melBandsSize: 96,
    /** @ts-ignore */
    patchSize: 128,
    frameSize: 128,
  });

  const bpmDetector = await (async () => {
    switch (type) {
      case 'tempocnn': {
        const detector = new TempoCNNBpmDetector(tf, workerData.tempoCnnPath, 48000);
        await detector.initialize();
        return detector;
      }
      case 'rhythm':
        return new RhythmBpmDetector(48000, 4, 1);
      case 'percival':
      default:
        return new PercivalBpmDetector(48000, 8, 2);
    }
  })();

  const extractor = new FeatureExtractor(model);

  bpmDetector.on('bpm', /** @param {number} v */ v => parentPort.postMessage({ type: 'bpm', value: v }));
  bpmDetector.on('danceability', /** @param {number} v */ v => parentPort.postMessage({ type: 'danceability', value: v }));
  extractor.on('extracted', /** @param {any[]} tags */ tags => parentPort.postMessage({ type: 'extracted', tags }));

  parentPort.on('message', (/** @type {{ type: string; buffer: ArrayBuffer }} */ msg) => {
    const buf = Buffer.from(msg.buffer);
    switch (msg.type) {
      case 'rhythm':
        bpmDetector.process(buf);
        break;
      case 'ml':
        extractor.process(buf);
        break;
    }
  });

  const WASM_RESTART_THRESHOLD = 128 * 1024 * 1024; // 128MB
  setInterval(() => {
    const mem = process.memoryUsage();
    const tensors = tf.memory();
    const essentiaWasmBytes = /** @type {any} */ (EssentiaWASM).HEAP8?.buffer?.byteLength ?? 0;
    console.log(`[analysis-worker] heap=${(mem.heapUsed/1e6).toFixed(1)}MB rss=${(mem.rss/1e6).toFixed(1)}MB tensors=${tensors.numTensors} tfBytes=${(tensors.numBytes/1e6).toFixed(1)}MB essentiaWasm=${(essentiaWasmBytes/1e6).toFixed(1)}MB`);
    if (essentiaWasmBytes > WASM_RESTART_THRESHOLD) {
      console.warn('[analysis-worker] Essentia WASM heap exceeded threshold, restarting');
      process.exit(0);
    }
  }, 10_000);

  parentPort.postMessage({ type: 'ready' });
}

init(process.env.BPM_DETECTOR ?? 'percival').catch(e => {
  console.error('[analysis-worker] init failed:', e);
  process.exit(1);
});
