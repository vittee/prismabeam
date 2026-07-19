import threading
import numpy as np
import essentia.standard as es
from typing import Callable

def _median(values: list[float]) -> float:
    s = sorted(values)
    n = len(s)
    mid = n // 2
    return s[mid] if n % 2 else (s[mid - 1] + s[mid]) * 0.5



# ---------------------------------------------------------------------------
# BpmDetector  (Percival + danceability, matches percival.js behaviour)
# ---------------------------------------------------------------------------

class BpmDetector:
    def __init__(
        self,
        sample_rate: int = 48000,
        window_seconds: float = 8.0,
        hop_seconds: float = 2.0,
        on_bpm: Callable[[float], None] = None,
        on_danceability: Callable[[float], None] = None,
    ):
        self._sr = sample_rate
        self._on_bpm = on_bpm
        self._on_danceability = on_danceability
        self._lock = threading.Lock()

        self._window_samples = round(window_seconds * sample_rate)
        self._hop_samples = round(hop_seconds * sample_rate)

        self._buf = np.zeros(self._window_samples, dtype=np.float32)
        self._write_pos = 0
        self._buf_filled = False
        self._samples_since_hop = 0

        self._danceability = es.Danceability(
            maxTau=8800, minTau=310, sampleRate=float(self._sr), tauMultiplier=1.1
        )

        # BpmEstimator smoothing state
        self._history: list[float] = []
        self._history_size = 8
        self._last_detected = 0.0
        self._consecutive_outliers = 0
        self._dance_history: list[float] = []
        self._dance_history_size = 2

    def process(self, pcm: np.ndarray):
        with self._lock:
            self._feed(pcm)

    # ------------------------------------------------------------------
    # Internal
    # ------------------------------------------------------------------

    def _feed(self, mono: np.ndarray):
        samples = len(mono)
        # ring buffer write
        space = self._window_samples - self._write_pos
        if samples <= space:
            self._buf[self._write_pos:self._write_pos + samples] = mono
        else:
            self._buf[self._write_pos:] = mono[:space]
            rem = samples - space
            full, left = divmod(rem, self._window_samples)
            if left:
                self._buf[:left] = mono[space + full * self._window_samples:]
        self._write_pos = (self._write_pos + samples) % self._window_samples

        if not self._buf_filled:
            self._samples_since_hop += samples
            if self._samples_since_hop >= self._window_samples:
                self._buf_filled = True
                self._samples_since_hop = 0
                self._detect()
            return

        self._samples_since_hop += samples
        if self._samples_since_hop >= self._hop_samples:
            self._samples_since_hop = 0
            self._detect()

    def _linearize(self) -> np.ndarray:
        linear = np.empty(self._window_samples, dtype=np.float32)
        tail = self._window_samples - self._write_pos
        linear[:tail] = self._buf[self._write_pos:]
        linear[tail:] = self._buf[:self._write_pos]
        return linear

    def _detect(self):
        linear = self._linearize()

        if not np.all(np.isfinite(linear)):
            return
        if np.mean(linear ** 2) < 1e-6:
            return

        try:
            percival = es.PercivalBpmEstimator(
                frameSize=1024, frameSizeOSS=2048, hopSize=128, hopSizeOSS=256,
                maxBPM=210, minBPM=50, sampleRate=self._sr,
            )
            bpm = float(percival(linear))
            print(f'[bpm] percival raw={bpm:.1f}', flush=True)
            if bpm > 0:
                self._submit_bpm(bpm)
        except Exception as e:
            print(f'[bpm] percival error: {e}', flush=True)

        try:
            danceability, _ = self._danceability(linear)
            if danceability is not None:
                self._submit_danceability(min(1.0, float(danceability) / 3.0))
        except Exception:
            pass

    def _detect_meter(self, signal: np.ndarray, bpm: float) -> int:
        if bpm <= 0:
            return 4
        window_dur = len(signal) / self._sr
        beat_interval = 60.0 / bpm
        beats = np.arange(beat_interval, window_dur - beat_interval, beat_interval, dtype=np.float32)
        if len(beats) < 4:
            return 4
        try:
            loudness, loudness_band_ratio = es.BeatsLoudness(
                beatWindowDuration=0.1, beatDuration=0.05,
                frequencyBands=[20, 150, 400, 3200, 7000, 22000],
                sampleRate=float(self._sr),
            )(signal, beats)
            beatogram = es.Beatogram(size=16)(loudness, loudness_band_ratio)
            meter = es.Meter()(beatogram)
            return int(round(float(meter)))
        except Exception:
            return 4

    @staticmethod
    def _correct_meter(bpm: float, meter: int) -> float:
        SWEET_MIN, SWEET_MAX = 90, 160
        if meter == 3:
            candidates = [bpm * (3 / 4), bpm * (4 / 3)]
        elif meter == 6:
            candidates = [bpm * (2 / 3), bpm * (3 / 2)]
        else:
            return bpm
        in_range = [b for b in candidates if 50 <= b <= 210]
        if not in_range:
            return bpm
        in_sweet = [b for b in in_range if SWEET_MIN <= b <= SWEET_MAX]
        if in_sweet:
            return in_sweet[0]
        if SWEET_MIN <= bpm <= SWEET_MAX:
            return bpm
        return in_range[0]

    def _submit_bpm(self, raw: float):
        if not np.isfinite(raw) or raw < 55 or raw > 240:
            return
        bpm = raw
        self._last_detected = bpm

        hist_ref2 = _median(self._history) if len(self._history) >= 4 else 0.0
        is_outlier = (hist_ref2 > 0
                      and len(self._history) >= 6
                      and abs(bpm - hist_ref2) / hist_ref2 > 0.2)
        if is_outlier:
            self._consecutive_outliers += 1
            if self._consecutive_outliers >= 3:
                self._history.clear()
                self._consecutive_outliers = 0
                self._history.append(bpm)
                if self._on_bpm:
                    self._on_bpm(round(bpm))
        else:
            self._consecutive_outliers = 0
            self._history.append(bpm)
            if len(self._history) > self._history_size:
                self._history.pop(0)
            if self._on_bpm:
                self._on_bpm(round(_median(self._history)))

    def _submit_danceability(self, value: float):
        if not np.isfinite(value) or not (0 <= value <= 1):
            return
        self._dance_history.append(value)
        if len(self._dance_history) > self._dance_history_size:
            self._dance_history.pop(0)
        if self._on_danceability:
            self._on_danceability(_median(self._dance_history))
