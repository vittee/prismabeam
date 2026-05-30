# Prisma Beam

Real-time DMX lighting controller that reacts to live audio. Detects BPM, energy, danceability, and genre from an audio stream, then drives moving heads and a PAR light to match the music.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Key Concepts](#key-concepts)
- [Physical Setup](#physical-setup)
- [Safety](#safety)

---

## How It Works

```
Audio stream (44 100 Hz)
   │
   ├─► energy-worker.js  (Essentia WASM)
   │       BandPass → Spectrum → ODF peak-picking
   │       Emits: energy (~50 ms), kick (onset)
   │
   └─► analysis-worker.js  (Essentia + TF.js WASM)
           BpmDetector  → PercivalBpmEstimator  (8 s window, 2 s hop)
           FeatureExtractor → MusicNN mel-spectrogram → genre tags
           Emits: bpm, danceability, extracted (top-5 genre tags)

Animator
   Receives: bpm, danceability, energy, kick, tag
   Maps tag → Profile via TagsToProfileMap / GroupTagToProfileMap
   Runs three independent animation loops:
     • PAR colour 
     • Head move  
     • Luminous   
     • Flash — triggered on kick
     • Strobe — auto-activated by pace × dance × energy

DMX transport
   SerialPort at 250 000 baud, 8N2
   40 Hz frame rate (setInterval 1000/40)
   Break signal: EscapeCommFunction (Windows) / port.set({brk}) (other)
```

Two audio streams are requested from the player simultaneously:

| Stream | Format | Sample rate | Used for |
|---|---|---|---|
| `mlStream` | FloatLE stereo | 16 000 Hz | Genre classification |
| `rhythmStream` | FloatLE stereo | 44 100 Hz | BPM, danceability, energy, kick |

---

## Prerequisites

- Node.js 20 or later 
- pnpm
- A USB-to-DMX adapter with FTDI VID `0403` / PID `6001` (e.g. Enttec Open DMX USB or compatible)
- The three fixtures connected and addressed as described in [Physical Setup](#physical-setup)

Native modules that require a build step are listed in `pnpm-workspace.yaml` under `onlyBuiltDependencies`:

```
@serialport/bindings-cpp
@tensorflow/tfjs-node
koffi
```

These are compiled automatically by pnpm during install.

---

## Installation

```bash
pnpm install
```

The `model-tfjs/` directory is already included in the repository. No separate model download is needed.

---

## Running

**Normal mode** — full audio analysis + DMX output:

```bash
pnpm start
```

---

## Fixtures

Three fixtures are supported. Channel addresses are auto-assigned sequentially starting at DMX address 1 in the order they are added to the universe.

| Variable | Model | Channels | Key channels |
|---|---|---|---|
| `beamSpot` | YUER Generic Beam Spot with RGB Ring | 14 | pan (0–540°), tilt (0–180°), color wheel (8 positions + run), gobo (7 + run), prism, led-ring (35 patterns), strobe |
| `miniBeam` | Mini 30W Moving Head Prism Gobo With Laser | 12 | pan (0–450°), tilt (0–180°), gobo brightness, beam brightness, laser brightness, led-ring (23 patterns), strobe |
| `par` | TADA MK54 RGBW | 7 | red, green, blue, white, master dimmer, program (strobe/jump/gradient/pulse), speed |

### DMX channel ordering (auto-assigned)

Addresses 1–14: YUER beam spot
Addresses 15–26: Mini moving head
Addresses 27–33: TADA PAR

### Degree-to-DMX conversion

| Fixture | Axis | Range | Formula |
|---|---|---|---|
| YUER main | Pan | 0–540° | `deg * 255 / 540` |
| YUER main | Tilt | 0–180° | `deg * 255 / 180` |
| Mini (mirrored) | Pan | 0–450° | `255 - deg * 255 / 450` |
| Mini | Tilt | 0–180° | `255 - deg * 255 / 180` |

The mini head pan and tilt are mirrored so both fixtures sweep in opposite directions from a single set of profile move coordinates.

---
## Key Concepts

### BPM and danceability

`BpmDetector` uses Essentia's `PercivalBpmEstimator` over an 8-second rolling window with a 2-second hop. BPM is accepted in the range 40–220; a 4-sample median smooths the output. Danceability is computed via Essentia's `Danceability` algorithm and normalised to 0–1 by dividing by 3.

### Energy and kick detection

`energy-worker.js` processes 44100 Hz stereo FloatLE audio at a 256-sample hop, 2048-sample frame. It:

1. Band-passes the signal to 20–150 Hz (centre 85 Hz, bandwidth 130 Hz) to isolate kick frequencies
2. Computes the spectral energy (RMS of the spectrum)
3. Emits `energy` every ~50 ms as a normalised 0–1 level using a 4-sample median
4. Detects kick onsets via local ODF maxima above an adaptive background threshold with a 150 ms minimum gap

### Genre classification

`feature-extractor.js` computes mel-spectrograms from 16 kHz mono audio using `EssentiaTFInputExtractor` with the `musicnn` configuration (512-sample frames, 256-sample hop, 96 mel bands, 128-frame patches). Patches are passed to the MusicNN model (`model-tfjs/model.json`) via TensorFlow.js. The top-5 activation scores are smoothed over 3 frames using a per-tag median (`ActivationSmoother`) before being emitted.

The label set covers the full MusicNN taxonomy: Blues, Children's, Classical, Electronic, Folk/World/Country, Funk/Soul, Hip Hop, Jazz, Latin, Non-Music, Pop, Reggae, Rock, Stage & Screen — 200+ subgenre tags in total.

---

## Physical Setup

### Room layout

Place both moving heads at the front of the room, flanking the TV/screen. The pan centre of each head should point toward the back wall so sweeps travel across the back wall and ceiling.

```
        [  TV screen  ]
  [head L]           [head R]
      \                 /
       \  sweep arcs   /
        \ toward back /
         \   wall    /
          ↓         ↓
       [  people  ]
       [  people  ]
```

### Zero position and base rotation

| Fixture | tilt = 0 direction | tilt = 90° direction |
|---|---|---|
| Main head (YUER) | toward back wall | straight up |
| Mini head | toward front (people/screen side) | straight up |

Rotate the mini head base 180° so its tilt = 0 also points toward the back wall. After this rotation both fixtures behave identically from the software's perspective: tilt = 0 points back, tilt = 90° points up. The software's `255 - pan` mirror still produces opposite sweep directions as intended.

---

## Safety

### Laser — mini head only

> [!WARNING]
> The mini head (Mini 30W Moving Head Prism Gobo With Laser) emits scattered green laser beams across a wide angle. Scattered laser light can cause permanent eye damage even at indirect exposure. The laser only activates during brief strobe bursts.**
