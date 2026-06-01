# Prisma Beam

Real-time DMX lighting controller that reacts to live audio. It detects BPM,
danceability, energy, kick transients, and genre from two concurrent UDP audio
streams, then drives two moving-head fixtures and a PAR light to match the
music — with per-genre colour palettes, movement profiles, flash-on-kick, and
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

Two UDP sockets receive PCM audio simultaneously from an external player:

| Socket env var | Default port | PCM format | Sample rate | Purpose |
|---|---|---|---|---|
| `TAGGING_PORT` | `7440` | FloatLE stereo | 16 000 Hz | Genre classification |
| `AUDIO_PORT` | `7441` | FloatLE stereo | 48 000 Hz | BPM, danceability, energy, kick |

### Signal chain

```
UDP:7440 (16 kHz FloatLE stereo)
    │
    └─► AnalysisManager  (analysis-worker.js)
            FeatureExtractor → EssentiaTFInputExtractor "musicnn"
                               512-sample frame, 256-sample hop, 96 mel bands
                               128-frame patches → MusicNN (model-tfjs/model.json)
                               Top-5 activations, 8-frame median per tag
                               → genre tag emitted as ActivationTag
                               
UDP:7441 (48 kHz FloatLE stereo)
    │
    ├─► EnergyDetector  (energy-worker.js — Essentia WASM)
    │       Band-pass 20–150 Hz → Spectrum (2048-sample frame, 256-sample hop)
    │       RMS ODF → energy level  (~50 ms cadence, 4-sample median)
    │       Local ODF peak-pick     → kick onset (150 ms minimum gap)
    │
    └─► AnalysisManager  (analysis-worker.js — Essentia + TF.js WASM)
            BpmDetector  → PercivalBpmEstimator (8 s window, 2 s hop, 44 100 Hz)
                           BPM range 40–220, 4-sample median smoothing
            Danceability → Essentia Danceability ÷ 3  (normalised 0–1)

Animator
    Inputs: bpm, danceability, energy, kick, ActivationTag
    ├─ Tag → Profile via TagsToProfileMap / GroupTagToProfileMap
    ├─ PAR colour animation  (easeInOutSine, BPM-quantised durations)
    ├─ Head move animation   (easeInExpo or easeInOutSine by danceability)
    ├─ Luminous animation    (200 ms fade, modulated by energy)
    ├─ Flash animation       (triggered on every kick event)
    └─ Strobe animation      (auto-activated: pace × energy × danceability weight)

DMX transport
    SerialPort: 250 000 baud, 8N2
    Update rate: 40 Hz    
```

---

## Prerequisites

- Node.js 20 or later
- pnpm
- A USB-to-DMX adapter detected as VID `0403` / PID `6001` (e.g., Enttec Open
  DMX USB or compatible FTDI chip). On Linux, any `/dev/ttyUSB*` device is
  used as a fallback.
- The three fixtures wired and addressed as described in
  [Fixture Reference](#fixture-reference).

Three dependencies contain native C++ code and are compiled during install:

| Package | Purpose |
|---|---|
| `@serialport/bindings-cpp` | Serial port access |
| `@tensorflow/tfjs-node` | TensorFlow native binding |
| `koffi` | FFI for Windows `kernel32.dll` / Linux `libc` break signal |

---

## Installation

```bash
pnpm install
```

The `postinstall` script (`scripts/postinstall.mjs`) copies TensorFlow native
library files (`.dll` / `.so`) from `node_modules/@tensorflow/tfjs-node/deps/lib`
into the platform-specific subdirectory of
`node_modules/@tensorflow/tfjs-node/lib` so the native addon can locate them.

The MusicNN model is already bundled in `model-tfjs/` (11 weight shards +
`model.json`). No separate model download is needed.

---

## Running

Start the full controller — audio analysis and DMX output:

```bash
pnpm start
```

On startup you will see:

```
Found device: COM3          # or /dev/ttyUSB0 on Linux
Listening — audio:7441 audio-tagging:7440
[EnergyDetector] worker ready
```

Then feed the audio into UDP ports using FFMpeg
```sh
ffmpeg -re -i file.mp3 -map 0:a:0 \
   -f f32le -ac 2 -ar 16000 -acodec pcm_f32le udp://127.0.0.1:7440 \
   -f f32le -ac 2 -ar 48000 -acodec pcm_f32le udp://127.0.0.1:7441 
```

Once audio arrives on the UDP ports, BPM and danceability values are logged as
they update:

```
BPM 128
Danceability 0.72
Update Tag house / techno / trance
Apply profile
```

### Development / fixture test

```bash
pnpm dev
```

Runs `ts-node src/poc-dmx.ts` — opens the DMX port, sets a fixed static scene
on all three fixtures, and plays a brief strobe burst on the beam spot. Useful
for confirming the USB adapter and fixture wiring without audio.

---

## Physical Setup

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

## Safety

> [!WARNING]
> The Mini 30W Moving Head Prism Gobo With Laser emits scattered green laser
> beams across a wide angle. Scattered laser light can cause permanent eye
> damage even at indirect exposure. The laser activates only during brief
> strobe bursts triggered by the strobe animation loop.