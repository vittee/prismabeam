/**
 * Pure-TypeScript rhythm analysis: Percival-style EAC BPM estimation + danceability.
 * Used as fallback when the native Essentia addon is not available.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

// In-place Cooley-Tukey radix-2 DIT FFT on interleaved [re, im, re, im, ...]
function fft(re: Float64Array, im: Float64Array): void {
  const n = re.length;
  // Bit-reversal permutation
  let j = 0;
  for (let i = 1; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  // Butterfly stages
  for (let len = 2; len <= n; len <<= 1) {
    const half = len >> 1;
    const ang  = (-2 * Math.PI) / len;
    const wRe  = Math.cos(ang);
    const wIm  = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let uRe = 1, uIm = 0;
      for (let k = 0; k < half; k++) {
        const eRe = re[i + k + half] * uRe - im[i + k + half] * uIm;
        const eIm = re[i + k + half] * uIm + im[i + k + half] * uRe;
        re[i + k + half] = re[i + k] - eRe;
        im[i + k + half] = im[i + k] - eIm;
        re[i + k] += eRe;
        im[i + k] += eIm;
        const nextUre = uRe * wRe - uIm * wIm;
        uIm = uRe * wIm + uIm * wRe;
        uRe = nextUre;
      }
    }
  }
}

function median(arr: number[]): number {
  const s   = [...arr].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length & 1 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

// ---------------------------------------------------------------------------
// Onset Strength Signal
// ---------------------------------------------------------------------------

function computeOSS(
  audio:     Float32Array,
  frameSize: number,
  hopSize:   number,
): Float64Array {
  const N    = nextPow2(frameSize);
  const fftN = N;

  const prevMag = new Float64Array(fftN / 2 + 1);
  const frames  = Math.floor((audio.length - frameSize) / hopSize) + 1;
  const oss     = new Float64Array(frames);

  const re = new Float64Array(fftN);
  const im = new Float64Array(fftN);

  for (let f = 0; f < frames; f++) {
    const start = f * hopSize;

    re.fill(0);
    im.fill(0);

    // Hann window
    for (let i = 0; i < frameSize && (start + i) < audio.length; i++) {
      const w = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (frameSize - 1)));
      re[i] = audio[start + i] * w;
    }

    fft(re, im);

    // Log-compressed spectral flux (positive differences only, 20 Hz – 4 kHz)
    let flux = 0;
    const binLo = Math.round(20  / (44100 / fftN));
    const binHi = Math.round(4000 / (44100 / fftN));

    for (let b = binLo; b <= Math.min(binHi, fftN / 2); b++) {
      const mag  = Math.sqrt(re[b] * re[b] + im[b] * im[b]);
      const logM = Math.log1p(mag * 1000);
      const diff = logM - prevMag[b];
      if (diff > 0) flux += diff;
      prevMag[b] = logM;
    }

    oss[f] = flux;
  }

  // Median subtraction
  const ossArr = Array.from(oss);
  const med    = median(ossArr);
  for (let i = 0; i < oss.length; i++) oss[i] = Math.max(0, oss[i] - med);

  return oss;
}

// ---------------------------------------------------------------------------
// Enhanced Autocorrelation (EAC) – resolves octave ambiguity
// ---------------------------------------------------------------------------

function eacAt(oss: Float64Array, lag: number, maxHarmonic: number): number {
  let sum = 0;
  let count = 0;
  for (let k = 1; k <= maxHarmonic; k++) {
    const kLag = k * lag;
    if (kLag >= oss.length) break;
    let ac = 0;
    const len = oss.length - kLag;
    for (let i = 0; i < len; i++) ac += oss[i] * oss[i + kLag];
    sum += ac / (len || 1);
    count++;
  }
  return count > 0 ? sum / count : 0;
}

function parabolicPeak(values: Float64Array, idx: number): number {
  if (idx <= 0 || idx >= values.length - 1) return idx;
  const a = values[idx - 1];
  const b = values[idx];
  const c = values[idx + 1];
  const denom = 2 * (2 * b - a - c);
  if (denom === 0) return idx;
  return idx + (a - c) / denom;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function analyzeRhythm(
  audio:      Float32Array,
  sampleRate: number,
  minBpm     = 50,
  maxBpm     = 210,
  frameSize  = 2048,
  hopSize    = 256,
): { bpm: number; danceability: number } {
  const oss     = computeOSS(audio, frameSize, hopSize);
  const hopRate = sampleRate / hopSize;   // OSS frames per second

  const minLag = Math.round(hopRate * 60 / maxBpm);
  const maxLag = Math.round(hopRate * 60 / minBpm);

  if (minLag >= maxLag || maxLag >= oss.length) {
    return { bpm: 0, danceability: 0 };
  }

  const maxHarmonic = 4;
  const eacLen = maxLag - minLag + 1;
  const eacVals = new Float64Array(eacLen);

  for (let lag = minLag; lag <= maxLag; lag++) {
    eacVals[lag - minLag] = eacAt(oss, lag, maxHarmonic);
  }

  // Find best lag
  let bestIdx = 0;
  for (let i = 1; i < eacLen; i++) {
    if (eacVals[i] > eacVals[bestIdx]) bestIdx = i;
  }

  const refinedLag = parabolicPeak(eacVals, bestIdx) + minLag;
  const bpm        = hopRate * 60 / refinedLag;

  // Danceability: ratio of peak EAC to mean OSS energy (normalised 0–1)
  const ossEnergy  = oss.reduce((s, v) => s + v * v, 0) / (oss.length || 1);
  const peakEac    = eacVals[bestIdx];
  const danceability = ossEnergy > 0
    ? Math.min(1, peakEac / (ossEnergy * oss.length))
    : 0;

  return { bpm, danceability };
}
