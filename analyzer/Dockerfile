FROM python:3.11-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/
RUN pip install --no-cache-dir --timeout=300 --prefix=/install -r /tmp/requirements.txt

RUN curl -fsSL -o /discogs_multi_embeddings-effnet-bs64-1.pb \
    https://essentia.upf.edu/models/feature-extractors/discogs-effnet/discogs_multi_embeddings-effnet-bs64-1.pb

RUN curl -fsSL -o /mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb \
    https://essentia.upf.edu/models/classification-heads/mtg_jamendo_genre/mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb

RUN curl -fsSL -o /mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb \
    https://essentia.upf.edu/models/classification-heads/mtg_jamendo_moodtheme/mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb


FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /install /usr/local
COPY --from=builder /discogs_multi_embeddings-effnet-bs64-1.pb /app/models/discogs_multi_embeddings-effnet-bs64-1.pb
COPY --from=builder /mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb /app/models/mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb
COPY --from=builder /mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb /app/models/mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb

WORKDIR /app
COPY *.py ./

ENV EMBEDDING_MODEL_PATH=/app/models/discogs_multi_embeddings-effnet-bs64-1.pb
ENV GENRE_HEAD_PATH=/app/models/mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb
ENV MOOD_HEAD_PATH=/app/models/mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb
ENV RHYTHM_PORT=7441
ENV ANALYSIS_PORT=7442
ENV CUDA_VISIBLE_DEVICES=-1
ENV TF_CPP_MIN_LOG_LEVEL=3

CMD ["python", "-u", "main.py"]
