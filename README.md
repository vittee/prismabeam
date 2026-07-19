# Prisma Beam

Real-time DMX lighting controller that reacts to live audio. Detects BPM,
danceability, energy, kick transients, genre, and mood from a UDP audio stream,
then drives two moving-head fixtures and a PAR light to match the music —
with per-genre/mood colour palettes, movement profiles, flash-on-kick, and
auto-strobe.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Physical Setup](#physical-setup)
- [Safety](#safety)

---

## How It Works

One UDP socket receives 48 kHz stereo PCM from an external audio player:

| Env var | Default port | PCM format | Sample rate |
|---|---|---|---|
| `AUDIO_PORT` | `7441` | FloatLE stereo | 48 000 Hz |

### Signal chain

```
UDP:7441 (48 kHz FloatLE stereo)
    │
    ├─► EnergyDetector
    │       Band-pass 20–150 Hz → Spectrum (2048-sample frame, 512-sample hop)
    │       RMS ODF → energy level  (~50 ms cadence, 4-sample median)
    │       Local ODF peak-pick     → kick onset (150 ms minimum gap)
    │
    ├─► BpmDetector
    │       PercivalBpmEstimator (8 s window, 2 s hop, 48 000 Hz)
    │       Danceability (Essentia, normalised 0–1, 2-sample median)
    │
    └─► ML subprocess  (Python multiprocessing)
            Resample 48 kHz → 16 kHz (Essentia)
            TensorflowPredictEffnetDiscogs  (discogs-effnet embedding)
            Genre head  → mtg_jamendo_genre    (top-5, 8-frame smoothing)
            Mood head   → mtg_jamendo_moodtheme (top-5, 8-frame smoothing)
            Inference every 1 s over a 3 s rolling window

Animator (Node.js)
    Inputs: bpm, danceability, energy, kick, genre tags, mood tags
    ├─ Genre + mood → profile via GenreBlendMap / MoodBlendMap / GenreMoodAliasMap
    ├─ PAR colour animation  (easeInOutSine, BPM-quantised durations)
    ├─ Head move animation   (easeInExpo or easeInOutSine by danceability)
    ├─ Luminous animation    (200 ms fade, modulated by energy)
    ├─ Flash animation       (triggered on every kick event)
    └─ Strobe animation      (auto-activated: pace × energy × danceability² weight,
                               strongly suppressed for low-danceability songs,
                               MoodStrobingBoost per active mood)

DMX transport
    SerialPort: 250 000 baud, 8N2
    Update rate: 40 Hz

Web UI  (Svelte 5, served on HTTP_PORT)
    Real-time stats: BPM, danceability, energy charts
    Tags/moods display with score bars
    Active profile name
    Per-fixture controls: luminosity, enable/disable, tilt offset, kick delay
```

### Models

Three TensorFlow protobuf models are downloaded at Docker build time:

| Model | Source |
|---|---|
| `discogs_multi_embeddings-effnet-bs64-1.pb` | Essentia discogs-effnet feature extractor |
| `mtg_jamendo_genre-discogs_multi_embeddings-effnet-1.pb` | Genre classification head |
| `mtg_jamendo_moodtheme-discogs_multi_embeddings-effnet-1.pb` | Mood classification head |

---

## Prerequisites

- Docker
- Node.js 20+ and pnpm
- A USB-to-DMX adapter detected as VID `0403` / PID `6001` (e.g. Enttec Open
  DMX USB or compatible FTDI chip). On Linux, any `/dev/ttyUSB*` is used as fallback.
- The three fixtures wired and addressed as described in [Physical Setup](#physical-setup).

---

## Installation

Build both Docker images:

```bash
docker compose build
```

This produce 2 docker images:
- `prismabeam-analyzer` — Python audio analysis service
- `prismabeam` — Node.js DMX controller + Web UI

---

## Running

A `compose.yml` is included with ports already exposed. On Linux, pass through the USB-DMX adapter:

```bash
docker compose up
```

On Linux, if your adapter is not `/dev/ttyUSB0`, override the device path:

```bash
docker compose run --device /dev/ttyUSB1:/dev/ttyUSB0 prismabeam
```

### Feed audio

The analyzer expects a continuous UDP stream of 48 kHz stereo float32-LE PCM on port 7441.
Use ffmpeg to send audio from any source:

**Single file** — plays at real-time speed (`-re`), loops with `-stream_loop -1`:

```bash
ffmpeg -re -stream_loop -1 -i file.mp3 \
  -f f32le -ac 2 -ar 48000 udp://127.0.0.1:7441
```

**System audio / loopback** (macOS, using BlackHole or Soundflower as loopback device):

```bash
ffmpeg -f avfoundation -i ":BlackHole 2ch" \
  -f f32le -ac 2 -ar 48000 udp://127.0.0.1:7441
```

**System audio / loopback** (Linux ALSA loopback or PulseAudio monitor):

```bash
ffmpeg -f pulse -i alsa_output.pci-0000_00_1f.3.analog-stereo.monitor \
  -f f32le -ac 2 -ar 48000 udp://127.0.0.1:7441
```

**System audio / loopback** (Windows WASAPI loopback):

```bash
ffmpeg -f dshow -i audio="Stereo Mix (Realtek Audio)" \
  -f f32le -ac 2 -ar 48000 udp://127.0.0.1:7441
```

To list available audio devices on Windows: `ffmpeg -list_devices true -f dshow -i dummy`

**Network stream** (e.g. internet radio, RTSP, HLS):

```bash
ffmpeg -i http://stream.example.com/radio.mp3 \
  -f f32le -ac 2 -ar 48000 udp://127.0.0.1:7441
```

### USB-DMX adapter on Windows

Docker Desktop on Windows cannot pass through USB devices directly. Use
**WSL USB Manager** (part of [WSL Dashboard](https://github.com/bostrot/wsl2-distro-manager))
or **usbipd-win** to attach the USB-DMX adapter into the WSL2 / Docker context:

1. Install [usbipd-win](https://github.com/dorssel/usbipd-win).
2. Open PowerShell as Administrator and list devices:
   ```powershell
   usbipd list
   ```
3. Share and attach the adapter (replace `<BUSID>` with the one shown for your FTDI device):
   ```powershell
   usbipd bind --busid <BUSID>
   usbipd attach --wsl --busid <BUSID>
   ```
4. Verify inside WSL: `ls /dev/ttyUSB*` — the device should appear.
5. Run `docker compose up` from within WSL.

Alternatively, open WSL Dashboard → **USB Devices** tab, find the FTDI adapter, and click **Attach**. Then run compose from WSL.

### Environment variables

**Analyzer (`prismabeam-analyzer`)**

| Var | Default | Description |
|---|---|---|
| `AUDIO_PORT` | `7441` | UDP port for incoming PCM audio |
| `ANALYSIS_PORT` | `7442` | TCP port for analysis result stream |

**DMX controller (`prismabeam`)**

| Var | Default | Description |
|---|---|---|
| `PORT` | `7400` | HTTP port for the web UI |
| `ANALYZER_HOST` | *(required)* | Analyzer container hostname |
| `ANALYZER_PORT` | `7442` | Analyzer TCP port |

---

## Physical Setup

### DMX addresses

Fixtures are auto-assigned sequentially from address 1 in the order they appear in `src/index.ts`:

| Fixture | Start address | Channels |
|---|---|---|
| YUER Generic Beam Spot (main head) | 1 | 14 |
| Mini 30W Moving Head Prism Gobo With Laser | 15 | 12 |
| TADA MK54 RGBW PAR | 27 | 7 |

Set each fixture's DMX start address on its hardware dipswitch accordingly.

### Room layout

Place both moving heads at the front of the room, flanking the TV or screen.
Pan centre for each head should point toward the back wall so sweeps travel
across the back wall and ceiling.

```
        [  TV screen  ]
  [head L]           [head R]
      \                 /
       \  sweep arcs   /
        \toward back  /
         \   wall    /
          ↓         ↓
       [  people  ]
       [  people  ]
```

---

## Safety

> [!WARNING]
> The Mini 30W Moving Head Prism Gobo With Laser emits scattered green laser
> beams across a wide angle. Scattered laser light can cause permanent eye
> damage even at indirect exposure. The laser activates only during brief
> strobe bursts triggered by the strobe animation loop.
