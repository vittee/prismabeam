import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import multiprocessing
import socket
import threading
import numpy as np
import essentia

essentia.log.warningActive = False
essentia.log.infoActive = False

from tcp_server import TcpServer
from bpm import BpmDetector
from energy import EnergyDetector

RHYTHM_PORT = int(os.environ.get('RHYTHM_PORT', 7441))
TCP_PORT    = int(os.environ.get('ANALYSIS_PORT', 7442))
SAMPLE_RATE = 48000


def ml_process(audio_q: multiprocessing.Queue, result_q: multiprocessing.Queue,
               embedding_model_path: str, genre_head_path: str, mood_head_path: str):
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
    import essentia
    essentia.log.warningActive = False
    essentia.log.infoActive = False
    from ml import MultiHeadTagger

    def on_genre(tags):
        result_q.put({'type': 'extracted', 'tags': tags})

    def on_mood(tags):
        result_q.put({'type': 'mood', 'tags': tags})

    tagger = MultiHeadTagger(
        embedding_model_path, genre_head_path, mood_head_path,
        input_sample_rate=SAMPLE_RATE,
        on_genre=on_genre,
        on_mood=on_mood,
    )

    while True:
        pcm = audio_q.get()
        tagger.process(pcm)


def recv_udp(port: int, callback):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 1 << 20)
    sock.bind(('0.0.0.0', port))
    while True:
        data, _ = sock.recvfrom(65536)
        callback(data)


def parse_mono(data: bytes) -> np.ndarray:
    """Stereo interleaved float32 LE → mono mixdown."""
    stereo = np.frombuffer(data, dtype='<f4').reshape(-1, 2)
    return ((stereo[:, 0] + stereo[:, 1]) * 0.5).astype(np.float32)


def main():
    last_genre_tags: list = []
    last_mood_tags: list = []

    def on_connect(conn):
        if last_genre_tags:
            tcp.send(conn, {'type': 'extracted', 'tags': last_genre_tags})
        if last_mood_tags:
            tcp.send(conn, {'type': 'mood', 'tags': last_mood_tags})

    tcp = TcpServer(TCP_PORT, on_connect=on_connect)
    tcp.start()

    embedding_model_path = os.environ.get('EMBEDDING_MODEL_PATH', '/app/models/discogs_multi_embeddings-effnet-bs64-1.pb')
    genre_head_path      = os.environ.get('GENRE_HEAD_PATH',      '/app/models/mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb')
    mood_head_path       = os.environ.get('MOOD_HEAD_PATH',       '/app/models/mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb')

    bpm_detector = BpmDetector(SAMPLE_RATE, on_bpm=lambda v: tcp.broadcast({'type': 'bpm', 'value': v}),
                                             on_danceability=lambda v: tcp.broadcast({'type': 'danceability', 'value': v}))

    energy_detector = EnergyDetector(SAMPLE_RATE,
                                     on_energy=lambda v: tcp.broadcast({'type': 'energy', 'level': v}),
                                     on_kick=lambda: tcp.broadcast({'type': 'kick'}))

    audio_q: multiprocessing.Queue = multiprocessing.Queue(maxsize=256)
    result_q: multiprocessing.Queue = multiprocessing.Queue()

    proc = multiprocessing.Process(
        target=ml_process,
        args=(audio_q, result_q, embedding_model_path, genre_head_path, mood_head_path),
        daemon=True,
    )
    proc.start()

    def result_worker():
        while True:
            msg = result_q.get()
            if msg['type'] == 'extracted':
                last_genre_tags.clear()
                last_genre_tags.extend(msg['tags'])
                tcp.broadcast(msg)
            elif msg['type'] == 'mood':
                last_mood_tags.clear()
                last_mood_tags.extend(msg['tags'])
                tcp.broadcast(msg)

    threading.Thread(target=result_worker, daemon=True).start()

    def on_rhythm(data: bytes):
        mono = parse_mono(data)
        energy_detector.process(mono)
        bpm_detector.process(mono)
        try:
            audio_q.put_nowait(mono)
        except Exception:
            pass

    threading.Thread(target=recv_udp, args=(RHYTHM_PORT, on_rhythm), daemon=True).start()

    print(f'[analysis] rhythm:{RHYTHM_PORT} tcp:{TCP_PORT}', flush=True)
    threading.Event().wait()


if __name__ == '__main__':
    multiprocessing.set_start_method('spawn')
    main()
