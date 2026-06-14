import threading
from collections import deque
import numpy as np
import essentia.standard as es
from typing import Callable

from labels import JAMENDO_GENRE_LABELS, JAMENDO_MOOD_LABELS

_SMOOTHING_WINDOW = 8
_SAMPLE_RATE = 16000
_MIN_SECONDS = 3.0
_HOP_SECONDS = 1.0


_MOOD_EXCLUDE = frozenset({'christmas', 'melodic'})

def _top5(scores: np.ndarray, labels: list[str]) -> list[dict]:
    lo, hi = float(scores.min()), float(scores.max())
    rng = hi - lo
    normalized = (scores - lo) / rng if rng > 0 else scores
    indexed = sorted(enumerate(normalized), key=lambda x: -x[1])[:5]
    return [{'name': labels[i], 'score': float(s)} for i, s in indexed if i < len(labels) and labels[i] not in _MOOD_EXCLUDE]


class MultiHeadTagger:
    """Single EfficientNet embedding pass → genre + mood heads."""

    def __init__(
        self,
        embedding_model_path: str,
        genre_head_path: str,
        mood_head_path: str,
        input_sample_rate: int = 48000,
        on_genre: Callable[[list], None] = None,
        on_mood: Callable[[list], None] = None,
    ):
        self._on_genre = on_genre
        self._on_mood = on_mood
        self._lock = threading.Lock()

        self._resampler = es.Resample(
            inputSampleRate=float(input_sample_rate),
            outputSampleRate=float(_SAMPLE_RATE),
        ) if input_sample_rate != _SAMPLE_RATE else None

        self._embedding_model = es.TensorflowPredictEffnetDiscogs(
            graphFilename=embedding_model_path,
            output='PartitionedCall:1',
        )

        self._genre_head = es.TensorflowPredict2D(
            graphFilename=genre_head_path,
            input='model/Placeholder',
            output='model/Sigmoid',
        )

        self._mood_head = es.TensorflowPredict2D(
            graphFilename=mood_head_path,
            input='model/Placeholder',
            output='model/Sigmoid',
        )

        self._min_samples = round(_MIN_SECONDS * _SAMPLE_RATE)
        self._hop_samples = round(_HOP_SECONDS * _SAMPLE_RATE)
        self._pcm_buf = np.zeros(0, dtype=np.float32)
        self._samples_since_hop = 0
        self._buf_filled = False

        self._genre_smoothing: deque[np.ndarray] = deque(maxlen=_SMOOTHING_WINDOW)
        self._mood_smoothing: deque[np.ndarray] = deque(maxlen=_SMOOTHING_WINDOW)

    def process(self, pcm: np.ndarray):
        with self._lock:
            self._feed(pcm)

    def _feed(self, mono: np.ndarray):
        if self._resampler is not None:
            mono = self._resampler(mono)

        self._pcm_buf = np.concatenate([self._pcm_buf, mono])

        keep = self._min_samples + self._hop_samples
        if len(self._pcm_buf) > keep:
            self._pcm_buf = self._pcm_buf[-keep:]

        if not self._buf_filled:
            if len(self._pcm_buf) >= self._min_samples:
                self._buf_filled = True
                self._samples_since_hop = 0
                self._predict()
            return

        self._samples_since_hop += len(mono)
        if self._samples_since_hop >= self._hop_samples:
            self._samples_since_hop = 0
            self._predict()

    def _predict(self):        
        audio = self._pcm_buf[:self._min_samples]

        rms = float(np.sqrt(np.mean(audio ** 2)))
        if rms < 1e-6:
            return

        try:
            embeddings = self._embedding_model(audio)
            if embeddings is None or len(embeddings) == 0:
                return

            genre_preds = self._genre_head(embeddings)
            mood_preds  = self._mood_head(embeddings)
        except Exception as e:
            print(f'[ml] predict error: {e}', flush=True)
            return

        genre_scores = genre_preds.mean(axis=0) if genre_preds.ndim > 1 else genre_preds
        mood_scores  = mood_preds.mean(axis=0)  if mood_preds.ndim > 1  else mood_preds

        self._genre_smoothing.append(np.array(genre_scores, dtype=np.float32))
        self._mood_smoothing.append(np.array(mood_scores, dtype=np.float32))

        smoothed_genre = np.mean(self._genre_smoothing, axis=0)
        smoothed_mood  = np.mean(self._mood_smoothing, axis=0)

        if self._on_genre:
            self._on_genre(_top5(smoothed_genre, JAMENDO_GENRE_LABELS))

        if self._on_mood:
            self._on_mood(_top5(smoothed_mood, JAMENDO_MOOD_LABELS))
