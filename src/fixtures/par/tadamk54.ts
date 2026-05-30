import { FixtureDefinition } from "../types";

export const TADAMK54Rgb: FixtureDefinition = {
  name: 'TADA MK54 RGBW',
  channels: [
    { id: 'master', options: [{ type: 'range', name: 'dimmer', value: [0, 255] }] },
    { id: 'red', options: [{ type: 'range', name: 'dimmer', value: [0, 255] }] },
    { id: 'green', options: [{ type: 'range', name: 'dimmer', value: [0, 255] }] },
    { id: 'blue', options: [{ type: 'range', name: 'dimmer', value: [0, 255] }] },
    { id: 'white', options: [{ type: 'range', name: 'dimmer', value: [0, 255] }] },
    {
      id: 'program', options: [
        { type: 'static', name: 'strobe', value: 0 },
        { type: 'static', name: 'jump', value: 51 },
        { type: 'static', name: 'gradient', value: 101 },
        { type: 'static', name: 'pulse', value: 151 }
      ]
    },
    { id: 'speed', options: [{ type: 'range', name: 'speed', value: [0, 255] }] }
  ]
}
