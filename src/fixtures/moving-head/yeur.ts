import { FixtureDefinition } from "../types";

export const YUERGenericBeamSpot: FixtureDefinition = {
  name: 'YUER Generic Beam Spot with RGB Ring',
  channels: [
    { id: 'pan', options: [{ type: 'range', name: 'Pan', value: [0, 255] }] }, // 0 = 0 degree, 45 = 90 degree, 85 = 180 degree, 170 = 360 degree, 255 = 540 degree
    { id: 'pan-fine', options: [{ type: 'range', name: 'Pan Fine', value: [0, 255] }] },
    { id: 'tilt', options: [{ type: 'range', name: 'Tilt', value: [0, 255] }] }, // 0 = 0 degree, 63 = 45 degree, 127 = 90 degree, 191 = 135 degree, 255 = 180 degree
    { id: 'tilt-fine', options: [{ type: 'range', name: 'Tilt', value: [0, 255] }] },
    { id: 'motor-delay', options: [{ type: 'range', name: 'Speed', value: [0, 255] }] }, // 0 = Fastest, 255 = Slowest
    { id: 'luminous', options: [{ type: 'range', name: 'Luminous', value: [0, 255] }] },
    { id: 'strobe', options: [{ type: 'range', name: 'Frequency', value: [0, 255] }] }, // 0 = Disabled (0Hz), 255 = 20Hz
    {
      id: 'color', options: [
        { type: 'static', name: 'open', value: 0 },
        { type: 'static', name: 'red', value: 16 },
        { type: 'static', name: 'green', value: 32 },
        { type: 'static', name: 'cyan', value: 48 },
        { type: 'static', name: 'yellow', value: 64 },
        { type: 'static', name: 'orange', value: 80 },
        { type: 'static', name: 'magenta', value: 96 },
        { type: 'static', name: 'blue', value: 112 },
        { type: 'range', name: 'running', value: [128, 255] }
      ]
    },
    {
      id: 'gobo', options: [
        { type: 'static', name: 'open', value: 0 },
        { type: 'static', name: 'pat1', value: 16 },
        { type: 'static', name: 'pat2', value: 32 },
        { type: 'static', name: 'pat3', value: 48 },
        { type: 'static', name: 'pat4', value: 64 },
        { type: 'static', name: 'pat5', value: 80 },
        { type: 'static', name: 'pat6', value: 96 },
        { type: 'static', name: 'pat7', value: 112 },
        { type: 'range', name: 'running', value: [128, 255] }
      ]
    },
    {
      id: 'prism', options: [
        { type: 'static', name: 'off', value: 0 },
        { type: 'static', name: 'on', value: 8 },
        { type: 'range', name: 'rotate', value: [128, 255] },
      ]
    },
    {
      id: 'led-ring', options: [
        { type: 'static', name: 'off', value: 0 },
        { type: 'static', name: 'red', value: 14 },
        { type: 'static', name: 'green', value: 22 },
        { type: 'static', name: 'blue', value: 30 },
        { type: 'static', name: 'yellow', value: 38 },
        { type: 'static', name: 'magenta', value: 46 },
        { type: 'static', name: 'cyan', value: 54 },
        { type: 'static', name: 'white', value: 62 },
        { type: 'static', name: 'rainbow dots', value: 70 },
        { type: 'static', name: 'rainbow full circle', value: 76 },
        { type: 'static', name: 'rainbow train', value: 82 },
        { type: 'static', name: 'rainbow bands', value: 88 },
        { type: 'static', name: 'rainbow bands 2', value: 94 },
        { type: 'static', name: 'rainbow double trains running in opposite direction', value: 100 },
        { type: 'static', name: 'rainbow double shrinking trains running in opposite direction', value: 106 },
        { type: 'static', name: 'rainbow double trains', value: 112 },
        { type: 'static', name: 'running colors', value: 118 },
        { type: 'static', name: 'running train, changing colors', value: 124 },
        { type: 'static', name: 'running colors', value: 130 },
        { type: 'static', name: 'filling, changing colors', value: 136 },
        { type: 'static', name: 'circular, changing colors', value: 142 },
        { type: 'static', name: 'trains, changing colors', value: 148 },
        { type: 'static', name: 'shrinking trains, changing colors', value: 154 },
        { type: 'static', name: 'filling rainbow', value: 160 },
        { type: 'static', name: 'circulating red,green,blue,white dots train', value: 166 },
        { type: 'static', name: 'ring, changing colors', value: 172 },
        { type: 'static', name: 'circulating dot, changing colors', value: 178 },
        { type: 'static', name: 'circulating band, changing colors', value: 184 },
        { type: 'static', name: 'alternating ring, changing colors', value: 190 },
        { type: 'static', name: 'circulating 2 colors trains, with one train having faded trail, changing colors', value: 196 },
        { type: 'static', name: 'ring with filling color transition', value: 202 },
        { type: 'static', name: 'ring with filling dot color transition', value: 208 },
        { type: 'static', name: 'train with faded trail following another dot color', value: 214 },
        { type: 'static', name: 'double trains, changing colors', value: 220 },
        { type: 'static', name: 'double rings with dots filling transition, changing colors', value: 226 },
        { type: 'static', name: 'double filling rings, changing colors', value: 232 },
        { type: 'static', name: 'rings with running dot, chaning colors', value: 238 },
        { type: 'static', name: 'rings with running band, chaning colors', value: 244 },
        { type: 'static', name: 'double alternating rings, chaning colors', value: 250 },
      ]
    },
    { id: 'led-speed', options: [{ type: 'range', name: 'speed', value: [0, 255] }] },
    {
      id: 'running', options: [
        { type: 'static', name: 'off', value: 0 },
        { type: 'static', name: 'fast', value: 51 },
        { type: 'static', name: 'slow', value: 101 },
        { type: 'static', name: 'sound', value: 201 },
      ]
    },
    { id: 'reset', options: [{ type: 'static', name: 'reset', value: 255 }] }
  ]
}
