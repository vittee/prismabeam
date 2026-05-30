import { FixtureDefinition } from "../types";

export const Mini30WMovingHeadPrismGoboWithLaser: FixtureDefinition = {
  name: 'Mini 30W Moving Head Prism Gobo With Laser',
  channels: [
    { id: 'pan', options: [{ type: 'range', name: 'Pan', value: [0, 255] }] }, // 0-450 degree rotation
    { id: 'tilt', options: [{ type: 'range', name: 'Tilt', value: [0, 255] }] }, // 0-180 degree rotation
    { id: 'motor-delay', options: [{ type: 'range', name: 'Speed', value: [0, 255] }] }, // 0 = Fastest, 255 = Slowest
    {
      id: 'gobo-rotation', options: [
        { type: 'range', name: 'Off', value: [0, 9] },
        { type: 'range', name: 'Speed', value: [10, 255] } // Slow-Fast
      ]
    },
    { id: 'luminous', options: [{ type: 'range', name: 'Luminous', value: [0, 255] }] },
    { id: 'strobe', options: [{ type: 'range', name: 'Frequency', value: [0, 255] }] }, // 0 = Disabled (0Hz), 255 = 20Hz, applied to gobo, beam, laser
    { id: 'gobo', options: [{ type: 'range', name: 'Gobo brightness', value: [0, 255] }] },
    { id: 'beam', options: [{ type: 'range', name: 'Beam brightness', value: [0, 255] }] },
    { id: 'laser', options: [{ type: 'range', name: 'Laser brightness', value: [0, 255] }] }, // Scattered green laser beams
    {
      id: 'led-ring', options: [
        { type: 'static', name: 'Off', value: 0 },
        { type: 'static', name: 'Running single white dot', value: 10 },
        { type: 'static', name: 'Running 1 red dot, 1 green dot, 180 degree apart', value: 20 },
        { type: 'static', name: 'Running 1 red dot, 1 green dot, 1 blue dot, 120 degree apart', value: 30 },
        { type: 'static', name: 'Running red, green, blue, magenta consecutive dot', value: 40 },
        { type: 'static', name: 'Running 1 red band, 1 green band, 1 blue band, 120 degree apart', value: 50 },
        { type: 'static', name: 'Running 1 red band, 1 green band, 180 degree apart', value: 60 },
        { type: 'static', name: 'Running 1 green band, 1 blue band, 180 degree apart', value: 70 },
        { type: 'static', name: 'Running 1 red band, 1 blue band, 180 degree apart', value: 80 },
        { type: 'static', name: 'Running 1 red dot over green ring', value: 90 },
        { type: 'static', name: 'Running 1 green dot over red ring', value: 100 },
        { type: 'static', name: 'Running 1 green dot over blue ring', value: 110 },
        { type: 'static', name: 'Running green progressive ring', value: 120 },
        { type: 'static', name: 'Running red progressive ring', value: 130 },
        { type: 'static', name: 'Running blue progressive ring', value: 140 },
        { type: 'static', name: 'Running yellow progressive ring', value: 150 },
        { type: 'static', name: 'Running 1 red dot, 1 green dot, passing each other in oppsite direction', value: 170 },
        { type: 'static', name: 'Running 2 red dots, 2 blue dots, passing each other in oppsite direction', value: 180 },
        { type: 'static', name: 'Running red/magenta band, green/yellow, passing each other in oppsite direction', value: 190 },
        { type: 'static', name: 'Randomly running red/green/blue dot passing each other in oppsite direction', value: 200 },
        { type: 'static', name: 'Randomly running red/green/blue/yellow/magenta progressive ring passing each other in oppsite direction', value: 210 },
        { type: 'static', name: 'Randomly running red/green/yellow progressive ring passing each other in oppsite direction', value: 220 },
        { type: 'static', name: 'Randomly Changing red/green/blue/yellow/magenta/cyan color ring', value: 230 },
      ]
    },
    { id: 'led-speed', options: [{ type: 'range', name: 'speed', value: [0, 255] }] }, // 0=>1 round in 4 seconds, 255=Fastest
    {
      id: 'function', options: [
        { type: 'static', name: 'DMX', value: 0 },
        { type: 'static', name: 'Auto running', value: 51 },
        { type: 'static', name: 'Voice', value: 151 },
        { type: 'static', name: 'Reset after 3 seconds', value: 251 },
      ]
    }
  ]
}