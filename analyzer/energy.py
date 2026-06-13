import math
import threading
import numpy as np
import essentia.standard as es
from typing import Callable


def _median(values: list[float]) -> float:
    s = sorted(values)
    n = len(s)
    mid = n // 2
    return s[mid] if n % 2 else (s[mid - 1] + s[mid]) * 0.5


class EnergyDetector:
    def __init__(
        self,
        sample_rate: int = 48000,
        on_energy: Callable[[float], None] = None,
        on_kick: Callable[[], None] = None,
    ):
        self._sr = sample_rate
        self._on_energy = on_energy
        self._on_kick = on_kick
        self._lock = threading.Lock()

        self._frame_size = 2048
        self._hop_size = 256
        self._min_gap_hops = math.ceil((sample_rate * 0.15) / self._hop_size)
        self._energy_interval_hops = max(1, round((sample_rate * 0.05) / self._hop_size))

        self._frame_buf = np.zeros(self._frame_size, dtype=np.float32)
        self._frame_fill = 0

        # ODF state
        self._prev_odf = 0.0
        self._prev_prev_odf = 0.0
        self._odf_bg = 0.0
        self._cooldown = 0

        # Energy state
        self._hop_count = 0
        self._rms_accum = 0.0
        self._rms_count = 0
        self._energy_max = 1e-6
        self._level_history: list[float] = []
        self._level_history_size = 4

        # Essentia algorithms — mirror energy-worker.js exactly
        self._bandpass = es.BandPass(bandwidth=130, cutoffFrequency=85, sampleRate=float(sample_rate))
        self._windowing = es.Windowing(type='hann', normalized=False, size=self._frame_size, zeroPadding=0, zeroPhase=False)
        self._spectrum = es.Spectrum(size=self._frame_size)

        self._bg_alpha = 1.0 - math.exp(-1.0 / (172.0 * 3.0))

    def process(self, pcm: np.ndarray):
        with self._lock:
            self._feed(pcm)

    def _feed(self, mono: np.ndarray):
        # accumulate RMS from raw signal before bandpass — matches JS
        self._rms_accum += float(np.sum(mono.astype(np.float64) ** 2))
        self._rms_count += len(mono)

        # band-pass filter entire chunk with Essentia (stateless per-call)
        filtered = self._bandpass(mono)

        # feed into overlap-add frame buffer
        pos = 0
        n = len(filtered)
        while pos < n:
            space = self._frame_size - self._frame_fill
            chunk = min(space, n - pos)
            self._frame_buf[self._frame_fill:self._frame_fill + chunk] = filtered[pos:pos + chunk]
            self._frame_fill += chunk
            pos += chunk

            if self._frame_fill == self._frame_size:
                self._process_frame(self._frame_buf.copy())
                self._frame_buf[:self._frame_size - self._hop_size] = \
                    self._frame_buf[self._hop_size:]
                self._frame_fill = self._frame_size - self._hop_size

    def _process_frame(self, frame: np.ndarray):
        windowed = self._windowing(frame)
        spec = self._spectrum(windowed)
        odf = float(np.sqrt(np.mean(spec.astype(np.float64) ** 2)))

        self._odf_bg += self._bg_alpha * (odf - self._odf_bg)

        if self._cooldown > 0:
            self._cooldown -= 1
        elif (self._prev_odf > self._prev_prev_odf
              and self._prev_odf > odf
              and self._prev_odf > max(1e-6, self._odf_bg * 1.8)):
            if self._on_kick:
                self._on_kick()
            self._cooldown = self._min_gap_hops

        self._prev_prev_odf = self._prev_odf
        self._prev_odf = odf

        self._hop_count += 1
        if self._hop_count >= self._energy_interval_hops:
            self._hop_count = 0
            rms = math.sqrt(self._rms_accum / max(1, self._rms_count))
            self._rms_accum = 0.0
            self._rms_count = 0
            self._energy_max = max(self._energy_max * 0.9995, rms)
            raw = min(1.0, rms / self._energy_max)
            self._level_history.append(raw)
            if len(self._level_history) > self._level_history_size:
                self._level_history.pop(0)
            level = _median(self._level_history)
            if self._on_energy:
                self._on_energy(level)
