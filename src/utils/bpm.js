// @ts-check
'use strict';

/**
 * Fold a detected BPM toward a reference using harmonic multiples (½×, 2×, 3×, ⅓×).
 * Picks the harmonic candidate closest to `ref` within a ±25% tolerance window.
 * Falls back to the raw value if no candidate is closer.
 *
 * When ref=0 (no history), applies a range bias: prefers candidates that land in
 * the 90–150 BPM sweet spot over raw values outside it, since detectors commonly
 * halve fast tempos (150–180 → 75–90) or double slow ones (60–90 → 120–180).
 *
 * @param {number} bpm  raw detected BPM
 * @param {number} ref  reference BPM (e.g. smoothed history median), 0 = no history
 * @param {number} [min=40]
 * @param {number} [max=220]
 * @returns {number}
 */
function foldBpm(bpm, ref, min = 40, max = 220) {
  const ratios = [0.5, 2, 1/3, 3];

  // No history: apply range bias toward 90–160 sweet spot.
  // Percival's autocorrelation commonly returns 2× for slow songs (70 BPM → 140)
  // and ½× for fast songs (160 BPM → 80). Only fold when it produces a strictly
  // better landing (closer to centre 120) — avoids moving genuinely moderate tempos.
  if (ref <= 0) {
    const SWEET_MIN = 90;
    const SWEET_MAX = 160;
    const CENTRE = 120;
    const inSweet = bpm >= SWEET_MIN && bpm <= SWEET_MAX;
    if (!inSweet) {
      let bestCandidate = bpm;
      let bestDist = Math.abs(bpm - CENTRE);
      for (const r of ratios) {
        const candidate = bpm * r;
        if (candidate < min || candidate > max) continue;
        if (candidate < SWEET_MIN || candidate > SWEET_MAX) continue;
        const dist = Math.abs(candidate - CENTRE);
        if (dist <= bestDist) {
          bestDist = dist;
          bestCandidate = candidate;
        }
      }
      return bestCandidate;
    }
    return bpm;
  }

  const rawDist = Math.abs(bpm - ref) / ref;
  // Don't fold if already close to ref — avoids chasing small fluctuations
  if (rawDist < 0.15) return bpm;

  let best = bpm;
  let bestRelDist = rawDist;

  for (const r of ratios) {
    const candidate = bpm * r;
    if (candidate < min || candidate > max) continue;
    const relDist = Math.abs(candidate - ref) / ref;
    // Fold only if candidate is substantially closer (≥50% relative improvement)
    if (relDist < bestRelDist * 0.5) {
      bestRelDist = relDist;
      best = candidate;
    }
  }

  return best;
}

/**
 * Compute a tempo direction scalar from energy and danceability.
 * Returns a value in [-1, +1]: negative = slow, positive = fast, 0 = unknown.
 *
 * @param {number} energy  0–1
 * @param {number} dance   0–1
 * @returns {number}
 */
function tempoDirection(energy, dance) {
  const score = (energy - 0.5) * 0.4 + (dance - 0.5) * 0.4;
  return Math.max(-1, Math.min(1, score));
}

/**
 * Checks if `detected` is ~2× or ~½ of `kickBpm`, confirmed by tempo direction.
 * Returns the corrected BPM, or `detected` unchanged if no correction applies.
 *
 * Correction fires when:
 *   - detected is within ±15% of 2× or ½ of kickBpm, AND
 *   - direction confirms the correction (slow → halve, fast → double),
 *     OR direction is near-zero (unknown → kick alone decides).
 *
 * @param {number} detected
 * @param {number} kickBpm
 * @param {number} [direction]  tempoDirection() output, default 0
 * @param {number} [tolerance]  ratio tolerance, default 0.15
 * @returns {number}
 */
function correctHarmonicError(detected, kickBpm, direction = 0, tolerance = 0.15) {
  if (!isFinite(detected) || detected <= 0) return detected;
  if (!isFinite(kickBpm) || kickBpm <= 0) return detected;

  const ratio = detected / kickBpm;

  /** @type {number | null} */
  let candidate = null;
  /** @type {boolean} */
  let directionConfirms = false;

  if (Math.abs(ratio - 2) / 2 < tolerance) {
    candidate = detected / 2;           // detected is doubled
    directionConfirms = direction < 0;  // slow direction confirms halving
  } else if (Math.abs(ratio - 0.5) / 0.5 < tolerance) {
    candidate = detected * 2;           // detected is halved
    directionConfirms = direction > 0;  // fast direction confirms doubling
  }

  if (candidate === null || candidate < 60 || candidate > 220) return detected;

  // Require directional confirmation unless direction is near-zero (uncertain)
  if (Math.abs(direction) > 0.15 && !directionConfirms) return detected;

  return candidate;
}

module.exports = { foldBpm, tempoDirection, correctHarmonicError };
