// @ts-check
'use strict';

const { workerData, parentPort: outerPort } = require('worker_threads');
// @ts-ignore
const { Essentia, EssentiaWASM } = require('essentia.js');
const { median } = require('../utils/math');

process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (/** @type {unknown} */ reason) => {
  console.error('[energy-worker] unhandledRejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', (/** @type {unknown} */ err) => {
  console.error('[energy-worker] uncaughtException:', err);
  process.exit(1);
});

EssentiaWASM['onAbort'] = (/** @type {unknown} */ what) => {
  console.error('[energy-worker] Essentia WASM abort:', what);
  // WASM state corrupted — worker will die on next algorithm call
};

function init() {
  if (!outerPort) {
    console.error('[energy-worker] no parent port');
    process.exit(1);
  }

  const parentPort = outerPort;
  const sampleRate = /** @type {number} */ (workerData?.sampleRate ?? 44100);

  const frameSize = 2048;
  const hopSize = 256;
  // 150 ms minimum gap between onsets (in hops)
  const minGapHops = Math.ceil((sampleRate * 0.15) / hopSize);

  // Energy emission every ~50 ms (in hops)
  const energyIntervalHops = Math.max(1, Math.round((sampleRate * 0.05) / hopSize));

  /**
   * @type {import('essentia.js/dist/core_api').default}
   */
  const essentia = new Essentia(EssentiaWASM);

  // Overlap-add accumulation buffer
  const frameBuf = new Float32Array(frameSize);
  let frameFill = 0;

  // ODF state for peak-picking
  let prevOdf = 0;
  let prevPrevOdf = 0;
  let odfBackground = 0;
  let cooldownHops = 0;

  // Energy state
  let hopCount = 0;
  let rmsAccum = 0;
  let rmsCount = 0;
  let energyMax = 1e-6;
  let prevLevel = 0;
  /** @type {number[]} */
  const levelHistory = [];
  const levelHistorySize = 4;

  /** @param {Float32Array} frame */
  function processFrame(frame) {
    let frameVec, windowed, specResult, odf;
    try {
      frameVec = essentia.arrayToVector(frame);

      // Band-pass 20-150 Hz in time domain (center=85 Hz, bandwidth=130 Hz)
      const bpResult = essentia.BandPass(frameVec, 130, 85, sampleRate);
      frameVec.delete(); frameVec = null;

      windowed = essentia.Windowing(bpResult.signal, true, frameSize, 'hann', 0, false);
      bpResult.signal.delete();

      specResult = essentia.Spectrum(windowed.frame, frameSize);
      windowed.frame.delete(); windowed = null;

      const fullSpec = essentia.vectorToArray(specResult.spectrum);
      specResult.spectrum.delete(); specResult = null;

      let bandSum = 0;
      for (let b = 0; b < fullSpec.length; b++) {
        const v = fullSpec[b];
        bandSum += v * v;
      }
      odf = Math.sqrt(bandSum / fullSpec.length);
    } catch (e) {
      console.error('[energy-worker] processFrame error:', e);
      try { frameVec?.delete(); } catch { }
      try { windowed?.frame?.delete(); } catch { }
      try { specResult?.spectrum?.delete(); } catch { }
      return;
    }

    // Slow adaptive background (floor of ODF over ~3 s)
    odfBackground += (1 - Math.exp(-1 / (172 * 3))) * (odf - odfBackground);

    // Peak-pick: local max above adaptive threshold
    if (cooldownHops > 0) {
      cooldownHops--;
    } else if (prevOdf > prevPrevOdf && prevOdf > odf && prevOdf > Math.max(1e-6, odfBackground * 1.8)) {
      parentPort.postMessage({ type: 'kick' });
      cooldownHops = minGapHops;
    }

    prevPrevOdf = prevOdf;
    prevOdf = odf;

    // Emit energy every ~50 ms
    if (++hopCount >= energyIntervalHops) {
      hopCount = 0;
      const rms = Math.sqrt(rmsAccum / Math.max(1, rmsCount));
      rmsAccum = 0;
      rmsCount = 0;
      energyMax = Math.max(energyMax * 0.9995, rms);
      const raw = Math.min(1, rms / energyMax);
      levelHistory.push(raw);
      if (levelHistory.length > levelHistorySize) levelHistory.shift();
      const level = median(levelHistory);
      prevLevel = level;
      parentPort.postMessage({ type: 'energy', level });
    }
  }

  parentPort.on('message', (/** @type {{ type: string; buffer: ArrayBuffer }} */ msg) => {
    if (msg.type !== 'audio') return;

    const buf = Buffer.from(msg.buffer);
    const samples = buf.length / 4 / 2; // stereo FloatLE

    for (let i = 0; i < samples; i++) {
      const x = buf.readFloatLE(i * 8); // left channel

      rmsAccum += x * x;
      rmsCount++;

      frameBuf[frameFill++] = x;

      if (frameFill === frameSize) {
        processFrame(frameBuf.slice());
        frameBuf.copyWithin(0, hopSize);
        frameFill = frameSize - hopSize;
      }
    }
  });

  parentPort.postMessage({ type: 'ready' });
}

init();
