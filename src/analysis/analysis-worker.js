// @ts-check
'use strict';

const { workerData, parentPort: outerPort } = require('worker_threads');
const tf = require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-backend-wasm');
// @ts-ignore
const { EssentiaModel, EssentiaWASM } = require('essentia.js');

const { BpmDetector } = require('./bpm/percival');
const { BpmDetectorRhythm } = require('./bpm/rhythm');
const { BpmDetectorTempoCNN } = require('./bpm/tempocnn');
const { FeatureExtractor } = require('./feature-extractor');
/** @type {'tempocnn' | 'rhythm' | false} */
const USE_RHYTHM_EXTRACTOR =  false;


// Essentia WASM registers its abort() as the unhandledRejection handler on import.
// Replace it so unhandled rejections exit the worker cleanly.
process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (reason) => {
  console.error('[analysis-worker] unhandledRejection:', reason);
  process.exit(1);
});

EssentiaWASM['onAbort'] = (/** @type {unknown} */ what) => {
  console.error('[analysis-worker] Essentia WASM abort:', what);
  // WASM state is now corrupted; the next essentia call will throw and kill this worker.
};

async function init() {
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

  model.predict({
    melSpectrum: Array(128).fill(Array(96).fill(0)),
    melBandsSize: 96,
    patchSize: 128,
    frameSize: 128,
  });

  let bpmDetector;
  if (USE_RHYTHM_EXTRACTOR === 'tempocnn') {
    const detector = new BpmDetectorTempoCNN(tf, workerData.tempoCnnPath, 48000);
    await detector.initialize();
    bpmDetector = detector;
  } else if (USE_RHYTHM_EXTRACTOR === 'rhythm') {
    bpmDetector = new BpmDetectorRhythm(48000, 4, 1);
  } else {
    bpmDetector = new BpmDetector(48000, 8, 2);
  }
  const extractor = new FeatureExtractor(model);

  bpmDetector.on('bpm', /** @param {number} v */ v => parentPort.postMessage({ type: 'bpm', value: v }));
  bpmDetector.on('danceability', /** @param {number} v */ v => parentPort.postMessage({ type: 'danceability', value: v }));
  extractor.on('extracted', /** @param {any[]} tags */ tags => parentPort.postMessage({ type: 'extracted', tags }));

  parentPort.on('message', (/** @type {{ type: string; buffer: ArrayBuffer }} */ msg) => {
    const buf = Buffer.from(msg.buffer);
    if (msg.type === 'rhythm') bpmDetector.process(buf);
    else if (msg.type === 'ml') extractor.process(buf);
  });

  parentPort.postMessage({ type: 'ready' });
}

init().catch(e => {
  console.error('[analysis-worker] init failed:', e);
  process.exit(1);
});
