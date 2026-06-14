import { Profile } from "./types";
import { easeInExpo, easeInOutSine, easeInSine } from "../utils/easing";

export const ProfileConfigs: Record<string, Profile> = {
  // High brightness, fun saturated colors, medium-fast motor. 400ms PAR cycling. Lively sine sweeps.
  // Prism on, gobo spinning. Upbeat floor-filler — more colorful and accessible than electronic/house.
  dance: {
    luminous: { head: 240, mini: 255, par: 195 },
    strobing: { threshold: 0.18, paceWeight: 0.32, energyWeight: 0.68, danceExp: 0.9 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 0, 200], duration: 400 },
            { rgbw: [0, 220, 255], duration: 400 },
            { rgbw: [255, 220, 0], duration: 400 },
            { rgbw: [0, 255, 100], duration: 400 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 100, 0], duration: 400 },
            { rgbw: [0, 100, 255], duration: 400 },
            { rgbw: [200, 0, 255], duration: 400 },
            { rgbw: [0, 255, 180], duration: 400 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 50, 150], duration: 400 },
            { rgbw: [50, 255, 200], duration: 400 },
            { rgbw: [255, 200, 0], duration: 400 },
            { rgbw: [100, 50, 255], duration: 400 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [160, 68], duration: 700, easing: easeInOutSine },
            { axis: [350, 84], duration: 700, easing: easeInOutSine },
          ],
          colors: [96, 48], ledRing: [210, 225], gobo: 120,
        },
        {
          moves: [
            { axis: [120, 64], duration: 650, easing: easeInOutSine },
            { axis: [275, 90], duration: 650, easing: easeInOutSine },
            { axis: [420, 70], duration: 650, easing: easeInOutSine },
            { axis: [160, 74], duration: 650, easing: easeInOutSine },
          ],
          colors: [48, 96], ledRing: [220, 235], gobo: 140,
        },
        {
          moves: [
            { axis: [170, 72], duration: 700, easing: easeInSine },
            { axis: [340, 88], duration: 700, easing: easeInSine },
            { axis: [240, 62], duration: 700, easing: easeInSine },
          ],
          colors: [96, 64], ledRing: [200, 215], gobo: 100,
        },
      ],
      mini: [
        { ledRing: [200, 215], gobo: true, beam: 205, laser: 70, moves: [
          { axis: [270, 35], duration: 700 },
          { axis: [420, 60], duration: 700 },
          { axis: [570, 35], duration: 700 },
          { axis: [420, 15], duration: 700 },
        ]},
        { ledRing: [215, 230], gobo: true, beam: 215, laser: 75, moves: [
          { axis: [315, 35], duration: 650 },
          { axis: [465, 60], duration: 650 },
          { axis: [615, 35], duration: 650 },
          { axis: [465, 15], duration: 650 },
        ]},
        { ledRing: [185, 200], gobo: false, beam: 195, laser: 65, moves: [
          { axis: [240, 35], duration: 750 },
          { axis: [390, 60], duration: 750 },
          { axis: [540, 35], duration: 750 },
          { axis: [390, 15], duration: 750 },
        ]},
      ],
    },
  },

  // Full brightness, fast motor. Aggressive cyan/magenta/blue cycling at 300ms steps.
  // Head sweeps wide arcs with sine easing. Gobo spinning, prism on, color wheel mid-range.
  electronic: {
    luminous: { head: 255, mini: 255, par: 200 },
    strobing: { threshold: 0.15, paceWeight: 0.35, energyWeight: 0.65, danceExp: 0.8 },
    variants: {
      par: [
        // Cyan→magenta→blue→teal PAR.
        {
          colors: [
            { rgbw: [0, 255, 255], duration: 300 },
            { rgbw: [255, 0, 255], duration: 300 },
            { rgbw: [0, 0, 255], duration: 300 },
            { rgbw: [0, 255, 100], duration: 300 },
          ]
        },
        // White→aqua→sky→lime PAR.
        {
          colors: [
            { rgbw: [255, 255, 255], duration: 300 },
            { rgbw: [0, 255, 200], duration: 300 },
            { rgbw: [0, 200, 255], duration: 300 },
            { rgbw: [200, 255, 0], duration: 300 },
          ]
        },
        // Purple→violet→magenta→blue PAR.
        {
          colors: [
            { rgbw: [200, 0, 255], duration: 300 },
            { rgbw: [100, 0, 255], duration: 300 },
            { rgbw: [255, 0, 200], duration: 300 },
            { rgbw: [0, 0, 255], duration: 300 },
          ]
        },
      ],
      head: [
        {
          // Left (125°) → right (380°) → center (210°), tilt 60→100→56. Wide arc sweep, starts low-left, peaks high-right.
          moves: [
            { axis: [125, 60], duration: 600, easing: easeInSine },
            { axis: [380, 100], duration: 600, easing: easeInSine },
            { axis: [210, 56], duration: 600, easing: easeInSine },
          ],
          colors: [112, 48], ledRing: [220, 250], gobo: 160,
        },
        {
          // Center (255°) → far-left (85°) → far-right (425°), tilt 80→56→110. Pendulum swinging left then right, rising on the right.
          moves: [
            { axis: [255, 80], duration: 600, easing: easeInSine },
            { axis: [85, 56], duration: 600, easing: easeInSine },
            { axis: [425, 110], duration: 600, easing: easeInSine },
          ],
          colors: [48, 96], ledRing: [244, 238], gobo: 180,
        },
        {
          // Left-center (170°) → right-center (340°) → far-left (85°), tilt 56→118→68. Dips low-left, swings high-right, returns mid-left.
          moves: [
            { axis: [170, 56], duration: 600, easing: easeInSine },
            { axis: [340, 118], duration: 600, easing: easeInSine },
            { axis: [85, 68], duration: 600, easing: easeInSine },
          ],
          colors: [96, 112], ledRing: [190, 220], gobo: 140,
        },
      ],
      mini: [
        { ledRing: [200, 210], gobo: true, beam: 200, laser: 65, moves: [
          { axis: [290, 35], duration: 650 },
          { axis: [440, 60], duration: 650 },
          { axis: [590, 35], duration: 650 },
          { axis: [440, 15], duration: 650 },
        ]},
        { ledRing: [220, 230], gobo: true, beam: 220, laser: 75, moves: [
          { axis: [250, 35], duration: 600 },
          { axis: [400, 60], duration: 600 },
          { axis: [550, 35], duration: 600 },
          { axis: [400, 15], duration: 600 },
        ]},
        { ledRing: [190, 210], gobo: false, beam: 180, laser: 60, moves: [
          { axis: [320, 35], duration: 700 },
          { axis: [470, 60], duration: 700 },
          { axis: [620, 35], duration: 700 },
          { axis: [470, 15], duration: 700 },
        ]},
      ],
    },
  },

  // Max brightness, very fast motor. Short-duration red/white PAR bursts. Snappy expo head snaps.
  // Prism on. Aggressive feel.
  rock: {
    luminous: { head: 255, mini: 255, par: 200 },
    strobing: { threshold: 0.18, paceWeight: 0.4, energyWeight: 0.6, danceExp: 0.9 },
    variants: {
      par: [
        // Red flash with white pop PAR.
        {
          colors: [
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [255, 255, 255], duration: 100 },
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [80, 0, 0], duration: 100 },
          ]
        },
        // Red/orange decay PAR.
        {
          colors: [
            { rgbw: [255, 100, 0], duration: 200 },
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [200, 50, 0], duration: 150 },
            { rgbw: [60, 10, 0], duration: 100 },
          ]
        },
        // White strobe-like opener then red decay PAR.
        {
          colors: [
            { rgbw: [255, 255, 255], duration: 150 },
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [100, 0, 0], duration: 200 },
            { rgbw: [50, 0, 0], duration: 100 },
          ]
        },
      ],
      head: [
        {
          // Far-left (85°) ↔ far-right (425°), tilt 56→70. Hard binary snap, minimal tilt change. Punches left-right on beat.
          moves: [
            { axis: [85, 56], duration: 400, easing: easeInExpo },
            { axis: [425, 70], duration: 400, easing: easeInExpo },
          ],
          colors: [16, 0], ledRing: [154, 136], gobo: 32,
        },
        {
          // Center-right (210°) → left (125°) → right (380°) → center (210°). Full pendulum return.
          moves: [
            { axis: [210, 56], duration: 400, easing: easeInExpo },
            { axis: [125, 76], duration: 400, easing: easeInExpo },
            { axis: [380, 90], duration: 400, easing: easeInExpo },
            { axis: [210, 60], duration: 400, easing: easeInExpo },
          ],
          colors: [16, 80], ledRing: [136, 154], gobo: 16,
        },
        {
          // Far-left (40°) → extreme-right (465°) → center (255°) → left (80°). Cycle back toward start.
          moves: [
            { axis: [40, 63], duration: 400, easing: easeInExpo },
            { axis: [465, 78], duration: 400, easing: easeInExpo },
            { axis: [255, 56], duration: 400, easing: easeInExpo },
            { axis: [80, 66], duration: 400, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [112, 100], gobo: 48,
        },
      ],
      mini: [
        {
          ledRing: [180, 200], gobo: true, beam: 200, laser: 55,
          moves: [
            { axis: [270, 35], duration: 400 },
            { axis: [420, 60], duration: 400 },
            { axis: [570, 35], duration: 400 },
            { axis: [420, 15], duration: 400 },
          ],
        },
        {
          ledRing: [160, 180], gobo: true, beam: 220, laser: 70,
          moves: [
            { axis: [225, 35], duration: 400 },
            { axis: [375, 60], duration: 400 },
            { axis: [525, 35], duration: 400 },
            { axis: [375, 15], duration: 400 },
          ],
        },
        {
          ledRing: [210, 230], gobo: false, beam: 190, laser: 60,
          moves: [
            { axis: [315, 35], duration: 400 },
            { axis: [465, 60], duration: 400 },
            { axis: [615, 35], duration: 400 },
            { axis: [465, 15], duration: 400 },
          ],
        },
      ],
    },
  },

  // High brightness, fast motor. Orange/white/red PAR at 250ms bursts. Aggressive expo snaps,
  // wider arcs than rock. Prism on. Harder than rock, not as brutal as metal.
  hardrock: {
    luminous: { head: 240, mini: 255, par: 200 },
    strobing: { threshold: 0.15, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.8 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 80, 0], duration: 250 },
            { rgbw: [255, 255, 255], duration: 100 },
            { rgbw: [200, 30, 0], duration: 250 },
            { rgbw: [80, 10, 0], duration: 100 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [200, 100, 0], duration: 200 },
            { rgbw: [255, 50, 0], duration: 200 },
            { rgbw: [60, 0, 0], duration: 100 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 120, 0], duration: 250 },
            { rgbw: [255, 0, 0], duration: 200 },
            { rgbw: [150, 60, 0], duration: 150 },
            { rgbw: [255, 255, 255], duration: 80 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [70, 58], duration: 350, easing: easeInExpo },
            { axis: [440, 72], duration: 350, easing: easeInExpo },
          ],
          colors: [16, 0], ledRing: [160, 180], gobo: 32,
        },
        {
          moves: [
            { axis: [65, 60], duration: 350, easing: easeInExpo },
            { axis: [210, 80], duration: 350, easing: easeInExpo },
            { axis: [430, 65], duration: 350, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [180, 160], gobo: 48,
        },
        {
          moves: [
            { axis: [50, 62], duration: 380, easing: easeInExpo },
            { axis: [455, 75], duration: 380, easing: easeInExpo },
            { axis: [255, 58], duration: 380, easing: easeInExpo },
            { axis: [90, 64], duration: 380, easing: easeInExpo },
          ],
          colors: [16, 80], ledRing: [200, 220], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [170, 190], gobo: true, beam: 210, laser: 65, moves: [
          { axis: [270, 35], duration: 380 },
          { axis: [420, 60], duration: 380 },
          { axis: [570, 35], duration: 380 },
          { axis: [420, 15], duration: 380 },
        ]},
        { ledRing: [190, 210], gobo: true, beam: 225, laser: 75, moves: [
          { axis: [225, 35], duration: 380 },
          { axis: [375, 60], duration: 380 },
          { axis: [525, 35], duration: 380 },
          { axis: [375, 15], duration: 380 },
        ]},
        { ledRing: [220, 240], gobo: false, beam: 200, laser: 60, moves: [
          { axis: [315, 35], duration: 380 },
          { axis: [465, 60], duration: 380 },
          { axis: [615, 35], duration: 380 },
          { axis: [465, 15], duration: 380 },
        ]},
      ],
    },
  },

  // Medium brightness, moderate motor. Bright candy-color PAR at 600ms steps. Smooth sine head.
  // Prism on, gobo patterns. Energetic but not aggressive.
  pop: {
    luminous: { head: 200, mini: 240, par: 180 },
    strobing: { threshold: 0.25, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        // Hot pink→yellow→sky→purple PAR.
        {
          colors: [
            { rgbw: [255, 100, 200], duration: 600 },
            { rgbw: [255, 220, 0], duration: 600 },
            { rgbw: [100, 200, 255], duration: 600 },
            { rgbw: [200, 80, 255], duration: 600 },
          ]
        },
        // Gold→mint→rose→yellow PAR.
        {
          colors: [
            { rgbw: [255, 180, 0], duration: 600 },
            { rgbw: [0, 255, 200], duration: 600 },
            { rgbw: [255, 0, 180], duration: 600 },
            { rgbw: [255, 255, 100], duration: 600 },
          ]
        },
        // Lavender→pink→ice→peach PAR. Pastel palette, prism off.
        {
          colors: [
            { rgbw: [200, 150, 255], duration: 600 },
            { rgbw: [255, 200, 230], duration: 600 },
            { rgbw: [100, 230, 255], duration: 600 },
            { rgbw: [255, 220, 180], duration: 600 },
          ]
        },
      ],
      head: [
        {
          // Left-center (170°) ↔ right-center (340°), tilt 76→105. Gentle two-point bounce, rises on the right.
          moves: [
            { axis: [170, 76], duration: 1000, easing: easeInOutSine },
            { axis: [340, 105], duration: 1000, easing: easeInOutSine },
          ],
          colors: [96, 64], ledRing: [178, 184], gobo: 80,
        },
        {
          // Center (255°) → left (125°) → right (380°), tilt 65→100→82. Low-center, lifts left, settles mid-right.
          moves: [
            { axis: [255, 65], duration: 1000, easing: easeInOutSine },
            { axis: [125, 100], duration: 1000, easing: easeInOutSine },
            { axis: [380, 82], duration: 1000, easing: easeInOutSine },
          ],
          colors: [64, 96], ledRing: [202, 208], gobo: 64,
        },
        {
          // Center (210°) → right-center (295°) → left-center (170°), tilt 84→70→108. Tight oscillation, rises on left extreme.
          moves: [
            { axis: [210, 84], duration: 1000, easing: easeInOutSine },
            { axis: [295, 70], duration: 1000, easing: easeInOutSine },
            { axis: [170, 108], duration: 1000, easing: easeInOutSine },
          ],
          colors: [0, 64], ledRing: [160, 172], gobo: 96,
        },
      ],
      mini: [
        { ledRing: [40, 30], gobo: true, beam: 170, laser: 60, moves: [
          { axis: [255, 35], duration: 900 },
          { axis: [405, 60], duration: 900 },
          { axis: [555, 35], duration: 900 },
          { axis: [405, 15], duration: 900 },
        ]},
        { ledRing: [50, 40], gobo: true, beam: 190, laser: 65, moves: [
          { axis: [210, 35], duration: 900 },
          { axis: [360, 60], duration: 900 },
          { axis: [510, 35], duration: 900 },
          { axis: [360, 15], duration: 900 },
        ]},
        { ledRing: [20, 10], gobo: true, beam: 150, laser: 55, moves: [
          { axis: [300, 35], duration: 900 },
          { axis: [450, 60], duration: 900 },
          { axis: [600, 35], duration: 900 },
          { axis: [450, 15], duration: 900 },
        ]},
      ],
    },
  },

  // Medium-dim cool pastels, slow motor. Soft teal/lavender/rose PAR at 2-3s. Gentle drifting head.
  // No strobe, no prism. Lounge/downtempo feel — calmer than jazz, warmer than ambient.
  chillout: {
    luminous: { head: 140, mini: 190, par: 120 },
    strobing: { threshold: 0.8, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [60, 160, 180], duration: 2500 },
            { rgbw: [140, 100, 200], duration: 2500 },
            { rgbw: [80, 180, 160], duration: 2500 },
          ]
        },
        {
          colors: [
            { rgbw: [100, 140, 200], duration: 3000 },
            { rgbw: [180, 100, 160], duration: 3000 },
            { rgbw: [60, 160, 140], duration: 3000 },
          ]
        },
        {
          colors: [
            { rgbw: [120, 180, 220], duration: 3000 },
            { rgbw: [200, 120, 180], duration: 3000 },
            { rgbw: [80, 200, 160], duration: 3000 },
            { rgbw: [160, 140, 220], duration: 3000 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [200, 80], duration: 4000, easing: easeInOutSine },
            { axis: [300, 68], duration: 4000, easing: easeInOutSine },
          ],
          colors: [48, 96], ledRing: [80, 90], gobo: 0,
        },
        {
          moves: [
            { axis: [170, 85], duration: 4500, easing: easeInOutSine },
            { axis: [320, 70], duration: 4500, easing: easeInOutSine },
            { axis: [245, 90], duration: 4500, easing: easeInOutSine },
          ],
          colors: [96, 48], ledRing: [75, 85], gobo: 0,
        },
        {
          moves: [
            { axis: [185, 78], duration: 5000, easing: easeInOutSine },
            { axis: [295, 65], duration: 5000, easing: easeInOutSine },
            { axis: [230, 82], duration: 5000, easing: easeInOutSine },
            { axis: [275, 72], duration: 5000, easing: easeInOutSine },
          ],
          colors: [48, 80], ledRing: [70, 80], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [60, 70], gobo: true, beam: 100, laser: 30, starfield: true, moves: [
          { axis: [310, 60], duration: 3500 },
          { axis: [460, 75], duration: 3500 },
          { axis: [610, 60], duration: 3500 },
          { axis: [460, 50], duration: 3500 },
        ]},
        { ledRing: [50, 60], gobo: true, beam: 90, laser: 25, starfield: true, moves: [
          { axis: [270, 60], duration: 4000 },
          { axis: [420, 75], duration: 4000 },
          { axis: [570, 60], duration: 4000 },
          { axis: [420, 50], duration: 4000 },
        ]},
        { ledRing: [70, 80], gobo: true, beam: 110, laser: 35, starfield: true, moves: [
          { axis: [340, 60], duration: 3800 },
          { axis: [490, 75], duration: 3800 },
          { axis: [640, 60], duration: 3800 },
          { axis: [490, 50], duration: 3800 },
        ]},
      ],
    },
  },

  // Medium-bright warm whites and pastels, slow motor. Cream/peach/sky PAR at 2.5s. Relaxed sweeps.
  // Light gobo, no strobe. Pleasant, bright lounge feel — warmer and lighter than chillout.
  easylistening: {
    luminous: { head: 170, mini: 210, par: 145 },
    strobing: { threshold: 0.75, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.6 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 220, 180, 60], duration: 2500 },
            { rgbw: [180, 220, 255, 40], duration: 2500 },
            { rgbw: [255, 200, 160, 50], duration: 2500 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 230, 200, 80], duration: 2500 },
            { rgbw: [200, 230, 255, 30], duration: 2500 },
            { rgbw: [255, 210, 180, 60], duration: 2500 },
          ]
        },
        {
          colors: [
            { rgbw: [240, 210, 170, 70], duration: 3000 },
            { rgbw: [170, 210, 240, 30], duration: 3000 },
            { rgbw: [255, 230, 210, 80], duration: 3000 },
            { rgbw: [200, 220, 255, 40], duration: 3000 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [210, 78], duration: 3500, easing: easeInOutSine },
            { axis: [305, 66], duration: 3500, easing: easeInOutSine },
          ],
          colors: [0, 48], ledRing: [88, 96], gobo: 16,
        },
        {
          moves: [
            { axis: [175, 82], duration: 4000, easing: easeInOutSine },
            { axis: [325, 68], duration: 4000, easing: easeInOutSine },
            { axis: [255, 80], duration: 4000, easing: easeInOutSine },
          ],
          colors: [48, 0], ledRing: [96, 88], gobo: 0,
        },
        {
          moves: [
            { axis: [195, 76], duration: 4000, easing: easeInOutSine },
            { axis: [295, 64], duration: 4000, easing: easeInOutSine },
            { axis: [245, 82], duration: 4000, easing: easeInOutSine },
            { axis: [270, 72], duration: 4000, easing: easeInOutSine },
          ],
          colors: [0, 64], ledRing: [84, 92], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [70, 80], gobo: true, beam: 120, laser: 35, starfield: true, moves: [
          { axis: [255, 35], duration: 3500 },
          { axis: [405, 60], duration: 3500 },
          { axis: [555, 35], duration: 3500 },
          { axis: [405, 15], duration: 3500 },
        ]},
        { ledRing: [60, 70], gobo: true, beam: 110, laser: 30, starfield: true, moves: [
          { axis: [210, 35], duration: 3500 },
          { axis: [360, 60], duration: 3500 },
          { axis: [510, 35], duration: 3500 },
          { axis: [360, 15], duration: 3500 },
        ]},
        { ledRing: [80, 90], gobo: true, beam: 130, laser: 40, starfield: true, moves: [
          { axis: [300, 35], duration: 3500 },
          { axis: [450, 60], duration: 3500 },
          { axis: [600, 35], duration: 3500 },
          { axis: [450, 15], duration: 3500 },
        ]},
      ],
    },
  },

  // Dim warm glow, very slow motor. Amber/orange PAR with long 2s transitions. Slow sine head.
  // No prism, minimal gobo. Intimate club feel.
  jazz: {
    luminous: { head: 150, mini: 200, par: 140 },
    strobing: { threshold: 0.5, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.5 },
    variants: {
      par: [
        // Deep amber→burnt orange→warm orange PAR.
        {
          colors: [
            { rgbw: [255, 120, 0], duration: 2000 },
            { rgbw: [200, 80, 0], duration: 2000 },
            { rgbw: [255, 60, 0], duration: 2000 },
          ]
        },
        // Copper→gold→rust PAR.
        {
          colors: [
            { rgbw: [200, 100, 0], duration: 2000 },
            { rgbw: [255, 160, 30], duration: 2000 },
            { rgbw: [180, 70, 0], duration: 2000 },
          ]
        },
        // Warm honey→sienna→ochre PAR. Late-night feel.
        {
          colors: [
            { rgbw: [240, 140, 10], duration: 2500 },
            { rgbw: [180, 90, 0], duration: 2500 },
            { rgbw: [255, 180, 40], duration: 2500 },
            { rgbw: [160, 60, 0], duration: 2500 },
          ]
        },
      ],
      head: [
        {
          // Center (210°) ↔ right-center (295°), tilt 75→65. Slow lazy nod, barely moves pan, dips slightly on right.
          moves: [
            { axis: [210, 75], duration: 3000, easing: easeInOutSine },
            { axis: [295, 65], duration: 3000, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [82, 88], gobo: 16,
        },
        {
          // Left (170°) → right (340°) → center (255°), tilt 105→80→65. Starts high-left, slowly descends as it drifts right then settles low-center.
          moves: [
            { axis: [170, 105], duration: 3000, easing: easeInOutSine },
            { axis: [340, 80], duration: 3000, easing: easeInOutSine },
            { axis: [255, 65], duration: 3000, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [88, 82], gobo: 0,
        },
        {
          // Center (190°) → right-center (275°) → left (150°) → right (320°), tilt 85→60→75→90. Meditative four-point wander, tilt oscillates high-low.
          moves: [
            { axis: [190, 85], duration: 3500, easing: easeInOutSine },
            { axis: [275, 60], duration: 3500, easing: easeInOutSine },
            { axis: [150, 75], duration: 3500, easing: easeInOutSine },
            { axis: [320, 90], duration: 3500, easing: easeInOutSine },
          ],
          colors: [80, 16], ledRing: [76, 82], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [90, 100], gobo: true, beam: 140, laser: 50, starfield: true, moves: [
          { axis: [255, 60], duration: 3000 },
          { axis: [405, 75], duration: 3000 },
          { axis: [555, 60], duration: 3000 },
          { axis: [405, 50], duration: 3000 },
        ]},
        { ledRing: [120, 130], gobo: true, beam: 120, laser: 45, starfield: true, moves: [
          { axis: [210, 60], duration: 3000 },
          { axis: [360, 75], duration: 3000 },
          { axis: [510, 60], duration: 3000 },
          { axis: [360, 50], duration: 3000 },
        ]},
        { ledRing: [60, 70], gobo: true, beam: 110, laser: 40, starfield: true, moves: [
          { axis: [300, 60], duration: 3000 },
          { axis: [450, 75], duration: 3000 },
          { axis: [600, 60], duration: 3000 },
          { axis: [450, 50], duration: 3000 },
        ]},
      ],
    },
  },

  // Dim blue/indigo tones, very slow motor. Cool blue→purple PAR with 2s steps. No prism.
  // Melancholic, smoky bar atmosphere.
  blues: {
    luminous: { head: 150, mini: 200, par: 140 },
    strobing: { threshold: 0.5, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.5 },
    variants: {
      par: [
        // Navy→purple→steel blue PAR.
        {
          colors: [
            { rgbw: [0, 80, 200], duration: 2000 },
            { rgbw: [100, 50, 150], duration: 2000 },
            { rgbw: [0, 120, 180], duration: 2000 },
          ]
        },
        // Cobalt→violet→ocean PAR.
        {
          colors: [
            { rgbw: [50, 50, 200], duration: 2000 },
            { rgbw: [150, 80, 200], duration: 2000 },
            { rgbw: [0, 100, 180], duration: 2000 },
          ]
        },
        // Midnight blue→slate→dark teal PAR.
        {
          colors: [
            { rgbw: [0, 40, 160], duration: 2500 },
            { rgbw: [60, 60, 140], duration: 2500 },
            { rgbw: [0, 80, 120], duration: 2500 },
            { rgbw: [30, 30, 180], duration: 2500 },
          ]
        },
      ],
      head: [
        {
          // Center (210°) ↔ right-center (295°), tilt 70→85. Melancholic micro-swing, barely leaves center, lifts slightly right.
          moves: [
            { axis: [210, 70], duration: 3000, easing: easeInOutSine },
            { axis: [295, 85], duration: 3000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [82, 76], gobo: 0,
        },
        {
          // Left (125°) → right (380°) → center (235°), tilt 65→88→116. Wide slow sweep, climbs to highest tilt at center return.
          moves: [
            { axis: [125, 65], duration: 3000, easing: easeInOutSine },
            { axis: [380, 88], duration: 3000, easing: easeInOutSine },
            { axis: [235, 116], duration: 3000, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [94, 88], gobo: 16,
        },
        {
          // Center cluster: 200→255→220°, tilt 74→92→60. Nearly still, small triangle path, tilt dips low on the last point.
          moves: [
            { axis: [200, 74], duration: 3500, easing: easeInOutSine },
            { axis: [255, 92], duration: 3500, easing: easeInOutSine },
            { axis: [220, 60], duration: 3500, easing: easeInOutSine },
          ],
          colors: [112, 96], ledRing: [70, 82], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [130, 140], gobo: true, beam: 150, laser: 55, starfield: true, moves: [
          { axis: [255, 60], duration: 3000 },
          { axis: [405, 75], duration: 3000 },
          { axis: [555, 60], duration: 3000 },
          { axis: [405, 50], duration: 3000 },
        ]},
        { ledRing: [110, 120], gobo: true, beam: 130, laser: 48, starfield: true, moves: [
          { axis: [210, 60], duration: 3000 },
          { axis: [360, 75], duration: 3000 },
          { axis: [510, 60], duration: 3000 },
          { axis: [360, 50], duration: 3000 },
        ]},
        { ledRing: [150, 140], gobo: true, beam: 120, laser: 45, starfield: true, moves: [
          { axis: [300, 60], duration: 3000 },
          { axis: [450, 75], duration: 3000 },
          { axis: [600, 60], duration: 3000 },
          { axis: [450, 50], duration: 3000 },
        ]},
      ],
    },
  },

  // Bright, punchy. Purple/green/dark PAR at 400ms with dark rest beat. Fast expo head snaps.
  // Gobo spinning, prism on. Trap/rap club energy.
  hiphop: {
    luminous: { head: 220, mini: 255, par: 190 },
    strobing: { threshold: 0.2, paceWeight: 0.35, energyWeight: 0.65, danceExp: 1.0 },
    variants: {
      par: [
        // Purple→green→dark PAR.
        {
          colors: [
            { rgbw: [100, 0, 200], duration: 400 },
            { rgbw: [0, 200, 50], duration: 400 },
            { rgbw: [40, 0, 60], duration: 100 },
          ]
        },
        // Crimson→blue→dark PAR.
        {
          colors: [
            { rgbw: [200, 0, 100], duration: 400 },
            { rgbw: [0, 100, 200], duration: 400 },
            { rgbw: [50, 0, 40], duration: 100 },
          ]
        },
        // Gold→deep blue→dark PAR. Prism on for this variant.
        {
          colors: [
            { rgbw: [255, 200, 0], duration: 400 },
            { rgbw: [0, 0, 200], duration: 400 },
            { rgbw: [30, 20, 60], duration: 100 },
          ]
        },
      ],
      head: [
        {
          // Left-center (150°) ↔ right-center (360°), tilt 60→80. Sharp two-point snap, rises on right — aggressive trap lock.
          moves: [
            { axis: [150, 60], duration: 500, easing: easeInExpo },
            { axis: [360, 80], duration: 500, easing: easeInExpo },
          ],
          colors: [112, 32], ledRing: [214, 196], gobo: 144,
        },
        {
          // Far-left (85°) → far-right (425°) → center (235°) → left (110°). Full cycle return.
          moves: [
            { axis: [85, 56], duration: 500, easing: easeInExpo },
            { axis: [425, 90], duration: 500, easing: easeInExpo },
            { axis: [235, 66], duration: 500, easing: easeInExpo },
            { axis: [110, 58], duration: 500, easing: easeInExpo },
          ],
          colors: [16, 112], ledRing: [196, 214], gobo: 160,
        },
        {
          // Right (275°) → left (170°) → far-right (425°) → center (280°). Return toward start.
          moves: [
            { axis: [275, 56], duration: 500, easing: easeInExpo },
            { axis: [170, 100], duration: 500, easing: easeInExpo },
            { axis: [425, 66], duration: 500, easing: easeInExpo },
            { axis: [280, 60], duration: 500, easing: easeInExpo },
          ],
          colors: [64, 112], ledRing: [220, 190], gobo: 48,
        },
      ],
      mini: [
        {
          ledRing: [180, 170], gobo: true, beam: 200, laser: 45,
          moves: [
            { axis: [270, 35], duration: 500 },
            { axis: [420, 60], duration: 500 },
            { axis: [570, 35], duration: 500 },
            { axis: [420, 15], duration: 500 },
          ],
        },
        {
          ledRing: [200, 210], gobo: true, beam: 210, laser: 60,
          moves: [
            { axis: [225, 35], duration: 500 },
            { axis: [375, 60], duration: 500 },
            { axis: [525, 35], duration: 500 },
            { axis: [375, 15], duration: 500 },
          ],
        },
        {
          ledRing: [160, 180], gobo: false, beam: 180, laser: 50,
          moves: [
            { axis: [315, 35], duration: 500 },
            { axis: [465, 60], duration: 500 },
            { axis: [615, 35], duration: 500 },
            { axis: [465, 15], duration: 500 },
          ],
        },
      ],
    },
  },

  // Medium brightness, slow motor. Red/yellow/green (Rastafarian palette) PAR at 800ms.
  // Gentle sine head, minimal gobo, slight prism.
  reggae: {
    luminous: { head: 200, mini: 240, par: 170 },
    strobing: { threshold: 0.45, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.2 },
    variants: {
      par: [
        // Red→gold→green PAR.
        {
          colors: [
            { rgbw: [255, 50, 0], duration: 800 },
            { rgbw: [255, 200, 0], duration: 800 },
            { rgbw: [0, 150, 0], duration: 800 },
          ]
        },
        // Green→gold→orange PAR reversed.
        {
          colors: [
            { rgbw: [0, 200, 0], duration: 800 },
            { rgbw: [255, 200, 0], duration: 800 },
            { rgbw: [200, 50, 0], duration: 800 },
          ]
        },
        // Gold→lime→red PAR. Slight prism. Dub-leaning.
        {
          colors: [
            { rgbw: [255, 200, 0], duration: 1000 },
            { rgbw: [50, 200, 0], duration: 1000 },
            { rgbw: [200, 80, 0], duration: 1000 },
            { rgbw: [255, 150, 0], duration: 1000 },
          ]
        },
      ],
      head: [
        {
          // Center (190°) ↔ right (320°), tilt 80→65. Easy relaxed sway, drops tilt on the right like a head-bob.
          moves: [
            { axis: [190, 80], duration: 1500, easing: easeInOutSine },
            { axis: [320, 65], duration: 1500, easing: easeInOutSine },
          ],
          colors: [32, 64], ledRing: [88, 94], gobo: 32,
        },
        {
          // Left (125°) → right (380°) → center (210°), tilt 70→100→62. Gradual rise across wide sweep, settles low-center.
          moves: [
            { axis: [125, 70], duration: 1500, easing: easeInOutSine },
            { axis: [380, 100], duration: 1500, easing: easeInOutSine },
            { axis: [210, 62], duration: 1500, easing: easeInOutSine },
          ],
          colors: [64, 16], ledRing: [94, 88], gobo: 16,
        },
        {
          // Left (170°) → center-right (295°) → right (350°) → center (210°). Dub drift returns home.
          moves: [
            { axis: [170, 70], duration: 1800, easing: easeInOutSine },
            { axis: [295, 90], duration: 1800, easing: easeInOutSine },
            { axis: [350, 76], duration: 1800, easing: easeInOutSine },
            { axis: [210, 68], duration: 1800, easing: easeInOutSine },
          ],
          colors: [32, 80], ledRing: [82, 76], gobo: 32,
        },
      ],
      mini: [
        { ledRing: [70, 80], gobo: true, beam: 160, laser: 55, moves: [
          { axis: [255, 35], duration: 1500 },
          { axis: [405, 60], duration: 1500 },
          { axis: [555, 35], duration: 1500 },
          { axis: [405, 15], duration: 1500 },
        ]},
        { ledRing: [60, 50], gobo: true, beam: 140, laser: 50, moves: [
          { axis: [210, 35], duration: 1500 },
          { axis: [360, 60], duration: 1500 },
          { axis: [510, 35], duration: 1500 },
          { axis: [360, 15], duration: 1500 },
        ]},
        { ledRing: [30, 20], gobo: true, beam: 120, laser: 45, moves: [
          { axis: [300, 35], duration: 1500 },
          { axis: [450, 60], duration: 1500 },
          { axis: [600, 35], duration: 1500 },
          { axis: [450, 15], duration: 1500 },
        ]},
      ],
    },
  },

  // Bright warm, medium motor. Warm orange/pink/gold PAR at 500ms. Smooth two/three-point head.
  // Gobo spinning, prism on. Fiesta energy.
  latin: {
    luminous: { head: 220, mini: 255, par: 190 },
    strobing: { threshold: 0.22, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        // Orange→pink→gold PAR.
        {
          colors: [
            { rgbw: [255, 150, 0], duration: 500 },
            { rgbw: [255, 0, 150], duration: 500 },
            { rgbw: [255, 220, 0], duration: 500 },
          ]
        },
        // Rose→amber→magenta PAR.
        {
          colors: [
            { rgbw: [255, 0, 100], duration: 500 },
            { rgbw: [255, 150, 0], duration: 500 },
            { rgbw: [200, 0, 200], duration: 500 },
          ]
        },
        // Yellow→flame→olive PAR. Gobo spinning fast, prism on.
        {
          colors: [
            { rgbw: [255, 220, 0], duration: 500 },
            { rgbw: [255, 80, 0], duration: 500 },
            { rgbw: [200, 200, 0], duration: 500 },
          ]
        },
      ],
      head: [
        {
          // Left-center (170°) ↔ right-center (340°), tilt 70→85. Lively two-point fiesta swing, rises right.
          moves: [
            { axis: [170, 70], duration: 800, easing: easeInOutSine },
            { axis: [340, 85], duration: 800, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [172, 184], gobo: 128,
        },
        {
          // Left (105°) → right (425°) → center (235°), tilt 62→82→106. Wide salsa sweep, starts low-left, steps right, lifts high-center.
          moves: [
            { axis: [105, 62], duration: 800, easing: easeInOutSine },
            { axis: [425, 82], duration: 800, easing: easeInOutSine },
            { axis: [235, 106], duration: 800, easing: easeInOutSine },
          ],
          colors: [16, 96], ledRing: [184, 172], gobo: 80,
        },
        {
          // Right (275°) → left (150°) → far-right (380°), tilt 74→100→62. Reverse-direction bounce: starts right, rises left, snaps low-right.
          moves: [
            { axis: [275, 74], duration: 800, easing: easeInOutSine },
            { axis: [150, 100], duration: 800, easing: easeInOutSine },
            { axis: [380, 62], duration: 800, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [148, 142], gobo: 140,
        },
      ],
      mini: [
        {
          ledRing: [190, 200], gobo: true, beam: 190, laser: 40,
          moves: [
            { axis: [270, 35], duration: 800 },
            { axis: [420, 60], duration: 800 },
            { axis: [570, 35], duration: 800 },
            { axis: [420, 15], duration: 800 },
          ],
        },
        {
          ledRing: [200, 220], gobo: true, beam: 200, laser: 55,
          moves: [
            { axis: [225, 35], duration: 800 },
            { axis: [375, 60], duration: 800 },
            { axis: [525, 35], duration: 800 },
            { axis: [375, 15], duration: 800 },
          ],
        },
        {
          ledRing: [40, 50], gobo: false, beam: 170, laser: 45,
          moves: [
            { axis: [315, 35], duration: 800 },
            { axis: [465, 60], duration: 800 },
            { axis: [615, 35], duration: 800 },
            { axis: [465, 15], duration: 800 },
          ],
        },
      ],
    },
  },

  // Medium brightness, medium-slow motor. Orange/magenta/gold PAR at 800ms. Smooth three-point head.
  // Light prism on some variants. Groove-driven, warm.
  funk: {
    luminous: { head: 200, mini: 240, par: 170 },
    strobing: { threshold: 0.3, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        // Orange→crimson→gold PAR. Light prism.
        {
          colors: [
            { rgbw: [255, 100, 0], duration: 800 },
            { rgbw: [200, 0, 100], duration: 800 },
            { rgbw: [255, 200, 0], duration: 800 },
          ]
        },
        // Magenta→amber→violet PAR. Prism barely on.
        {
          colors: [
            { rgbw: [200, 0, 150], duration: 800 },
            { rgbw: [255, 150, 0], duration: 800 },
            { rgbw: [100, 0, 200], duration: 800 },
          ]
        },
        // Gold→tan→coral PAR. Prism off, earthier palette.
        {
          colors: [
            { rgbw: [255, 200, 0], duration: 800 },
            { rgbw: [200, 100, 0], duration: 800 },
            { rgbw: [255, 50, 100], duration: 800 },
          ]
        },
      ],
      head: [
        {
          // Left-center (150°) ↔ right-center (340°), tilt 65→80. Smooth groove two-step, rises gently to the right.
          moves: [
            { axis: [150, 65], duration: 1200, easing: easeInOutSine },
            { axis: [340, 80], duration: 1200, easing: easeInOutSine },
          ],
          colors: [80, 96], ledRing: [142, 172], gobo: 64,
        },
        {
          // Far-left (85°) → far-right (400°) → center (210°), tilt 60→80→106. Wide funk sweep, steadily climbing tilt, peaks high-center.
          moves: [
            { axis: [85, 60], duration: 1200, easing: easeInOutSine },
            { axis: [400, 80], duration: 1200, easing: easeInOutSine },
            { axis: [210, 106], duration: 1200, easing: easeInOutSine },
          ],
          colors: [96, 80], ledRing: [172, 142], gobo: 48,
        },
        {
          // Center-right (235°) → left (125°) → right (360°), tilt 64→100→80. Crosses from right to left and back, rises left.
          moves: [
            { axis: [235, 64], duration: 1200, easing: easeInOutSine },
            { axis: [125, 100], duration: 1200, easing: easeInOutSine },
            { axis: [360, 80], duration: 1200, easing: easeInOutSine },
          ],
          colors: [64, 96], ledRing: [160, 148], gobo: 80,
        },
      ],
      mini: [
        { ledRing: [100, 90], gobo: true, beam: 180, laser: 60, moves: [
          { axis: [255, 35], duration: 1200 },
          { axis: [405, 60], duration: 1200 },
          { axis: [555, 35], duration: 1200 },
          { axis: [405, 15], duration: 1200 },
        ]},
        { ledRing: [110, 120], gobo: true, beam: 170, laser: 55, moves: [
          { axis: [210, 35], duration: 1200 },
          { axis: [360, 60], duration: 1200 },
          { axis: [510, 35], duration: 1200 },
          { axis: [360, 15], duration: 1200 },
        ]},
        { ledRing: [80, 70], gobo: true, beam: 150, laser: 50, moves: [
          { axis: [300, 35], duration: 1200 },
          { axis: [450, 60], duration: 1200 },
          { axis: [600, 35], duration: 1200 },
          { axis: [450, 15], duration: 1200 },
        ]},
      ],
    },
  },

  // Dim earthy tones, very slow motor. Warm amber/sage PAR with long 2.5s transitions.
  // No prism, minimal gobo. Acoustic, pastoral feel.
  folk: {
    luminous: { head: 160, mini: 210, par: 140 },
    strobing: { threshold: 0.6, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.5 },
    variants: {
      par: [
        // Amber→sage PAR.
        {
          colors: [
            { rgbw: [200, 150, 50], duration: 2500 },
            { rgbw: [150, 200, 100], duration: 2500 },
          ]
        },
        // Tan→wheat→moss PAR. No gobo.
        {
          colors: [
            { rgbw: [180, 130, 40], duration: 2500 },
            { rgbw: [200, 170, 80], duration: 2500 },
            { rgbw: [120, 180, 60], duration: 2500 },
          ]
        },
        // Straw→rust→sage→ochre PAR. Very slow four-color loop.
        {
          colors: [
            { rgbw: [220, 180, 60], duration: 3000 },
            { rgbw: [180, 80, 30], duration: 3000 },
            { rgbw: [100, 160, 50], duration: 3000 },
            { rgbw: [200, 160, 40], duration: 3000 },
          ]
        },
      ],
      head: [
        {
          // Center (210°) ↔ right (320°), tilt 70→80. Pastoral two-point nod, nearly stationary.
          moves: [
            { axis: [210, 70], duration: 3000, easing: easeInOutSine },
            { axis: [320, 80], duration: 3000, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [82, 88], gobo: 16,
        },
        {
          // Left (170°) → right (340°) → center (255°), tilt 80→65→85. Unhurried three-point stroll, dips right then rises center.
          moves: [
            { axis: [170, 80], duration: 3000, easing: easeInOutSine },
            { axis: [340, 65], duration: 3000, easing: easeInOutSine },
            { axis: [255, 85], duration: 3000, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [76, 82], gobo: 0,
        },
        {
          // Center (190°) → right (330°) → center (235°), tilt 75→65→80. Glacial three-point drift, floats right then back, rises slightly on return.
          moves: [
            { axis: [190, 75], duration: 4000, easing: easeInOutSine },
            { axis: [330, 65], duration: 4000, easing: easeInOutSine },
            { axis: [235, 80], duration: 4000, easing: easeInOutSine },
          ],
          colors: [64, 32], ledRing: [88, 76], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [20, 30], gobo: true, beam: 130, laser: 45, starfield: true, moves: [
          { axis: [255, 60], duration: 3000 },
          { axis: [405, 75], duration: 3000 },
          { axis: [555, 60], duration: 3000 },
          { axis: [405, 50], duration: 3000 },
        ]},
        { ledRing: [10, 20], gobo: true, beam: 110, laser: 40, starfield: true, moves: [
          { axis: [210, 60], duration: 3000 },
          { axis: [360, 75], duration: 3000 },
          { axis: [510, 60], duration: 3000 },
          { axis: [360, 50], duration: 3000 },
        ]},
        { ledRing: [60, 50], gobo: true, beam: 100, laser: 35, starfield: true, moves: [
          { axis: [300, 60], duration: 3000 },
          { axis: [450, 75], duration: 3000 },
          { axis: [600, 60], duration: 3000 },
          { axis: [450, 50], duration: 3000 },
        ]},
      ],
    },
  },

  // Soft warm white with cool blue accent, very slow motor. White-wash PAR with white additive (w channel).
  // Extremely slow 5s head moves. No gobo, no prism. Concert hall atmosphere.
  classical: {
    luminous: { head: 180, mini: 220, par: 150 },
    strobing: { threshold: 0.8, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.0 },
    variants: {
      par: [
        // Warm white→cool white PAR with white additive.
        {
          colors: [
            { rgbw: [255, 240, 200, 100], duration: 4000 },
            { rgbw: [200, 220, 255, 50], duration: 4000 },
          ]
        },
        // Lavender white→cream PAR. No gobo.
        {
          colors: [
            { rgbw: [220, 210, 255, 80], duration: 4000 },
            { rgbw: [255, 250, 230, 60], duration: 4000 },
          ]
        },
        // Rose gold→icy blue→parchment PAR. Romantic hall.
        {
          colors: [
            { rgbw: [255, 220, 200, 70], duration: 5000 },
            { rgbw: [180, 210, 255, 40], duration: 5000 },
            { rgbw: [255, 240, 210, 90], duration: 5000 },
            { rgbw: [200, 220, 240, 30], duration: 5000 },
          ]
        },
      ],
      head: [
        {
          // Center (235°) ↔ right-center (275°), tilt 70→85. Barely visible 40° pan shift, lifts gently — concert hall stillness.
          moves: [
            { axis: [235, 70], duration: 5000, easing: easeInOutSine },
            { axis: [275, 85], duration: 5000, easing: easeInOutSine },
          ],
          colors: [0, 48], ledRing: [88, 82], gobo: 0,
        },
        {
          // Left-center (210°) → right-center (295°) → center (255°), tilt 80→70→85. Slow triangular drift within an 85° window, imperceptible movement.
          moves: [
            { axis: [210, 80], duration: 5000, easing: easeInOutSine },
            { axis: [295, 70], duration: 5000, easing: easeInOutSine },
            { axis: [255, 85], duration: 5000, easing: easeInOutSine },
          ],
          colors: [0, 112], ledRing: [82, 88], gobo: 0,
        },
        {
          // 245→265→230→280°, tilt 75→80→70→75. Four-point micro-float within a 50° square — head appears almost still, gentle breathing motion.
          moves: [
            { axis: [245, 75], duration: 6000, easing: easeInOutSine },
            { axis: [265, 80], duration: 6000, easing: easeInOutSine },
            { axis: [230, 70], duration: 6000, easing: easeInOutSine },
            { axis: [280, 75], duration: 6000, easing: easeInOutSine },
          ],
          colors: [0, 48], ledRing: [76, 88], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [50, 60], gobo: true, beam: 110, laser: 28, starfield: true, moves: [
          { axis: [255, 60], duration: 5000 },
          { axis: [405, 75], duration: 5000 },
          { axis: [555, 60], duration: 5000 },
          { axis: [405, 50], duration: 5000 },
        ]},
        { ledRing: [10, 20], gobo: true, beam: 90, laser: 22, starfield: true, moves: [
          { axis: [240, 60], duration: 5000 },
          { axis: [390, 75], duration: 5000 },
          { axis: [540, 60], duration: 5000 },
          { axis: [390, 50], duration: 5000 },
        ]},
        { ledRing: [30, 40], gobo: true, beam: 80, laser: 18, starfield: true, moves: [
          { axis: [270, 60], duration: 5000 },
          { axis: [420, 75], duration: 5000 },
          { axis: [570, 60], duration: 5000 },
          { axis: [420, 50], duration: 5000 },
        ]},
      ],
    },
  },

  // Max brightness, fast motor. Deep blue/cyan/white rapid 200ms cycling. Aggressive expo snaps.
  // Prism always on, fast gobo spin. 4-on-the-floor club energy distinct from general Electronic.
  house: {
    luminous: { head: 255, mini: 255, par: 200 },
    strobing: { threshold: 0.12, paceWeight: 0.4, energyWeight: 0.6, danceExp: 0.7 },
    variants: {
      par: [
        // Cyan→white→blue→deep blue PAR.
        {
          colors: [
            { rgbw: [0, 255, 255], duration: 200 },
            { rgbw: [255, 255, 255], duration: 100 },
            { rgbw: [0, 100, 255], duration: 200 },
            { rgbw: [0, 0, 200], duration: 100 },
          ]
        },
        // White→magenta→cyan→white PAR.
        {
          colors: [
            { rgbw: [255, 255, 255], duration: 150 },
            { rgbw: [255, 0, 200], duration: 200 },
            { rgbw: [0, 255, 200], duration: 200 },
            { rgbw: [255, 255, 255], duration: 100 },
          ]
        },
        // Deep purple→electric blue→white PAR.
        {
          colors: [
            { rgbw: [150, 0, 255], duration: 200 },
            { rgbw: [0, 50, 255], duration: 200 },
            { rgbw: [255, 255, 255], duration: 100 },
            { rgbw: [100, 0, 200], duration: 150 },
          ]
        },
      ],
      head: [
        {
          // Far-left (105°) ↔ far-right (400°), tilt 56→68. Machine-precise left-right stomp, mimics kick-drum on the beat.
          moves: [
            { axis: [105, 56], duration: 400, easing: easeInExpo },
            { axis: [400, 68], duration: 400, easing: easeInExpo },
          ],
          colors: [112, 48], ledRing: [238, 250], gobo: 170,
        },
        {
          // Far-left (65°) → center (275°) → far-right (445°), tilt 56→84→62. Three-beat slam across full stage, peaks center-high, finishes right-low.
          moves: [
            { axis: [65, 56], duration: 400, easing: easeInExpo },
            { axis: [275, 84], duration: 400, easing: easeInExpo },
            { axis: [445, 62], duration: 400, easing: easeInExpo },
          ],
          colors: [48, 0], ledRing: [226, 232], gobo: 190,
        },
        {
          // Extreme-left (40°) → extreme-right (465°) → center (235°), tilt 66→56→96. Max 425° excursion, fast drops low-right, rebounds high-center.
          moves: [
            { axis: [40, 66], duration: 350, easing: easeInExpo },
            { axis: [465, 56], duration: 350, easing: easeInExpo },
            { axis: [235, 96], duration: 350, easing: easeInExpo },
          ],
          colors: [96, 48], ledRing: [250, 238], gobo: 150,
        },
      ],
      mini: [
        { ledRing: [210, 230], gobo: true, beam: 210, laser: 75, moves: [
          { axis: [305, 35], duration: 500 },
          { axis: [455, 60], duration: 500 },
          { axis: [605, 35], duration: 500 },
          { axis: [455, 15], duration: 500 },
        ]},
        { ledRing: [220, 200], gobo: true, beam: 220, laser: 80, moves: [
          { axis: [265, 35], duration: 480 },
          { axis: [415, 60], duration: 480 },
          { axis: [565, 35], duration: 480 },
          { axis: [415, 15], duration: 480 },
        ]},
        { ledRing: [180, 190], gobo: false, beam: 200, laser: 70, moves: [
          { axis: [335, 35], duration: 550 },
          { axis: [485, 60], duration: 550 },
          { axis: [635, 35], duration: 550 },
          { axis: [485, 15], duration: 550 },
        ]},
      ],
    },
  },

  // Very dim, near-static. Dark charcoal/deep teal/black PAR at 6–8s. Barely-moving head.
  // No prism, no gobo. Meditative, dark. Faint starfield adds depth without breaking silence.
  ambient: {
    luminous: { head: 60, mini: 80, par: 40 },
    strobing: { threshold: 0.95, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.5 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [0, 20, 40], duration: 8000 },
            { rgbw: [0, 50, 60], duration: 8000 },
            { rgbw: [0, 10, 30], duration: 8000 },
          ]
        },
        {
          colors: [
            { rgbw: [20, 0, 60], duration: 8000 },
            { rgbw: [5, 5, 30], duration: 8000 },
            { rgbw: [10, 20, 50], duration: 8000 },
          ]
        },
        {
          colors: [
            { rgbw: [0, 30, 50], duration: 10000 },
            { rgbw: [15, 0, 45], duration: 10000 },
            { rgbw: [0, 40, 35], duration: 10000 },
            { rgbw: [10, 10, 60], duration: 10000 },
          ]
        },
      ],
      head: [
        {
          // Slow breath — 30° pan drift, tilt barely changes.
          moves: [
            { axis: [235, 75], duration: 12000, easing: easeInOutSine },
            { axis: [265, 80], duration: 12000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [70, 76], gobo: 0,
        },
        {
          // Wide slow arc — 150° pan over 20s, visible but unhurried.
          moves: [
            { axis: [180, 78], duration: 20000, easing: easeInOutSine },
            { axis: [330, 68], duration: 20000, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [60, 70], gobo: 0,
        },
        {
          // Four-point wander — 120° range, tilt oscillates gently.
          moves: [
            { axis: [200, 80], duration: 10000, easing: easeInOutSine },
            { axis: [280, 70], duration: 10000, easing: easeInOutSine },
            { axis: [220, 85], duration: 10000, easing: easeInOutSine },
            { axis: [300, 72], duration: 10000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [50, 65], gobo: 0,
        },
        {
          // Very slow diagonal drift — wide pan across 180°, then drifts back. ~60s full cycle.
          moves: [
            { axis: [160, 70], duration: 15000, easing: easeInOutSine },
            { axis: [255, 82], duration: 15000, easing: easeInOutSine },
            { axis: [340, 90], duration: 15000, easing: easeInOutSine },
            { axis: [200, 74], duration: 15000, easing: easeInOutSine },
          ],
          colors: [48, 96], ledRing: [55, 70], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [0, 10], gobo: true, beam: 40, laser: 20, starfield: true, moves: [
          { axis: [310, 60], duration: 8000 },
          { axis: [460, 75], duration: 8000 },
          { axis: [610, 60], duration: 8000 },
          { axis: [460, 50], duration: 8000 },
        ]},
        { ledRing: [0, 15], gobo: true, beam: 35, laser: 18, starfield: true, moves: [
          { axis: [270, 60], duration: 10000 },
          { axis: [420, 75], duration: 10000 },
          { axis: [570, 60], duration: 10000 },
          { axis: [420, 50], duration: 10000 },
        ]},
        { ledRing: [0, 10], gobo: true, beam: 30, laser: 15, starfield: true, moves: [
          { axis: [340, 60], duration: 9000 },
          { axis: [490, 75], duration: 9000 },
          { axis: [640, 60], duration: 9000 },
          { axis: [490, 50], duration: 9000 },
        ]},
      ],
    },
  },

  // Medium-bright warm, slow motor. Deep rose/mauve/amber PAR at 1.5s. Gentle two/three-point head.
  // Light prism on some variants. Smooth, sensual, late-night feel.
  rnb: {
    luminous: { head: 190, mini: 230, par: 160 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.2 },
    variants: {
      par: [
        // Deep rose→mauve→coral PAR. Light prism.
        {
          colors: [
            { rgbw: [220, 30, 80], duration: 1500 },
            { rgbw: [180, 50, 120], duration: 1500 },
            { rgbw: [255, 80, 60], duration: 1500 },
          ]
        },
        // Wine→amber→dusty pink PAR. No prism. Earthier.
        {
          colors: [
            { rgbw: [180, 20, 60], duration: 1500 },
            { rgbw: [220, 120, 20], duration: 1500 },
            { rgbw: [200, 80, 100], duration: 1500 },
          ]
        },
        // Magenta→peach→crimson PAR. Slight prism.
        {
          colors: [
            { rgbw: [255, 50, 150], duration: 1500 },
            { rgbw: [255, 160, 100], duration: 1500 },
            { rgbw: [200, 20, 50], duration: 1500 },
          ]
        },
      ],
      head: [
        {
          // Left-center (180°) ↔ right-center (330°), tilt 70→80. Sensual slow swing, rises gently right like a sway.
          moves: [
            { axis: [180, 70], duration: 2000, easing: easeInOutSine },
            { axis: [330, 80], duration: 2000, easing: easeInOutSine },
          ],
          colors: [80, 96], ledRing: [148, 130], gobo: 32,
        },
        {
          // Left (125°) → right (360°) → center (220°), tilt 68→84→106. Sweeps wide then comes home high-center, a slow soul resolve.
          moves: [
            { axis: [125, 68], duration: 2000, easing: easeInOutSine },
            { axis: [360, 84], duration: 2000, easing: easeInOutSine },
            { axis: [220, 106], duration: 2000, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [130, 148], gobo: 48,
        },
        {
          // Far-left (85°) → far-right (400°) → center (245°) → left (110°). Smooth full return.
          moves: [
            { axis: [85, 60], duration: 2000, easing: easeInOutSine },
            { axis: [400, 80], duration: 2000, easing: easeInOutSine },
            { axis: [245, 65], duration: 2000, easing: easeInOutSine },
            { axis: [110, 62], duration: 2000, easing: easeInOutSine },
          ],
          colors: [96, 16], ledRing: [166, 178], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [80, 60], gobo: true, beam: 160, laser: 55, starfield: true, moves: [
          { axis: [255, 60], duration: 2000 },
          { axis: [405, 75], duration: 2000 },
          { axis: [555, 60], duration: 2000 },
          { axis: [405, 50], duration: 2000 },
        ]},
        { ledRing: [70, 80], gobo: true, beam: 150, laser: 50, starfield: true, moves: [
          { axis: [210, 60], duration: 2000 },
          { axis: [360, 75], duration: 2000 },
          { axis: [510, 60], duration: 2000 },
          { axis: [360, 50], duration: 2000 },
        ]},
        { ledRing: [110, 100], gobo: true, beam: 130, laser: 45, starfield: true, moves: [
          { axis: [300, 60], duration: 2000 },
          { axis: [450, 75], duration: 2000 },
          { axis: [600, 60], duration: 2000 },
          { axis: [450, 50], duration: 2000 },
        ]},
      ],
    },
  },

  // Max brightness, very fast motor. Dark red/deep purple/near-black PAR at 150-250ms bursts.
  // Extreme expo head snaps to very wide pan. No prism on most variants. Brutal, relentless energy.
  metal: {
    luminous: { head: 255, mini: 255, par: 200 },
    strobing: { threshold: 0.12, paceWeight: 0.45, energyWeight: 0.55, danceExp: 0.7 },
    variants: {
      par: [
        // Blood red→black→dark red PAR.
        {
          colors: [
            { rgbw: [200, 0, 0], duration: 250 },
            { rgbw: [20, 0, 0], duration: 150 },
            { rgbw: [180, 0, 0], duration: 250 },
            { rgbw: [10, 0, 0], duration: 100 },
          ]
        },
        // Deep purple→near-black→crimson PAR.
        {
          colors: [
            { rgbw: [100, 0, 150], duration: 200 },
            { rgbw: [10, 0, 10], duration: 100 },
            { rgbw: [180, 0, 0], duration: 200 },
            { rgbw: [5, 0, 5], duration: 100 },
          ]
        },
        // Orange-red→black→dark orange PAR. Slight prism.
        {
          colors: [
            { rgbw: [255, 30, 0], duration: 200 },
            { rgbw: [15, 0, 0], duration: 100 },
            { rgbw: [200, 20, 0], duration: 200 },
            { rgbw: [10, 0, 0], duration: 100 },
          ]
        },
        // White flash opener→red→black. Prism off.
        {
          colors: [
            { rgbw: [255, 255, 255], duration: 80 },
            { rgbw: [220, 0, 0], duration: 200 },
            { rgbw: [60, 0, 0], duration: 150 },
            { rgbw: [180, 0, 0], duration: 200 },
          ]
        },
      ],
      head: [
        {
          // Extreme-left (40°) ↔ extreme-right (485°), tilt 56→68. ~445° binary hammer — maximum possible excursion, no middle stop.
          moves: [
            { axis: [40, 56], duration: 300, easing: easeInExpo },
            { axis: [485, 68], duration: 300, easing: easeInExpo },
          ],
          colors: [16, 0], ledRing: [154, 190], gobo: 32,
        },
        {
          // Extreme-left (30°) → extreme-right (495°) → center (255°) → left (50°). Thrash and return.
          moves: [
            { axis: [30, 56], duration: 280, easing: easeInExpo },
            { axis: [495, 70], duration: 280, easing: easeInExpo },
            { axis: [255, 56], duration: 280, easing: easeInExpo },
            { axis: [50, 58], duration: 280, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [190, 154], gobo: 48,
        },
        {
          // Extreme-left (20°) → extreme-right (510°) → center (235°) → left (40°). Chaotic sweep, snaps back.
          moves: [
            { axis: [20, 60], duration: 300, easing: easeInExpo },
            { axis: [510, 56], duration: 300, easing: easeInExpo },
            { axis: [235, 58], duration: 300, easing: easeInExpo },
            { axis: [40, 62], duration: 300, easing: easeInExpo },
          ],
          colors: [16, 80], ledRing: [220, 250], gobo: 16,
        },
        {
          // Left (65°) → far-right (465°) → right-center (275°) → left (90°). Erratic slam, returns left.
          moves: [
            { axis: [65, 64], duration: 250, easing: easeInExpo },
            { axis: [465, 56], duration: 250, easing: easeInExpo },
            { axis: [275, 76], duration: 250, easing: easeInExpo },
            { axis: [90, 60], duration: 250, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [238, 220], gobo: 64,
        },
      ],
      mini: [
        {
          ledRing: [160, 180], gobo: true, beam: 220, laser: 70,
          moves: [
            { axis: [270, 35], duration: 280 },
            { axis: [420, 60], duration: 280 },
            { axis: [570, 35], duration: 280 },
            { axis: [420, 15], duration: 280 },
          ],
        },
        {
          ledRing: [180, 200], gobo: true, beam: 230, laser: 80,
          moves: [
            { axis: [225, 35], duration: 280 },
            { axis: [375, 60], duration: 280 },
            { axis: [525, 35], duration: 280 },
            { axis: [375, 15], duration: 280 },
          ],
        },
        {
          ledRing: [210, 230], gobo: true, beam: 215, laser: 75,
          moves: [
            { axis: [315, 35], duration: 280 },
            { axis: [465, 60], duration: 280 },
            { axis: [615, 35], duration: 280 },
            { axis: [465, 15], duration: 280 },
          ],
        },
        {
          ledRing: [150, 160], gobo: false, beam: 200, laser: 65,
          moves: [
            { axis: [270, 35], duration: 280 },
            { axis: [420, 60], duration: 280 },
            { axis: [570, 35], duration: 280 },
            { axis: [420, 15], duration: 280 },
          ],
        },
      ],
    },
  },

  // Medium-bright warm golden tones, moderate motor. Gold/amber/warm white PAR at 700ms.
  // Smooth two/three-point head. Light gobo, no prism. Nashville honky-tonk warmth.
  country: {
    luminous: { head: 200, mini: 230, par: 170 },
    strobing: { threshold: 0.45, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.2 },
    variants: {
      par: [
        // Gold→warm white→amber PAR.
        {
          colors: [
            { rgbw: [255, 200, 50], duration: 700 },
            { rgbw: [255, 240, 180], duration: 700 },
            { rgbw: [240, 150, 30], duration: 700 },
          ]
        },
        // Honey→peach→straw PAR. Gobo subtle.
        {
          colors: [
            { rgbw: [255, 180, 60], duration: 700 },
            { rgbw: [255, 210, 140], duration: 700 },
            { rgbw: [220, 160, 40], duration: 700 },
            { rgbw: [255, 230, 100], duration: 700 },
          ]
        },
        // Warm cream→burnt gold→champagne PAR.
        {
          colors: [
            { rgbw: [255, 230, 160], duration: 800 },
            { rgbw: [210, 140, 20], duration: 800 },
            { rgbw: [255, 220, 120], duration: 800 },
            { rgbw: [200, 120, 30], duration: 800 },
          ]
        },
      ],
      head: [
        {
          // Left-center (180°) ↔ right-center (330°), tilt 70→80. Easy honky-tonk two-step, rises right like a tip of the hat.
          moves: [
            { axis: [180, 70], duration: 1200, easing: easeInOutSine },
            { axis: [330, 80], duration: 1200, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [88, 82], gobo: 16,
        },
        {
          // Left (125°) → right (370°) → center (235°), tilt 65→80→65. Three-step country ramble, rises right, rests low-center.
          moves: [
            { axis: [125, 65], duration: 1200, easing: easeInOutSine },
            { axis: [370, 80], duration: 1200, easing: easeInOutSine },
            { axis: [235, 65], duration: 1200, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [82, 94], gobo: 32,
        },
        {
          // Left (160°) → right (305°) → far-right (340°) → center (200°). Waltz returns home.
          moves: [
            { axis: [160, 75], duration: 1400, easing: easeInOutSine },
            { axis: [305, 65], duration: 1400, easing: easeInOutSine },
            { axis: [340, 70], duration: 1400, easing: easeInOutSine },
            { axis: [200, 78], duration: 1400, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [94, 88], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [82, 90], gobo: true, beam: 140, laser: 55, starfield: true, moves: [
          { axis: [255, 35], duration: 1200 },
          { axis: [405, 60], duration: 1200 },
          { axis: [555, 35], duration: 1200 },
          { axis: [405, 15], duration: 1200 },
        ]},
        { ledRing: [50, 60], gobo: true, beam: 120, laser: 50, starfield: true, moves: [
          { axis: [210, 35], duration: 1200 },
          { axis: [360, 60], duration: 1200 },
          { axis: [510, 35], duration: 1200 },
          { axis: [360, 15], duration: 1200 },
        ]},
        { ledRing: [20, 30], gobo: true, beam: 110, laser: 45, starfield: true, moves: [
          { axis: [300, 35], duration: 1200 },
          { axis: [450, 60], duration: 1200 },
          { axis: [600, 35], duration: 1200 },
          { axis: [450, 15], duration: 1200 },
        ]},
      ],
    },
  },

  // Soft blue-white shimmer, barely moving. Dreamy, ethereal atmosphere. Starfield adds galaxy depth.
  beautiful: {
    luminous: { head: 160, mini: 200, par: 130 },
    strobing: { threshold: 0.85, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.0 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [180, 210, 255, 80], duration: 4000 },
            { rgbw: [255, 240, 255, 60], duration: 4000 },
            { rgbw: [140, 200, 255, 40], duration: 4000 },
          ]
        },
        {
          colors: [
            { rgbw: [220, 230, 255, 100], duration: 4500 },
            { rgbw: [180, 255, 240, 50], duration: 4500 },
            { rgbw: [255, 220, 255, 70], duration: 4500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [240, 78], duration: 6000, easing: easeInOutSine },
            { axis: [270, 68], duration: 6000, easing: easeInOutSine },
          ],
          colors: [0, 48], ledRing: [90, 100], gobo: 0,
        },
        {
          moves: [
            { axis: [220, 82], duration: 7000, easing: easeInOutSine },
            { axis: [280, 70], duration: 7000, easing: easeInOutSine },
            { axis: [250, 85], duration: 7000, easing: easeInOutSine },
          ],
          colors: [48, 0], ledRing: [80, 95], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [20, 30], gobo: true, beam: 80, laser: 25, starfield: true, moves: [
          { axis: [255, 60], duration: 6000 },
          { axis: [405, 75], duration: 6000 },
          { axis: [555, 60], duration: 6000 },
          { axis: [405, 50], duration: 6000 },
        ]},
        { ledRing: [10, 20], gobo: true, beam: 60, laser: 20, starfield: true, moves: [
          { axis: [240, 60], duration: 6000 },
          { axis: [390, 75], duration: 6000 },
          { axis: [540, 60], duration: 6000 },
          { axis: [390, 50], duration: 6000 },
        ]},
      ],
    },
  },

  // Deep blue-indigo slow drift. Melancholic, introspective. Sparse starfield suits the mood.
  sad: {
    luminous: { head: 120, mini: 160, par: 110 },
    strobing: { threshold: 0.95, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.0 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [0, 30, 120], duration: 4000 },
            { rgbw: [20, 0, 80], duration: 4000 },
            { rgbw: [0, 50, 100], duration: 4000 },
          ]
        },
        {
          colors: [
            { rgbw: [10, 10, 100], duration: 5000 },
            { rgbw: [40, 20, 120], duration: 5000 },
            { rgbw: [0, 30, 80], duration: 5000 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [210, 90], duration: 5000, easing: easeInOutSine },
            { axis: [255, 100], duration: 5000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [60, 70], gobo: 0,
        },
        {
          moves: [
            { axis: [200, 85], duration: 6000, easing: easeInOutSine },
            { axis: [270, 95], duration: 6000, easing: easeInOutSine },
            { axis: [230, 105], duration: 6000, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [50, 65], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [40, 50], gobo: true, beam: 70, laser: 18, starfield: true, moves: [
          { axis: [255, 60], duration: 5000 },
          { axis: [405, 75], duration: 5000 },
          { axis: [555, 60], duration: 5000 },
          { axis: [405, 50], duration: 5000 },
        ]},
        { ledRing: [30, 40], gobo: true, beam: 60, laser: 15, starfield: true, moves: [
          { axis: [240, 60], duration: 5000 },
          { axis: [390, 75], duration: 5000 },
          { axis: [540, 60], duration: 5000 },
          { axis: [390, 50], duration: 5000 },
        ]},
      ],
    },
  },

  // Bright yellow-orange-white bursts, upbeat moderate pace. Cheerful, sunny.
  happy: {
    luminous: { head: 220, mini: 250, par: 190 },
    strobing: { threshold: 0.3, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 220, 0], duration: 500 },
            { rgbw: [255, 255, 255, 80], duration: 500 },
            { rgbw: [255, 150, 0], duration: 500 },
            { rgbw: [255, 240, 100], duration: 500 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 200, 50], duration: 600 },
            { rgbw: [200, 255, 100], duration: 600 },
            { rgbw: [255, 240, 0], duration: 600 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 180, 80], duration: 500 },
            { rgbw: [255, 255, 150, 60], duration: 500 },
            { rgbw: [200, 230, 0], duration: 500 },
            { rgbw: [255, 200, 0], duration: 500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [170, 72], duration: 900, easing: easeInOutSine },
            { axis: [340, 88], duration: 900, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [200, 210], gobo: 64,
        },
        {
          moves: [
            { axis: [255, 65], duration: 900, easing: easeInOutSine },
            { axis: [130, 85], duration: 900, easing: easeInOutSine },
            { axis: [370, 75], duration: 900, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [210, 220], gobo: 80,
        },
        {
          moves: [
            { axis: [200, 78], duration: 1000, easing: easeInOutSine },
            { axis: [310, 68], duration: 1000, easing: easeInOutSine },
            { axis: [250, 90], duration: 1000, easing: easeInOutSine },
          ],
          colors: [64, 96], ledRing: [190, 205], gobo: 48,
        },
      ],
      mini: [
        { ledRing: [50, 60], gobo: true, beam: 180, laser: 65, moves: [
          { axis: [255, 35], duration: 900 },
          { axis: [405, 60], duration: 900 },
          { axis: [555, 35], duration: 900 },
          { axis: [405, 15], duration: 900 },
        ]},
        { ledRing: [40, 50], gobo: true, beam: 170, laser: 60, moves: [
          { axis: [210, 35], duration: 900 },
          { axis: [360, 60], duration: 900 },
          { axis: [510, 35], duration: 900 },
          { axis: [360, 15], duration: 900 },
        ]},
        { ledRing: [60, 70], gobo: true, beam: 160, laser: 55, moves: [
          { axis: [300, 35], duration: 900 },
          { axis: [450, 60], duration: 900 },
          { axis: [600, 35], duration: 900 },
          { axis: [450, 15], duration: 900 },
        ]},
      ],
    },
  },

  // High energy, saturated multi-color rapid cycling. Maximum dance floor excitement.
  party: {
    luminous: { head: 255, mini: 255, par: 200 },
    strobing: { threshold: 0.14, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.8 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 0, 255], duration: 200 },
            { rgbw: [0, 255, 255], duration: 200 },
            { rgbw: [255, 255, 0], duration: 200 },
            { rgbw: [255, 0, 100], duration: 200 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 100, 0], duration: 200 },
            { rgbw: [0, 0, 255], duration: 200 },
            { rgbw: [0, 255, 100], duration: 200 },
            { rgbw: [255, 255, 255], duration: 100 },
          ]
        },
        {
          colors: [
            { rgbw: [200, 0, 255], duration: 250 },
            { rgbw: [255, 200, 0], duration: 250 },
            { rgbw: [0, 255, 200], duration: 250 },
            { rgbw: [255, 0, 150], duration: 250 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [105, 56], duration: 380, easing: easeInExpo },
            { axis: [400, 68], duration: 380, easing: easeInExpo },
          ],
          colors: [112, 48], ledRing: [240, 255], gobo: 170,
        },
        {
          moves: [
            { axis: [65, 56], duration: 380, easing: easeInExpo },
            { axis: [275, 84], duration: 380, easing: easeInExpo },
            { axis: [445, 62], duration: 380, easing: easeInExpo },
          ],
          colors: [48, 0], ledRing: [230, 245], gobo: 190,
        },
        {
          moves: [
            { axis: [40, 66], duration: 340, easing: easeInExpo },
            { axis: [465, 56], duration: 340, easing: easeInExpo },
            { axis: [235, 96], duration: 340, easing: easeInExpo },
          ],
          colors: [96, 48], ledRing: [250, 240], gobo: 150,
        },
      ],
      mini: [
        { ledRing: [220, 240], gobo: true, beam: 220, laser: 80, moves: [
          { axis: [300, 35], duration: 520 },
          { axis: [450, 60], duration: 520 },
          { axis: [600, 35], duration: 520 },
          { axis: [450, 15], duration: 520 },
        ]},
        { ledRing: [230, 210], gobo: true, beam: 230, laser: 80, moves: [
          { axis: [260, 35], duration: 500 },
          { axis: [410, 60], duration: 500 },
          { axis: [560, 35], duration: 500 },
          { axis: [410, 15], duration: 500 },
        ]},
        { ledRing: [190, 200], gobo: false, beam: 210, laser: 75, moves: [
          { axis: [330, 35], duration: 560 },
          { axis: [480, 60], duration: 560 },
          { axis: [630, 35], duration: 560 },
          { axis: [480, 15], duration: 560 },
        ]},
      ],
    },
  },

  // Warm rose-magenta-amber glow, slow sensual sweeps. Intimate, low-lit feel.
  sexy: {
    luminous: { head: 180, mini: 220, par: 150 },
    strobing: { threshold: 0.4, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.3 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [200, 20, 60], duration: 2000 },
            { rgbw: [255, 60, 100], duration: 2000 },
            { rgbw: [160, 10, 50], duration: 2000 },
          ]
        },
        {
          colors: [
            { rgbw: [220, 40, 120], duration: 2000 },
            { rgbw: [180, 80, 80], duration: 2000 },
            { rgbw: [255, 20, 80], duration: 2000 },
          ]
        },
        {
          colors: [
            { rgbw: [200, 60, 150], duration: 2500 },
            { rgbw: [255, 100, 60], duration: 2500 },
            { rgbw: [180, 30, 100], duration: 2500 },
            { rgbw: [220, 80, 120], duration: 2500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [180, 72], duration: 2500, easing: easeInOutSine },
            { axis: [330, 82], duration: 2500, easing: easeInOutSine },
          ],
          colors: [80, 96], ledRing: [130, 120], gobo: 32,
        },
        {
          moves: [
            { axis: [130, 68], duration: 2500, easing: easeInOutSine },
            { axis: [355, 86], duration: 2500, easing: easeInOutSine },
            { axis: [225, 108], duration: 2500, easing: easeInOutSine },
          ],
          colors: [96, 80], ledRing: [120, 140], gobo: 48,
        },
        {
          moves: [
            { axis: [90, 62], duration: 2500, easing: easeInOutSine },
            { axis: [400, 80], duration: 2500, easing: easeInOutSine },
            { axis: [248, 68], duration: 2500, easing: easeInOutSine },
            { axis: [110, 64], duration: 2500, easing: easeInOutSine },
          ],
          colors: [80, 16], ledRing: [150, 130], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [70, 60], gobo: true, beam: 155, laser: 50, starfield: true, moves: [
          { axis: [255, 60], duration: 2500 },
          { axis: [405, 75], duration: 2500 },
          { axis: [555, 60], duration: 2500 },
          { axis: [405, 50], duration: 2500 },
        ]},
        { ledRing: [80, 90], gobo: true, beam: 145, laser: 45, starfield: true, moves: [
          { axis: [210, 60], duration: 2500 },
          { axis: [360, 75], duration: 2500 },
          { axis: [510, 60], duration: 2500 },
          { axis: [360, 50], duration: 2500 },
        ]},
        { ledRing: [100, 90], gobo: true, beam: 130, laser: 42, starfield: true, moves: [
          { axis: [300, 60], duration: 2500 },
          { axis: [450, 75], duration: 2500 },
          { axis: [600, 60], duration: 2500 },
          { axis: [450, 50], duration: 2500 },
        ]},
      ],
    },
  },

  // Bright warm retro, medium-fast motor. Gold/orange/pink/white PAR at 300-400ms. Fun energetic
  // cycling, not aggressive. Light gobo, prism on. Dance-floor nostalgia.
  disco: {
    luminous: { head: 230, mini: 245, par: 195 },
    strobing: { threshold: 0.22, paceWeight: 0.32, energyWeight: 0.68, danceExp: 0.9 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 200, 0], duration: 350 },
            { rgbw: [255, 120, 0], duration: 350 },
            { rgbw: [255, 60, 160], duration: 350 },
            { rgbw: [255, 255, 255, 60], duration: 350 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 0, 180], duration: 300 },
            { rgbw: [255, 160, 20], duration: 300 },
            { rgbw: [255, 240, 0], duration: 300 },
            { rgbw: [255, 180, 120], duration: 300 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 240, 200, 80], duration: 400 },
            { rgbw: [255, 80, 100], duration: 300 },
            { rgbw: [255, 140, 0], duration: 350 },
            { rgbw: [255, 210, 0], duration: 350 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [155, 70], duration: 650, easing: easeInOutSine },
            { axis: [355, 85], duration: 650, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [190, 210], gobo: 80,
        },
        {
          moves: [
            { axis: [110, 68], duration: 600, easing: easeInOutSine },
            { axis: [255, 84], duration: 600, easing: easeInOutSine },
            { axis: [390, 72], duration: 600, easing: easeInOutSine },
            { axis: [130, 66], duration: 600, easing: easeInOutSine },
          ],
          colors: [80, 96], ledRing: [200, 220], gobo: 96,
        },
        {
          moves: [
            { axis: [245, 76], duration: 650, easing: easeInSine },
            { axis: [120, 64], duration: 650, easing: easeInSine },
            { axis: [380, 90], duration: 650, easing: easeInSine },
          ],
          colors: [96, 64], ledRing: [210, 195], gobo: 112,
        },
      ],
      mini: [
        { ledRing: [190, 205], gobo: true, beam: 200, laser: 62, moves: [
          { axis: [270, 35], duration: 650 },
          { axis: [420, 60], duration: 650 },
          { axis: [570, 35], duration: 650 },
          { axis: [420, 15], duration: 650 },
        ]},
        { ledRing: [205, 220], gobo: true, beam: 215, laser: 68, moves: [
          { axis: [225, 35], duration: 650 },
          { axis: [375, 60], duration: 650 },
          { axis: [525, 35], duration: 650 },
          { axis: [375, 15], duration: 650 },
        ]},
        { ledRing: [175, 190], gobo: false, beam: 195, laser: 60, moves: [
          { axis: [315, 35], duration: 650 },
          { axis: [465, 60], duration: 650 },
          { axis: [615, 35], duration: 650 },
          { axis: [465, 15], duration: 650 },
        ]},
      ],
    },
  },

  // Dark, slow, atmospheric. Deep purples/blues/dark reds. Very slow easeInOutSine drifts.
  // Faint starfield, gobo on. Cinematic, smoky, introspective.
  triphop: {
    luminous: { head: 160, mini: 180, par: 120 },
    strobing: { threshold: 0.6, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.8 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [80, 0, 140], duration: 3000 },
            { rgbw: [0, 30, 100], duration: 3000 },
            { rgbw: [100, 0, 40], duration: 3000 },
          ]
        },
        {
          colors: [
            { rgbw: [50, 0, 120], duration: 3500 },
            { rgbw: [120, 0, 50], duration: 3500 },
            { rgbw: [20, 20, 80], duration: 3500 },
          ]
        },
        {
          colors: [
            { rgbw: [100, 0, 160], duration: 3500 },
            { rgbw: [0, 60, 80], duration: 3500 },
            { rgbw: [140, 0, 80], duration: 3500 },
            { rgbw: [30, 0, 100], duration: 3500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [215, 82], duration: 3000, easing: easeInOutSine },
            { axis: [295, 70], duration: 3000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [70, 80], gobo: 32,
        },
        {
          moves: [
            { axis: [145, 90], duration: 2500, easing: easeInOutSine },
            { axis: [340, 68], duration: 2500, easing: easeInOutSine },
            { axis: [225, 80], duration: 2500, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [60, 72], gobo: 16,
        },
        {
          moves: [
            { axis: [195, 85], duration: 3500, easing: easeInOutSine },
            { axis: [285, 70], duration: 3500, easing: easeInOutSine },
            { axis: [155, 78], duration: 3500, easing: easeInOutSine },
            { axis: [220, 84], duration: 3500, easing: easeInOutSine },
          ],
          colors: [96, 32], ledRing: [75, 65], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [60, 70], gobo: true, beam: 100, laser: 28, starfield: true, moves: [
          { axis: [255, 60], duration: 3000 },
          { axis: [405, 75], duration: 3000 },
          { axis: [555, 60], duration: 3000 },
          { axis: [405, 50], duration: 3000 },
        ]},
        { ledRing: [50, 60], gobo: true, beam: 90, laser: 22, starfield: true, moves: [
          { axis: [210, 60], duration: 3000 },
          { axis: [360, 75], duration: 3000 },
          { axis: [510, 60], duration: 3000 },
          { axis: [360, 50], duration: 3000 },
        ]},
        { ledRing: [70, 80], gobo: true, beam: 105, laser: 32, starfield: true, moves: [
          { axis: [300, 60], duration: 3000 },
          { axis: [450, 75], duration: 3000 },
          { axis: [600, 60], duration: 3000 },
          { axis: [450, 50], duration: 3000 },
        ]},
      ],
    },
  },

  // Extremely gentle, ethereal. Soft whites, pale blues, pale greens. Very slow 4-8s drifts.
  // Zero strobing. Faint starfield adds cosmic depth without breaking stillness.
  newage: {
    luminous: { head: 140, mini: 160, par: 100 },
    strobing: { threshold: 0.99, paceWeight: 0.1, energyWeight: 0.9, danceExp: 3.0 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [120, 200, 255, 40], duration: 6000 },
            { rgbw: [240, 250, 255, 80], duration: 6000 },
            { rgbw: [100, 220, 180, 30], duration: 6000 },
          ]
        },
        {
          colors: [
            { rgbw: [200, 240, 255, 60], duration: 7000 },
            { rgbw: [120, 240, 200, 20], duration: 7000 },
            { rgbw: [200, 200, 255, 50], duration: 7000 },
          ]
        },
        {
          colors: [
            { rgbw: [230, 245, 255, 70], duration: 8000 },
            { rgbw: [140, 210, 255, 30], duration: 8000 },
            { rgbw: [160, 240, 200, 20], duration: 8000 },
            { rgbw: [220, 235, 255, 60], duration: 8000 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [240, 76], duration: 5000, easing: easeInOutSine },
            { axis: [270, 82], duration: 5000, easing: easeInOutSine },
          ],
          colors: [0, 48], ledRing: [82, 90], gobo: 0,
        },
        {
          moves: [
            { axis: [200, 80], duration: 6000, easing: easeInOutSine },
            { axis: [310, 70], duration: 6000, easing: easeInOutSine },
            { axis: [235, 82], duration: 6000, easing: easeInOutSine },
          ],
          colors: [48, 0], ledRing: [78, 88], gobo: 0,
        },
        {
          moves: [
            { axis: [215, 80], duration: 7000, easing: easeInOutSine },
            { axis: [265, 72], duration: 7000, easing: easeInOutSine },
            { axis: [230, 85], duration: 7000, easing: easeInOutSine },
            { axis: [280, 76], duration: 7000, easing: easeInOutSine },
          ],
          colors: [0, 112], ledRing: [86, 94], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [30, 40], gobo: true, beam: 60, laser: 18, starfield: true, moves: [
          { axis: [320, 60], duration: 6000 },
          { axis: [470, 75], duration: 6000 },
          { axis: [620, 60], duration: 6000 },
          { axis: [470, 50], duration: 6000 },
        ]},
        { ledRing: [20, 30], gobo: true, beam: 50, laser: 15, starfield: true, moves: [
          { axis: [280, 60], duration: 7000 },
          { axis: [430, 75], duration: 7000 },
          { axis: [580, 60], duration: 7000 },
          { axis: [430, 50], duration: 7000 },
        ]},
        { ledRing: [40, 50], gobo: true, beam: 65, laser: 22, starfield: true, moves: [
          { axis: [350, 60], duration: 6500 },
          { axis: [500, 75], duration: 6500 },
          { axis: [650, 60], duration: 6500 },
          { axis: [500, 50], duration: 6500 },
        ]},
      ],
    },
  },

  // Slow swirling, rich saturated palette. Deep purples, vivid greens, electric blues, magenta.
  // easeInOutSine throughout. Medium-high brightness. Moderate atmosphere-friendly laser.
  psychedelic: {
    luminous: { head: 220, mini: 240, par: 180 },
    strobing: { threshold: 0.45, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.4 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [120, 0, 220], duration: 2000 },
            { rgbw: [0, 200, 80], duration: 2000 },
            { rgbw: [0, 80, 255], duration: 2000 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 0, 200], duration: 1800 },
            { rgbw: [100, 0, 255], duration: 1800 },
            { rgbw: [60, 220, 0], duration: 1800 },
            { rgbw: [180, 0, 255], duration: 1800 },
          ]
        },
        {
          colors: [
            { rgbw: [0, 100, 255], duration: 2500 },
            { rgbw: [255, 0, 160], duration: 2500 },
            { rgbw: [80, 255, 0], duration: 2500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [160, 72], duration: 2000, easing: easeInOutSine },
            { axis: [360, 88], duration: 2000, easing: easeInOutSine },
          ],
          colors: [96, 48], ledRing: [170, 190], gobo: 128,
        },
        {
          moves: [
            { axis: [100, 60], duration: 2500, easing: easeInOutSine },
            { axis: [420, 84], duration: 2500, easing: easeInOutSine },
            { axis: [240, 108], duration: 2500, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [190, 210], gobo: 160,
        },
        {
          moves: [
            { axis: [255, 80], duration: 3000, easing: easeInOutSine },
            { axis: [130, 96], duration: 3000, easing: easeInOutSine },
            { axis: [400, 68], duration: 3000, easing: easeInOutSine },
            { axis: [270, 82], duration: 3000, easing: easeInOutSine },
          ],
          colors: [112, 96], ledRing: [160, 180], gobo: 140,
        },
      ],
      mini: [
        { ledRing: [160, 180], gobo: true, beam: 180, laser: 55, starfield: true, moves: [
          { axis: [310, 60], duration: 2000 },
          { axis: [460, 75], duration: 2000 },
          { axis: [610, 60], duration: 2000 },
          { axis: [460, 50], duration: 2000 },
        ]},
        { ledRing: [180, 200], gobo: true, beam: 195, laser: 62, starfield: true, moves: [
          { axis: [270, 60], duration: 2500 },
          { axis: [420, 75], duration: 2500 },
          { axis: [570, 60], duration: 2500 },
          { axis: [420, 50], duration: 2500 },
        ]},
        { ledRing: [140, 160], gobo: true, beam: 170, laser: 50, starfield: true, moves: [
          { axis: [340, 60], duration: 2200 },
          { axis: [490, 75], duration: 2200 },
          { axis: [640, 60], duration: 2200 },
          { axis: [490, 50], duration: 2200 },
        ]},
      ],
    },
  },

  // Explosive, very high brightness. Very fast easeInExpo snaps. White/yellow/cyan PAR bursts.
  // High strobe rate. No starfield — too fast for atmosphere.
  energetic: {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.7 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [255, 255, 255, 100], duration: 200 },
            { rgbw: [0, 255, 255], duration: 300 },
            { rgbw: [255, 240, 0], duration: 300 },
            { rgbw: [255, 255, 255, 80], duration: 150 },
          ]
        },
        {
          colors: [
            { rgbw: [255, 255, 0], duration: 250 },
            { rgbw: [255, 255, 255, 120], duration: 150 },
            { rgbw: [0, 180, 255], duration: 300 },
            { rgbw: [255, 255, 255, 100], duration: 100 },
          ]
        },
        {
          colors: [
            { rgbw: [0, 255, 220], duration: 300 },
            { rgbw: [255, 220, 0], duration: 300 },
            { rgbw: [255, 255, 255, 80], duration: 150 },
            { rgbw: [180, 255, 0], duration: 250 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [80, 56], duration: 350, easing: easeInExpo },
            { axis: [455, 68], duration: 350, easing: easeInExpo },
          ],
          colors: [0, 48], ledRing: [240, 255], gobo: 32,
        },
        {
          moves: [
            { axis: [60, 56], duration: 380, easing: easeInExpo },
            { axis: [445, 72], duration: 380, easing: easeInExpo },
            { axis: [245, 60], duration: 380, easing: easeInExpo },
          ],
          colors: [48, 0], ledRing: [230, 250], gobo: 16,
        },
        {
          moves: [
            { axis: [40, 60], duration: 300, easing: easeInExpo },
            { axis: [470, 56], duration: 300, easing: easeInExpo },
            { axis: [280, 68], duration: 300, easing: easeInExpo },
            { axis: [65, 58], duration: 300, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [250, 240], gobo: 48,
        },
      ],
      mini: [
        { ledRing: [220, 240], gobo: false, beam: 230, laser: 72, moves: [
          { axis: [270, 35], duration: 300 },
          { axis: [420, 60], duration: 300 },
          { axis: [570, 35], duration: 300 },
          { axis: [420, 15], duration: 300 },
        ]},
        { ledRing: [230, 215], gobo: false, beam: 240, laser: 78, moves: [
          { axis: [225, 35], duration: 300 },
          { axis: [375, 60], duration: 300 },
          { axis: [525, 35], duration: 300 },
          { axis: [375, 15], duration: 300 },
        ]},
        { ledRing: [200, 220], gobo: true, beam: 220, laser: 75, moves: [
          { axis: [315, 35], duration: 300 },
          { axis: [465, 60], duration: 300 },
          { axis: [615, 35], duration: 300 },
          { axis: [465, 15], duration: 300 },
        ]},
      ],
    },
  },

  // Medium neutral, moderate motor. Versatile fallback — colour variety, active sweeps, light gobo/prism.
  default: {
    luminous: { head: 190, mini: 230, par: 165 },
    strobing: { threshold: 0.2, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        // Periwinkle→dusty rose→gold PAR.
        {
          colors: [
            { rgbw: [100, 100, 200], duration: 900 },
            { rgbw: [200, 80, 120], duration: 900 },
            { rgbw: [220, 180, 0], duration: 900 },
          ]
        },
        // Purple→teal→coral PAR.
        {
          colors: [
            { rgbw: [160, 0, 220], duration: 900 },
            { rgbw: [0, 180, 140], duration: 900 },
            { rgbw: [255, 80, 60], duration: 900 },
          ]
        },
        // Sky→mint→rose PAR.
        {
          colors: [
            { rgbw: [0, 160, 255], duration: 1000 },
            { rgbw: [80, 220, 120], duration: 1000 },
            { rgbw: [255, 100, 180], duration: 1000 },
          ]
        },
      ],
      head: [
        {
          // Left (150°) → right (360°) → center (240°), tilt 68→96→74. Wide three-point sweep, rises high-right, settles mid-center.
          moves: [
            { axis: [150, 68], duration: 1800, easing: easeInOutSine },
            { axis: [360, 96], duration: 1800, easing: easeInOutSine },
            { axis: [240, 74], duration: 1800, easing: easeInOutSine },
          ],
          colors: [48, 96], ledRing: [160, 172], gobo: 32,
        },
        {
          // Far-left (100°) → far-right (420°) → center (255°) → return (130°), tilt 62→84→110→68. Full stage sweep, climbs to ceiling-high center, returns left.
          moves: [
            { axis: [100, 62], duration: 1600, easing: easeInOutSine },
            { axis: [420, 84], duration: 1600, easing: easeInOutSine },
            { axis: [255, 110], duration: 1600, easing: easeInOutSine },
            { axis: [130, 68], duration: 1600, easing: easeInOutSine },
          ],
          colors: [96, 48], ledRing: [196, 214], gobo: 48,
        },
        {
          // Center-right (270°) → left (140°) → far-right (390°) → center (220°), tilt 80→66→92→72. Four-point figure-of-eight arc.
          moves: [
            { axis: [270, 80], duration: 1500, easing: easeInOutSine },
            { axis: [140, 66], duration: 1500, easing: easeInOutSine },
            { axis: [390, 92], duration: 1500, easing: easeInOutSine },
            { axis: [220, 72], duration: 1500, easing: easeInOutSine },
          ],
          colors: [64, 112], ledRing: [148, 160], gobo: 16,
        },
      ],
      mini: [
        { ledRing: [210, 200], gobo: true, beam: 150, laser: 60, moves: [
          { axis: [255, 35], duration: 1500 },
          { axis: [405, 60], duration: 1500 },
          { axis: [555, 35], duration: 1500 },
          { axis: [405, 15], duration: 1500 },
        ]},
        { ledRing: [40, 50], gobo: true, beam: 170, laser: 65, moves: [
          { axis: [210, 35], duration: 1500 },
          { axis: [360, 60], duration: 1500 },
          { axis: [510, 35], duration: 1500 },
          { axis: [360, 15], duration: 1500 },
        ]},
        { ledRing: [220, 230], gobo: true, beam: 160, laser: 55, moves: [
          { axis: [300, 35], duration: 1500 },
          { axis: [450, 60], duration: 1500 },
          { axis: [600, 35], duration: 1500 },
          { axis: [450, 15], duration: 1500 },
        ]},
      ],
    },
  },

  // ── genre+mood entries ────────────────────────────────────────────────────
  // These are reachable when #resolveProfile finds no alias and the key exists here.
  // Bare-genre and named-mood profiles remain as fallbacks.

  // rock: dark edge — deep crimson/purple, mid-pace, prism off
  'rock+dark': {
    luminous: { head: 200, mini: 230, par: 160 },
    strobing: { threshold: 0.35, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 0, 60], duration: 600 }, { rgbw: [60, 0, 30], duration: 400 }, { rgbw: [100, 0, 80], duration: 600 }] },
        { colors: [{ rgbw: [80, 0, 100], duration: 600 }, { rgbw: [150, 0, 50], duration: 500 }, { rgbw: [40, 0, 60], duration: 400 }] },
      ],
      head: [
        { moves: [{ axis: [85, 60], duration: 500, easing: easeInExpo }, { axis: [425, 72], duration: 500, easing: easeInExpo }], colors: [16, 0], ledRing: [120, 100], gobo: 32 },
        { moves: [{ axis: [120, 58], duration: 500, easing: easeInExpo }, { axis: [255, 78], duration: 500, easing: easeInExpo }, { axis: [400, 62], duration: 500, easing: easeInExpo }], colors: [0, 16], ledRing: [100, 120], gobo: 16 },
      ],
      mini: [
        { ledRing: [100, 120], gobo: true, beam: 170, laser: 45, starfield: true, moves: [{ axis: [270, 35], duration: 500 }, { axis: [420, 60], duration: 500 }, { axis: [570, 35], duration: 500 }, { axis: [420, 15], duration: 500 }] },
        { ledRing: [120, 100], gobo: false, beam: 150, laser: 40, starfield: true, moves: [{ axis: [225, 35], duration: 500 }, { axis: [375, 60], duration: 500 }, { axis: [525, 35], duration: 500 }, { axis: [375, 15], duration: 500 }] },
      ],
    },
  },

  // electronic: groovy edge — warm orange/gold pulses at 400ms, mid-pace sine sweeps
  'electronic+groovy': {
    luminous: { head: 220, mini: 245, par: 185 },
    strobing: { threshold: 0.25, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 140, 0], duration: 400 }, { rgbw: [200, 60, 150], duration: 400 }, { rgbw: [255, 200, 0], duration: 400 }] },
        { colors: [{ rgbw: [200, 80, 200], duration: 400 }, { rgbw: [255, 160, 0], duration: 400 }, { rgbw: [100, 0, 200], duration: 400 }] },
      ],
      head: [
        { moves: [{ axis: [150, 65], duration: 1000, easing: easeInOutSine }, { axis: [340, 82], duration: 1000, easing: easeInOutSine }], colors: [80, 96], ledRing: [180, 200], gobo: 64 },
        { moves: [{ axis: [90, 62], duration: 1100, easing: easeInOutSine }, { axis: [400, 80], duration: 1100, easing: easeInOutSine }, { axis: [215, 106], duration: 1100, easing: easeInOutSine }], colors: [96, 80], ledRing: [160, 180], gobo: 80 },
      ],
      mini: [
        { ledRing: [140, 160], gobo: true, beam: 185, laser: 58, moves: [{ axis: [255, 35], duration: 1000 }, { axis: [405, 60], duration: 1000 }, { axis: [555, 35], duration: 1000 }, { axis: [405, 15], duration: 1000 }] },
        { ledRing: [160, 140], gobo: true, beam: 175, laser: 52, moves: [{ axis: [210, 35], duration: 1000 }, { axis: [360, 60], duration: 1000 }, { axis: [510, 35], duration: 1000 }, { axis: [360, 15], duration: 1000 }] },
      ],
    },
  },

  // jazz+dark — deep amber-brown with undertones of blue, dim and smoky
  'jazz+dark': {
    luminous: { head: 130, mini: 175, par: 120 },
    strobing: { threshold: 0.65, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.6 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 40, 0], duration: 2500 }, { rgbw: [0, 20, 80], duration: 2500 }, { rgbw: [80, 30, 0], duration: 2500 }] },
        { colors: [{ rgbw: [60, 20, 60], duration: 3000 }, { rgbw: [120, 50, 0], duration: 3000 }, { rgbw: [20, 10, 80], duration: 3000 }] },
      ],
      head: [
        { moves: [{ axis: [205, 80], duration: 4000, easing: easeInOutSine }, { axis: [295, 68], duration: 4000, easing: easeInOutSine }], colors: [112, 80], ledRing: [60, 72], gobo: 16 },
        { moves: [{ axis: [175, 88], duration: 4500, easing: easeInOutSine }, { axis: [320, 72], duration: 4500, easing: easeInOutSine }, { axis: [250, 84], duration: 4500, easing: easeInOutSine }], colors: [80, 112], ledRing: [50, 62], gobo: 0 },
      ],
      mini: [
        { ledRing: [60, 72], gobo: true, beam: 110, laser: 38, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [50, 62], gobo: true, beam: 100, laser: 32, starfield: true, moves: [{ axis: [210, 60], duration: 4000 }, { axis: [360, 75], duration: 4000 }, { axis: [510, 60], duration: 4000 }, { axis: [360, 50], duration: 4000 }] },
      ],
    },
  },

  // hip-hop+emotional — moody purple-blue, slow drifts, trip-hop adjacent but keeps hip-hop edge
  'hiphop+emotional': {
    luminous: { head: 170, mini: 200, par: 140 },
    strobing: { threshold: 0.55, paceWeight: 0.22, energyWeight: 0.78, danceExp: 1.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 0, 160], duration: 2000 }, { rgbw: [0, 40, 120], duration: 2000 }, { rgbw: [100, 0, 80], duration: 2000 }] },
        { colors: [{ rgbw: [60, 0, 120], duration: 2500 }, { rgbw: [120, 20, 80], duration: 2500 }, { rgbw: [20, 0, 100], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [175, 80], duration: 2500, easing: easeInOutSine }, { axis: [335, 68], duration: 2500, easing: easeInOutSine }], colors: [112, 48], ledRing: [80, 92], gobo: 32 },
        { moves: [{ axis: [130, 85], duration: 3000, easing: easeInOutSine }, { axis: [360, 70], duration: 3000, easing: easeInOutSine }, { axis: [240, 82], duration: 3000, easing: easeInOutSine }], colors: [48, 112], ledRing: [70, 82], gobo: 16 },
      ],
      mini: [
        { ledRing: [80, 92], gobo: true, beam: 130, laser: 38, starfield: true, moves: [{ axis: [255, 60], duration: 2500 }, { axis: [405, 75], duration: 2500 }, { axis: [555, 60], duration: 2500 }, { axis: [405, 50], duration: 2500 }] },
        { ledRing: [70, 82], gobo: true, beam: 120, laser: 32, starfield: true, moves: [{ axis: [210, 60], duration: 2500 }, { axis: [360, 75], duration: 2500 }, { axis: [510, 60], duration: 2500 }, { axis: [360, 50], duration: 2500 }] },
      ],
    },
  },

  // pop+dark — moody pastel twilight; keeps pop brightness but mutes it with cool purples
  'pop+dark': {
    luminous: { head: 175, mini: 210, par: 150 },
    strobing: { threshold: 0.45, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 60, 200], duration: 1200 }, { rgbw: [80, 0, 160], duration: 1200 }, { rgbw: [160, 80, 220], duration: 1200 }] },
        { colors: [{ rgbw: [100, 80, 200], duration: 1200 }, { rgbw: [200, 80, 160], duration: 1200 }, { rgbw: [60, 40, 180], duration: 1200 }] },
      ],
      head: [
        { moves: [{ axis: [175, 78], duration: 2000, easing: easeInOutSine }, { axis: [330, 90], duration: 2000, easing: easeInOutSine }], colors: [96, 48], ledRing: [100, 115], gobo: 64 },
        { moves: [{ axis: [130, 84], duration: 2200, easing: easeInOutSine }, { axis: [370, 70], duration: 2200, easing: easeInOutSine }, { axis: [250, 88], duration: 2200, easing: easeInOutSine }], colors: [48, 96], ledRing: [110, 125], gobo: 80 },
      ],
      mini: [
        { ledRing: [80, 96], gobo: true, beam: 150, laser: 48, starfield: true, moves: [{ axis: [255, 35], duration: 1800 }, { axis: [405, 60], duration: 1800 }, { axis: [555, 35], duration: 1800 }, { axis: [405, 15], duration: 1800 }] },
        { ledRing: [90, 106], gobo: true, beam: 140, laser: 44, starfield: true, moves: [{ axis: [210, 35], duration: 1800 }, { axis: [360, 60], duration: 1800 }, { axis: [510, 35], duration: 1800 }, { axis: [360, 15], duration: 1800 }] },
      ],
    },
  },

  // ambient+dramatic — slow swell from dark to electric blue/teal, epic atmosphere
  'ambient+dramatic': {
    luminous: { head: 130, mini: 160, par: 100 },
    strobing: { threshold: 0.7, paceWeight: 0.15, energyWeight: 0.85, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 60, 160], duration: 5000 }, { rgbw: [0, 120, 80], duration: 5000 }, { rgbw: [40, 0, 120], duration: 5000 }] },
        { colors: [{ rgbw: [0, 80, 200], duration: 6000 }, { rgbw: [60, 0, 160], duration: 6000 }, { rgbw: [0, 140, 120], duration: 6000 }] },
      ],
      head: [
        { moves: [{ axis: [180, 76], duration: 8000, easing: easeInOutSine }, { axis: [330, 60], duration: 8000, easing: easeInOutSine }], colors: [112, 48], ledRing: [80, 96], gobo: 0 },
        { moves: [{ axis: [160, 80], duration: 10000, easing: easeInOutSine }, { axis: [255, 64], duration: 10000, easing: easeInOutSine }, { axis: [340, 78], duration: 10000, easing: easeInOutSine }], colors: [48, 112], ledRing: [70, 88], gobo: 0 },
      ],
      mini: [
        { ledRing: [20, 35], gobo: true, beam: 70, laser: 25, starfield: true, moves: [{ axis: [310, 60], duration: 8000 }, { axis: [460, 75], duration: 8000 }, { axis: [610, 60], duration: 8000 }, { axis: [460, 50], duration: 8000 }] },
        { ledRing: [15, 30], gobo: true, beam: 60, laser: 20, starfield: true, moves: [{ axis: [270, 60], duration: 10000 }, { axis: [420, 75], duration: 10000 }, { axis: [570, 60], duration: 10000 }, { axis: [420, 50], duration: 10000 }] },
      ],
    },
  },

  // classical+film — cinematic warm-gold-to-cool-blue slow washes, concert-hall drama
  'classical+film': {
    luminous: { head: 190, mini: 225, par: 160 },
    strobing: { threshold: 0.9, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 220, 160, 60], duration: 6000 }, { rgbw: [160, 200, 255, 30], duration: 6000 }, { rgbw: [240, 180, 120, 80], duration: 6000 }] },
        { colors: [{ rgbw: [200, 180, 255, 40], duration: 7000 }, { rgbw: [255, 230, 180, 70], duration: 7000 }, { rgbw: [120, 180, 240, 20], duration: 7000 }] },
      ],
      head: [
        { moves: [{ axis: [230, 74], duration: 7000, easing: easeInOutSine }, { axis: [280, 82], duration: 7000, easing: easeInOutSine }], colors: [0, 48], ledRing: [92, 102], gobo: 0 },
        { moves: [{ axis: [210, 78], duration: 8000, easing: easeInOutSine }, { axis: [300, 66], duration: 8000, easing: easeInOutSine }, { axis: [255, 84], duration: 8000, easing: easeInOutSine }], colors: [48, 0], ledRing: [88, 98], gobo: 0 },
      ],
      mini: [
        { ledRing: [55, 68], gobo: true, beam: 115, laser: 30, starfield: true, moves: [{ axis: [255, 60], duration: 7000 }, { axis: [405, 75], duration: 7000 }, { axis: [555, 60], duration: 7000 }, { axis: [405, 50], duration: 7000 }] },
        { ledRing: [42, 55], gobo: true, beam: 100, laser: 24, starfield: true, moves: [{ axis: [240, 60], duration: 8000 }, { axis: [390, 75], duration: 8000 }, { axis: [540, 60], duration: 8000 }, { axis: [390, 50], duration: 8000 }] },
      ],
    },
  },

  // funk+dark — deep warm twilight, slower groove, gold-to-dark-purple
  'funk+dark': {
    luminous: { head: 175, mini: 210, par: 145 },
    strobing: { threshold: 0.5, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.3 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 50, 0], duration: 1500 }, { rgbw: [60, 0, 80], duration: 1500 }, { rgbw: [100, 40, 40], duration: 1500 }] },
        { colors: [{ rgbw: [80, 30, 80], duration: 1800 }, { rgbw: [140, 60, 0], duration: 1800 }, { rgbw: [40, 0, 60], duration: 1800 }] },
      ],
      head: [
        { moves: [{ axis: [155, 68], duration: 2000, easing: easeInOutSine }, { axis: [340, 84], duration: 2000, easing: easeInOutSine }], colors: [80, 96], ledRing: [96, 116], gobo: 48 },
        { moves: [{ axis: [100, 64], duration: 2200, easing: easeInOutSine }, { axis: [400, 82], duration: 2200, easing: easeInOutSine }, { axis: [215, 100], duration: 2200, easing: easeInOutSine }], colors: [96, 80], ledRing: [110, 130], gobo: 32 },
      ],
      mini: [
        { ledRing: [90, 108], gobo: true, beam: 155, laser: 50, starfield: true, moves: [{ axis: [255, 35], duration: 2000 }, { axis: [405, 60], duration: 2000 }, { axis: [555, 35], duration: 2000 }, { axis: [405, 15], duration: 2000 }] },
        { ledRing: [80, 96], gobo: true, beam: 140, laser: 44, starfield: true, moves: [{ axis: [210, 35], duration: 2000 }, { axis: [360, 60], duration: 2000 }, { axis: [510, 35], duration: 2000 }, { axis: [360, 15], duration: 2000 }] },
      ],
    },
  },

  // folk+dark — dimly lit earthy browns with hints of indigo, very slow
  'folk+dark': {
    luminous: { head: 140, mini: 185, par: 120 },
    strobing: { threshold: 0.75, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 60, 20], duration: 3500 }, { rgbw: [40, 20, 80], duration: 3500 }, { rgbw: [80, 40, 20], duration: 3500 }] },
        { colors: [{ rgbw: [60, 30, 60], duration: 4000 }, { rgbw: [100, 50, 10], duration: 4000 }, { rgbw: [30, 10, 60], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [210, 75], duration: 5000, easing: easeInOutSine }, { axis: [310, 64], duration: 5000, easing: easeInOutSine }], colors: [80, 64], ledRing: [58, 70], gobo: 16 },
        { moves: [{ axis: [175, 80], duration: 5500, easing: easeInOutSine }, { axis: [330, 66], duration: 5500, easing: easeInOutSine }, { axis: [255, 82], duration: 5500, easing: easeInOutSine }], colors: [64, 80], ledRing: [50, 62], gobo: 0 },
      ],
      mini: [
        { ledRing: [30, 42], gobo: true, beam: 100, laser: 32, starfield: true, moves: [{ axis: [255, 60], duration: 5000 }, { axis: [405, 75], duration: 5000 }, { axis: [555, 60], duration: 5000 }, { axis: [405, 50], duration: 5000 }] },
        { ledRing: [20, 32], gobo: true, beam: 88, laser: 26, starfield: true, moves: [{ axis: [210, 60], duration: 5000 }, { axis: [360, 75], duration: 5000 }, { axis: [510, 60], duration: 5000 }, { axis: [360, 50], duration: 5000 }] },
      ],
    },
  },

  // r&b+dark — deep plum/wine late-night slow burn
  'rnb+dark': {
    luminous: { head: 160, mini: 200, par: 135 },
    strobing: { threshold: 0.5, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 10, 60], duration: 2000 }, { rgbw: [60, 0, 80], duration: 2000 }, { rgbw: [100, 20, 40], duration: 2000 }] },
        { colors: [{ rgbw: [80, 0, 100], duration: 2500 }, { rgbw: [140, 20, 60], duration: 2500 }, { rgbw: [40, 0, 80], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [180, 72], duration: 3000, easing: easeInOutSine }, { axis: [330, 84], duration: 3000, easing: easeInOutSine }], colors: [80, 96], ledRing: [100, 120], gobo: 32 },
        { moves: [{ axis: [130, 68], duration: 3500, easing: easeInOutSine }, { axis: [360, 82], duration: 3500, easing: easeInOutSine }, { axis: [240, 102], duration: 3500, easing: easeInOutSine }], colors: [96, 80], ledRing: [90, 110], gobo: 16 },
      ],
      mini: [
        { ledRing: [75, 90], gobo: true, beam: 140, laser: 45, starfield: true, moves: [{ axis: [255, 60], duration: 3000 }, { axis: [405, 75], duration: 3000 }, { axis: [555, 60], duration: 3000 }, { axis: [405, 50], duration: 3000 }] },
        { ledRing: [65, 80], gobo: true, beam: 128, laser: 40, starfield: true, moves: [{ axis: [210, 60], duration: 3000 }, { axis: [360, 75], duration: 3000 }, { axis: [510, 60], duration: 3000 }, { axis: [360, 50], duration: 3000 }] },
      ],
    },
  },

  // latin+romantic — warm rose-gold senusal slow sweep, fiesta meets intimate
  'latin+romantic': {
    luminous: { head: 200, mini: 235, par: 170 },
    strobing: { threshold: 0.45, paceWeight: 0.22, energyWeight: 0.78, danceExp: 1.3 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 80, 60], duration: 1500 }, { rgbw: [200, 40, 100], duration: 1500 }, { rgbw: [255, 150, 80], duration: 1500 }] },
        { colors: [{ rgbw: [220, 60, 120], duration: 2000 }, { rgbw: [255, 120, 60], duration: 2000 }, { rgbw: [180, 40, 80], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [175, 72], duration: 2000, easing: easeInOutSine }, { axis: [345, 86], duration: 2000, easing: easeInOutSine }], colors: [80, 64], ledRing: [148, 162], gobo: 64 },
        { moves: [{ axis: [115, 68], duration: 2200, easing: easeInOutSine }, { axis: [420, 84], duration: 2200, easing: easeInOutSine }, { axis: [240, 106], duration: 2200, easing: easeInOutSine }], colors: [64, 80], ledRing: [160, 176], gobo: 48 },
      ],
      mini: [
        { ledRing: [160, 175], gobo: true, beam: 170, laser: 50, starfield: true, moves: [{ axis: [255, 35], duration: 2000 }, { axis: [405, 60], duration: 2000 }, { axis: [555, 35], duration: 2000 }, { axis: [405, 15], duration: 2000 }] },
        { ledRing: [150, 165], gobo: true, beam: 158, laser: 45, starfield: true, moves: [{ axis: [210, 35], duration: 2000 }, { axis: [360, 60], duration: 2000 }, { axis: [510, 35], duration: 2000 }, { axis: [360, 15], duration: 2000 }] },
      ],
    },
  },

  // psychedelic+dark — deep violet-teal hallucinogenic slow drift
  'psychedelic+dark': {
    luminous: { head: 195, mini: 225, par: 160 },
    strobing: { threshold: 0.5, paceWeight: 0.22, energyWeight: 0.78, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [60, 0, 160], duration: 2500 }, { rgbw: [0, 80, 80], duration: 2500 }, { rgbw: [100, 0, 100], duration: 2500 }] },
        { colors: [{ rgbw: [40, 0, 120], duration: 3000 }, { rgbw: [80, 0, 180], duration: 3000 }, { rgbw: [0, 60, 100], duration: 3000 }] },
      ],
      head: [
        { moves: [{ axis: [165, 74], duration: 3000, easing: easeInOutSine }, { axis: [365, 90], duration: 3000, easing: easeInOutSine }], colors: [96, 48], ledRing: [120, 140], gobo: 128 },
        { moves: [{ axis: [110, 64], duration: 3500, easing: easeInOutSine }, { axis: [420, 86], duration: 3500, easing: easeInOutSine }, { axis: [245, 110], duration: 3500, easing: easeInOutSine }], colors: [48, 112], ledRing: [130, 150], gobo: 160 },
      ],
      mini: [
        { ledRing: [120, 142], gobo: true, beam: 160, laser: 48, starfield: true, moves: [{ axis: [310, 60], duration: 3000 }, { axis: [460, 75], duration: 3000 }, { axis: [610, 60], duration: 3000 }, { axis: [460, 50], duration: 3000 }] },
        { ledRing: [108, 128], gobo: true, beam: 148, laser: 44, starfield: true, moves: [{ axis: [270, 60], duration: 3500 }, { axis: [420, 75], duration: 3500 }, { axis: [570, 60], duration: 3500 }, { axis: [420, 50], duration: 3500 }] },
      ],
    },
  },

  // metal+space — rare: industrial metal meets cosmic dark ambient
  'metal+space': {
    luminous: { head: 80, mini: 100, par: 60 },
    strobing: { threshold: 0.88, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 10, 60], duration: 6000 }, { rgbw: [30, 0, 40], duration: 6000 }, { rgbw: [0, 20, 50], duration: 6000 }] },
        { colors: [{ rgbw: [10, 0, 50], duration: 8000 }, { rgbw: [0, 30, 30], duration: 8000 }, { rgbw: [20, 0, 60], duration: 8000 }] },
      ],
      head: [
        { moves: [{ axis: [220, 78], duration: 12000, easing: easeInOutSine }, { axis: [290, 68], duration: 12000, easing: easeInOutSine }], colors: [16, 0], ledRing: [40, 52], gobo: 0 },
        { moves: [{ axis: [195, 82], duration: 15000, easing: easeInOutSine }, { axis: [315, 70], duration: 15000, easing: easeInOutSine }, { axis: [255, 86], duration: 15000, easing: easeInOutSine }], colors: [0, 16], ledRing: [32, 44], gobo: 0 },
      ],
      mini: [
        { ledRing: [0, 12], gobo: true, beam: 40, laser: 15, starfield: true, moves: [{ axis: [310, 60], duration: 10000 }, { axis: [460, 75], duration: 10000 }, { axis: [610, 60], duration: 10000 }, { axis: [460, 50], duration: 10000 }] },
        { ledRing: [0, 10], gobo: true, beam: 32, laser: 12, starfield: true, moves: [{ axis: [270, 60], duration: 12000 }, { axis: [420, 75], duration: 12000 }, { axis: [570, 60], duration: 12000 }, { axis: [420, 50], duration: 12000 }] },
      ],
    },
  },

  // ── +emotional entries ───────────────────────────────────────────────────

  'rock+emotional': {
    luminous: { head: 130, mini: 170, par: 110 },
    strobing: { threshold: 0.82, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 0, 0], duration: 3000 }, { rgbw: [40, 0, 0], duration: 3000 }, { rgbw: [80, 0, 0], duration: 3000 }] },
        { colors: [{ rgbw: [100, 0, 20], duration: 3500 }, { rgbw: [20, 0, 0], duration: 3500 }, { rgbw: [60, 0, 10], duration: 3500 }] },
        { colors: [{ rgbw: [80, 0, 0], duration: 4000 }, { rgbw: [10, 0, 0], duration: 4000 }, { rgbw: [50, 0, 0], duration: 4000 }, { rgbw: [30, 0, 0], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [175, 80], duration: 4000, easing: easeInExpo }, { axis: [340, 68], duration: 4000, easing: easeInExpo }], colors: [16, 0], ledRing: [70, 80], gobo: 0 },
        { moves: [{ axis: [130, 84], duration: 4500, easing: easeInExpo }, { axis: [360, 70], duration: 4500, easing: easeInExpo }, { axis: [245, 88], duration: 4500, easing: easeInExpo }], colors: [0, 16], ledRing: [60, 72], gobo: 0 },
        { moves: [{ axis: [100, 78], duration: 5000, easing: easeInExpo }, { axis: [255, 64], duration: 5000, easing: easeInExpo }, { axis: [400, 82], duration: 5000, easing: easeInExpo }, { axis: [150, 70], duration: 5000, easing: easeInExpo }], colors: [16, 0], ledRing: [72, 62], gobo: 0 },
      ],
      mini: [
        { ledRing: [50, 62], gobo: true, beam: 80, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [40, 52], gobo: true, beam: 70, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [60, 70], gobo: false, beam: 60, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'pop+emotional': {
    luminous: { head: 145, mini: 185, par: 125 },
    strobing: { threshold: 0.82, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 120, 180], duration: 3000 }, { rgbw: [160, 100, 220], duration: 3000 }, { rgbw: [200, 140, 200], duration: 3000 }] },
        { colors: [{ rgbw: [180, 100, 200], duration: 3500 }, { rgbw: [230, 150, 180], duration: 3500 }, { rgbw: [140, 80, 210], duration: 3500 }] },
        { colors: [{ rgbw: [210, 130, 190], duration: 3500 }, { rgbw: [170, 110, 215], duration: 3500 }, { rgbw: [240, 160, 180], duration: 3500 }, { rgbw: [150, 90, 200], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [195, 82], duration: 4000, easing: easeInOutSine }, { axis: [315, 70], duration: 4000, easing: easeInOutSine }], colors: [96, 64], ledRing: [78, 88], gobo: 0 },
        { moves: [{ axis: [155, 86], duration: 4500, easing: easeInOutSine }, { axis: [355, 72], duration: 4500, easing: easeInOutSine }, { axis: [250, 90], duration: 4500, easing: easeInOutSine }], colors: [64, 96], ledRing: [70, 82], gobo: 0 },
        { moves: [{ axis: [185, 80], duration: 5000, easing: easeInOutSine }, { axis: [295, 68], duration: 5000, easing: easeInOutSine }, { axis: [235, 86], duration: 5000, easing: easeInOutSine }, { axis: [270, 74], duration: 5000, easing: easeInOutSine }], colors: [96, 48], ledRing: [82, 72], gobo: 0 },
      ],
      mini: [
        { ledRing: [55, 65], gobo: true, beam: 90, laser: 25, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [45, 55], gobo: true, beam: 80, laser: 20, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [65, 75], gobo: false, beam: 70, laser: 18, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'electronic+emotional': {
    luminous: { head: 135, mini: 175, par: 115 },
    strobing: { threshold: 0.82, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 120, 160], duration: 3000 }, { rgbw: [80, 0, 160], duration: 3000 }, { rgbw: [0, 80, 120], duration: 3000 }] },
        { colors: [{ rgbw: [60, 0, 140], duration: 3500 }, { rgbw: [0, 100, 140], duration: 3500 }, { rgbw: [40, 0, 120], duration: 3500 }] },
        { colors: [{ rgbw: [0, 100, 150], duration: 3500 }, { rgbw: [70, 0, 150], duration: 3500 }, { rgbw: [0, 60, 100], duration: 3500 }, { rgbw: [50, 0, 130], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [195, 80], duration: 4000, easing: easeInOutSine }, { axis: [325, 68], duration: 4000, easing: easeInOutSine }], colors: [112, 48], ledRing: [72, 82], gobo: 0 },
        { moves: [{ axis: [150, 84], duration: 4500, easing: easeInOutSine }, { axis: [360, 70], duration: 4500, easing: easeInOutSine }, { axis: [250, 88], duration: 4500, easing: easeInOutSine }], colors: [48, 112], ledRing: [64, 76], gobo: 0 },
        { moves: [{ axis: [180, 78], duration: 5000, easing: easeInOutSine }, { axis: [295, 66], duration: 5000, easing: easeInOutSine }, { axis: [230, 84], duration: 5000, easing: easeInOutSine }, { axis: [275, 72], duration: 5000, easing: easeInOutSine }], colors: [112, 96], ledRing: [76, 66], gobo: 0 },
      ],
      mini: [
        { ledRing: [50, 62], gobo: true, beam: 85, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [42, 54], gobo: true, beam: 75, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [60, 70], gobo: false, beam: 65, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'jazz+emotional': {
    luminous: { head: 130, mini: 175, par: 115 },
    strobing: { threshold: 0.84, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 80, 0], duration: 3000 }, { rgbw: [0, 40, 100], duration: 3000 }, { rgbw: [140, 60, 0], duration: 3000 }] },
        { colors: [{ rgbw: [160, 60, 10], duration: 3500 }, { rgbw: [20, 20, 80], duration: 3500 }, { rgbw: [120, 50, 0], duration: 3500 }] },
        { colors: [{ rgbw: [200, 90, 0], duration: 4000 }, { rgbw: [0, 30, 90], duration: 4000 }, { rgbw: [160, 70, 10], duration: 4000 }, { rgbw: [10, 10, 70], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [205, 82], duration: 4000, easing: easeInOutSine }, { axis: [305, 70], duration: 4000, easing: easeInOutSine }], colors: [80, 64], ledRing: [68, 78], gobo: 16 },
        { moves: [{ axis: [165, 86], duration: 4500, easing: easeInOutSine }, { axis: [330, 72], duration: 4500, easing: easeInOutSine }, { axis: [248, 88], duration: 4500, easing: easeInOutSine }], colors: [64, 80], ledRing: [60, 72], gobo: 0 },
        { moves: [{ axis: [185, 80], duration: 5000, easing: easeInOutSine }, { axis: [280, 66], duration: 5000, easing: easeInOutSine }, { axis: [145, 84], duration: 5000, easing: easeInOutSine }, { axis: [320, 72], duration: 5000, easing: easeInOutSine }], colors: [80, 16], ledRing: [72, 62], gobo: 16 },
      ],
      mini: [
        { ledRing: [48, 60], gobo: true, beam: 80, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [38, 50], gobo: true, beam: 70, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [58, 68], gobo: false, beam: 60, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'rnb+emotional': {
    luminous: { head: 150, mini: 190, par: 130 },
    strobing: { threshold: 0.82, paceWeight: 0.13, energyWeight: 0.87, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 20, 60], duration: 3000 }, { rgbw: [100, 0, 80], duration: 3000 }, { rgbw: [140, 10, 50], duration: 3000 }] },
        { colors: [{ rgbw: [160, 10, 70], duration: 3500 }, { rgbw: [120, 30, 60], duration: 3500 }, { rgbw: [80, 0, 90], duration: 3500 }] },
        { colors: [{ rgbw: [200, 30, 80], duration: 3500 }, { rgbw: [90, 0, 100], duration: 3500 }, { rgbw: [160, 20, 60], duration: 3500 }, { rgbw: [70, 0, 80], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [185, 78], duration: 4000, easing: easeInOutSine }, { axis: [335, 68], duration: 4000, easing: easeInOutSine }], colors: [80, 96], ledRing: [76, 88], gobo: 32 },
        { moves: [{ axis: [140, 82], duration: 4500, easing: easeInOutSine }, { axis: [360, 70], duration: 4500, easing: easeInOutSine }, { axis: [245, 90], duration: 4500, easing: easeInOutSine }], colors: [96, 80], ledRing: [66, 78], gobo: 16 },
        { moves: [{ axis: [100, 76], duration: 5000, easing: easeInOutSine }, { axis: [400, 66], duration: 5000, easing: easeInOutSine }, { axis: [248, 82], duration: 5000, easing: easeInOutSine }, { axis: [120, 70], duration: 5000, easing: easeInOutSine }], colors: [80, 16], ledRing: [80, 68], gobo: 32 },
      ],
      mini: [
        { ledRing: [58, 70], gobo: true, beam: 90, laser: 25, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [48, 60], gobo: true, beam: 80, laser: 20, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [68, 78], gobo: false, beam: 70, laser: 18, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'folk+emotional': {
    luminous: { head: 125, mini: 168, par: 110 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 120, 30], duration: 3000 }, { rgbw: [100, 140, 60], duration: 3000 }, { rgbw: [160, 100, 20], duration: 3000 }] },
        { colors: [{ rgbw: [160, 100, 20], duration: 3500 }, { rgbw: [80, 120, 50], duration: 3500 }, { rgbw: [140, 80, 10], duration: 3500 }] },
        { colors: [{ rgbw: [200, 140, 40], duration: 4000 }, { rgbw: [120, 160, 70], duration: 4000 }, { rgbw: [170, 110, 25], duration: 4000 }, { rgbw: [90, 130, 55], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [210, 76], duration: 4000, easing: easeInOutSine }, { axis: [320, 66], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [64, 74], gobo: 16 },
        { moves: [{ axis: [170, 80], duration: 4500, easing: easeInOutSine }, { axis: [340, 66], duration: 4500, easing: easeInOutSine }, { axis: [255, 84], duration: 4500, easing: easeInOutSine }], colors: [80, 64], ledRing: [56, 68], gobo: 0 },
        { moves: [{ axis: [190, 74], duration: 5000, easing: easeInOutSine }, { axis: [330, 62], duration: 5000, easing: easeInOutSine }, { axis: [235, 80], duration: 5000, easing: easeInOutSine }, { axis: [280, 70], duration: 5000, easing: easeInOutSine }], colors: [64, 32], ledRing: [70, 60], gobo: 16 },
      ],
      mini: [
        { ledRing: [40, 52], gobo: true, beam: 78, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [30, 42], gobo: true, beam: 68, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [50, 60], gobo: false, beam: 58, laser: 14, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'ambient+emotional': {
    luminous: { head: 50, mini: 70, par: 35 },
    strobing: { threshold: 0.9, paceWeight: 0.08, energyWeight: 0.92, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 30, 80], duration: 5000 }, { rgbw: [0, 10, 50], duration: 5000 }, { rgbw: [0, 20, 60], duration: 5000 }] },
        { colors: [{ rgbw: [10, 0, 60], duration: 6000 }, { rgbw: [0, 20, 50], duration: 6000 }, { rgbw: [5, 5, 40], duration: 6000 }] },
        { colors: [{ rgbw: [0, 25, 70], duration: 7000 }, { rgbw: [8, 0, 55], duration: 7000 }, { rgbw: [0, 15, 45], duration: 7000 }, { rgbw: [5, 8, 60], duration: 7000 }] },
      ],
      head: [
        { moves: [{ axis: [238, 76], duration: 10000, easing: easeInOutSine }, { axis: [268, 82], duration: 10000, easing: easeInOutSine }], colors: [112, 48], ledRing: [60, 70], gobo: 0 },
        { moves: [{ axis: [220, 80], duration: 14000, easing: easeInOutSine }, { axis: [290, 70], duration: 14000, easing: easeInOutSine }, { axis: [250, 84], duration: 14000, easing: easeInOutSine }], colors: [48, 112], ledRing: [52, 64], gobo: 0 },
        { moves: [{ axis: [210, 78], duration: 12000, easing: easeInOutSine }, { axis: [260, 68], duration: 12000, easing: easeInOutSine }, { axis: [230, 82], duration: 12000, easing: easeInOutSine }, { axis: [275, 74], duration: 12000, easing: easeInOutSine }], colors: [112, 48], ledRing: [44, 56], gobo: 0 },
      ],
      mini: [
        { ledRing: [0, 12], gobo: true, beam: 28, laser: 12, starfield: true, moves: [{ axis: [310, 60], duration: 10000 }, { axis: [460, 75], duration: 10000 }, { axis: [610, 60], duration: 10000 }, { axis: [460, 50], duration: 10000 }] },
        { ledRing: [0, 10], gobo: true, beam: 22, laser: 10, starfield: true, moves: [{ axis: [270, 60], duration: 12000 }, { axis: [420, 75], duration: 12000 }, { axis: [570, 60], duration: 12000 }, { axis: [420, 50], duration: 12000 }] },
        { ledRing: [0, 14], gobo: false, beam: 18, laser: 8, starfield: true, moves: [{ axis: [340, 60], duration: 14000 }, { axis: [490, 75], duration: 14000 }, { axis: [640, 60], duration: 14000 }, { axis: [490, 50], duration: 14000 }] },
      ],
    },
  },

  'classical+emotional': {
    luminous: { head: 170, mini: 210, par: 145 },
    strobing: { threshold: 0.88, paceWeight: 0.08, energyWeight: 0.92, danceExp: 2.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 240, 200, 80], duration: 4000 }, { rgbw: [220, 230, 255, 40], duration: 4000 }, { rgbw: [255, 245, 215, 60], duration: 4000 }] },
        { colors: [{ rgbw: [240, 225, 190, 70], duration: 5000 }, { rgbw: [200, 215, 240, 30], duration: 5000 }, { rgbw: [255, 235, 205, 80], duration: 5000 }] },
        { colors: [{ rgbw: [255, 248, 220, 90], duration: 5000 }, { rgbw: [210, 225, 255, 35], duration: 5000 }, { rgbw: [245, 230, 200, 75], duration: 5000 }, { rgbw: [195, 210, 235, 25], duration: 5000 }] },
      ],
      head: [
        { moves: [{ axis: [238, 74], duration: 6000, easing: easeInOutSine }, { axis: [272, 84], duration: 6000, easing: easeInOutSine }], colors: [0, 48], ledRing: [86, 96], gobo: 0 },
        { moves: [{ axis: [215, 78], duration: 7000, easing: easeInOutSine }, { axis: [295, 68], duration: 7000, easing: easeInOutSine }, { axis: [255, 86], duration: 7000, easing: easeInOutSine }], colors: [48, 0], ledRing: [80, 92], gobo: 0 },
        { moves: [{ axis: [232, 76], duration: 8000, easing: easeInOutSine }, { axis: [268, 82], duration: 8000, easing: easeInOutSine }, { axis: [242, 72], duration: 8000, easing: easeInOutSine }, { axis: [278, 80], duration: 8000, easing: easeInOutSine }], colors: [0, 112], ledRing: [84, 94], gobo: 0 },
      ],
      mini: [
        { ledRing: [45, 56], gobo: true, beam: 95, laser: 26, starfield: true, moves: [{ axis: [255, 60], duration: 6000 }, { axis: [405, 75], duration: 6000 }, { axis: [555, 60], duration: 6000 }, { axis: [405, 50], duration: 6000 }] },
        { ledRing: [35, 46], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [240, 60], duration: 7000 }, { axis: [390, 75], duration: 7000 }, { axis: [540, 60], duration: 7000 }, { axis: [390, 50], duration: 7000 }] },
        { ledRing: [55, 66], gobo: false, beam: 72, laser: 18, starfield: true, moves: [{ axis: [270, 60], duration: 8000 }, { axis: [420, 75], duration: 8000 }, { axis: [570, 60], duration: 8000 }, { axis: [420, 50], duration: 8000 }] },
      ],
    },
  },

  'country+emotional': {
    luminous: { head: 145, mini: 185, par: 125 },
    strobing: { threshold: 0.82, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 160, 30], duration: 3000 }, { rgbw: [200, 130, 20], duration: 3000 }, { rgbw: [180, 110, 10], duration: 3000 }] },
        { colors: [{ rgbw: [240, 170, 40], duration: 3500 }, { rgbw: [190, 120, 15], duration: 3500 }, { rgbw: [210, 140, 25], duration: 3500 }] },
        { colors: [{ rgbw: [255, 180, 50], duration: 3500 }, { rgbw: [185, 115, 12], duration: 3500 }, { rgbw: [225, 155, 30], duration: 3500 }, { rgbw: [170, 100, 8], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [200, 78], duration: 4000, easing: easeInOutSine }, { axis: [320, 66], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [68, 78], gobo: 16 },
        { moves: [{ axis: [160, 82], duration: 4500, easing: easeInOutSine }, { axis: [345, 68], duration: 4500, easing: easeInOutSine }, { axis: [248, 84], duration: 4500, easing: easeInOutSine }], colors: [80, 64], ledRing: [60, 72], gobo: 32 },
        { moves: [{ axis: [180, 76], duration: 5000, easing: easeInOutSine }, { axis: [305, 64], duration: 5000, easing: easeInOutSine }, { axis: [240, 80], duration: 5000, easing: easeInOutSine }, { axis: [290, 70], duration: 5000, easing: easeInOutSine }], colors: [64, 80], ledRing: [74, 64], gobo: 16 },
      ],
      mini: [
        { ledRing: [46, 58], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [36, 48], gobo: true, beam: 72, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [56, 66], gobo: false, beam: 62, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'latin+emotional': {
    luminous: { head: 155, mini: 195, par: 135 },
    strobing: { threshold: 0.82, paceWeight: 0.13, energyWeight: 0.87, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 80, 80], duration: 3000 }, { rgbw: [200, 100, 60], duration: 3000 }, { rgbw: [180, 60, 80], duration: 3000 }] },
        { colors: [{ rgbw: [240, 90, 70], duration: 3500 }, { rgbw: [190, 70, 90], duration: 3500 }, { rgbw: [210, 110, 55], duration: 3500 }] },
        { colors: [{ rgbw: [230, 85, 75], duration: 3500 }, { rgbw: [200, 60, 85], duration: 3500 }, { rgbw: [255, 100, 65], duration: 3500 }, { rgbw: [175, 55, 90], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [185, 76], duration: 3500, easing: easeInOutSine }, { axis: [335, 66], duration: 3500, easing: easeInOutSine }], colors: [80, 64], ledRing: [80, 90], gobo: 64 },
        { moves: [{ axis: [140, 80], duration: 4000, easing: easeInOutSine }, { axis: [370, 68], duration: 4000, easing: easeInOutSine }, { axis: [250, 86], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [70, 82], gobo: 48 },
        { moves: [{ axis: [170, 74], duration: 4500, easing: easeInOutSine }, { axis: [315, 64], duration: 4500, easing: easeInOutSine }, { axis: [240, 80], duration: 4500, easing: easeInOutSine }, { axis: [285, 70], duration: 4500, easing: easeInOutSine }], colors: [80, 16], ledRing: [84, 74], gobo: 32 },
      ],
      mini: [
        { ledRing: [60, 72], gobo: true, beam: 88, laser: 24, starfield: true, moves: [{ axis: [255, 60], duration: 3500 }, { axis: [405, 75], duration: 3500 }, { axis: [555, 60], duration: 3500 }, { axis: [405, 50], duration: 3500 }] },
        { ledRing: [50, 62], gobo: true, beam: 78, laser: 20, starfield: true, moves: [{ axis: [210, 60], duration: 4000 }, { axis: [360, 75], duration: 4000 }, { axis: [510, 60], duration: 4000 }, { axis: [360, 50], duration: 4000 }] },
        { ledRing: [70, 80], gobo: false, beam: 68, laser: 17, starfield: true, moves: [{ axis: [300, 60], duration: 4500 }, { axis: [450, 75], duration: 4500 }, { axis: [600, 60], duration: 4500 }, { axis: [450, 50], duration: 4500 }] },
      ],
    },
  },

  'reggae+emotional': {
    luminous: { head: 130, mini: 172, par: 112 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 90, 30], duration: 3000 }, { rgbw: [140, 120, 0], duration: 3000 }, { rgbw: [0, 70, 20], duration: 3000 }] },
        { colors: [{ rgbw: [100, 100, 0], duration: 3500 }, { rgbw: [0, 80, 25], duration: 3500 }, { rgbw: [80, 90, 0], duration: 3500 }] },
        { colors: [{ rgbw: [0, 100, 35], duration: 4000 }, { rgbw: [120, 110, 0], duration: 4000 }, { rgbw: [0, 75, 22], duration: 4000 }, { rgbw: [90, 95, 0], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [195, 78], duration: 3500, easing: easeInOutSine }, { axis: [320, 66], duration: 3500, easing: easeInOutSine }], colors: [32, 64], ledRing: [62, 74], gobo: 32 },
        { moves: [{ axis: [155, 82], duration: 4000, easing: easeInOutSine }, { axis: [345, 68], duration: 4000, easing: easeInOutSine }, { axis: [250, 84], duration: 4000, easing: easeInOutSine }], colors: [64, 32], ledRing: [54, 66], gobo: 16 },
        { moves: [{ axis: [175, 76], duration: 5000, easing: easeInOutSine }, { axis: [310, 64], duration: 5000, easing: easeInOutSine }, { axis: [230, 80], duration: 5000, easing: easeInOutSine }, { axis: [280, 70], duration: 5000, easing: easeInOutSine }], colors: [32, 80], ledRing: [68, 58], gobo: 32 },
      ],
      mini: [
        { ledRing: [42, 54], gobo: true, beam: 75, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 3500 }, { axis: [405, 75], duration: 3500 }, { axis: [555, 60], duration: 3500 }, { axis: [405, 50], duration: 3500 }] },
        { ledRing: [32, 44], gobo: true, beam: 65, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 4000 }, { axis: [360, 75], duration: 4000 }, { axis: [510, 60], duration: 4000 }, { axis: [360, 50], duration: 4000 }] },
        { ledRing: [52, 62], gobo: false, beam: 55, laser: 14, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'funk+emotional': {
    luminous: { head: 145, mini: 188, par: 125 },
    strobing: { threshold: 0.82, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 80, 0], duration: 3000 }, { rgbw: [80, 0, 60], duration: 3000 }, { rgbw: [160, 60, 0], duration: 3000 }] },
        { colors: [{ rgbw: [180, 60, 20], duration: 3500 }, { rgbw: [60, 0, 80], duration: 3500 }, { rgbw: [140, 50, 0], duration: 3500 }] },
        { colors: [{ rgbw: [220, 90, 10], duration: 3500 }, { rgbw: [70, 0, 70], duration: 3500 }, { rgbw: [170, 65, 5], duration: 3500 }, { rgbw: [50, 0, 60], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [160, 76], duration: 3500, easing: easeInOutSine }, { axis: [340, 66], duration: 3500, easing: easeInOutSine }], colors: [80, 96], ledRing: [72, 84], gobo: 48 },
        { moves: [{ axis: [110, 80], duration: 4000, easing: easeInOutSine }, { axis: [395, 68], duration: 4000, easing: easeInOutSine }, { axis: [220, 88], duration: 4000, easing: easeInOutSine }], colors: [96, 80], ledRing: [62, 76], gobo: 32 },
        { moves: [{ axis: [145, 74], duration: 5000, easing: easeInOutSine }, { axis: [355, 62], duration: 5000, easing: easeInOutSine }, { axis: [240, 80], duration: 5000, easing: easeInOutSine }, { axis: [175, 68], duration: 5000, easing: easeInOutSine }], colors: [80, 16], ledRing: [78, 66], gobo: 64 },
      ],
      mini: [
        { ledRing: [52, 64], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 3500 }, { axis: [405, 75], duration: 3500 }, { axis: [555, 60], duration: 3500 }, { axis: [405, 50], duration: 3500 }] },
        { ledRing: [42, 54], gobo: true, beam: 72, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4000 }, { axis: [360, 75], duration: 4000 }, { axis: [510, 60], duration: 4000 }, { axis: [360, 50], duration: 4000 }] },
        { ledRing: [62, 72], gobo: false, beam: 62, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'blues+emotional': {
    luminous: { head: 125, mini: 168, par: 108 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 40, 140], duration: 3000 }, { rgbw: [40, 20, 100], duration: 3000 }, { rgbw: [0, 60, 120], duration: 3000 }] },
        { colors: [{ rgbw: [20, 10, 120], duration: 3500 }, { rgbw: [60, 30, 100], duration: 3500 }, { rgbw: [10, 20, 110], duration: 3500 }] },
        { colors: [{ rgbw: [0, 50, 150], duration: 4000 }, { rgbw: [50, 25, 110], duration: 4000 }, { rgbw: [0, 35, 130], duration: 4000 }, { rgbw: [30, 15, 100], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [208, 78], duration: 4000, easing: easeInOutSine }, { axis: [298, 88], duration: 4000, easing: easeInOutSine }], colors: [112, 48], ledRing: [64, 76], gobo: 0 },
        { moves: [{ axis: [155, 72], duration: 4500, easing: easeInOutSine }, { axis: [370, 86], duration: 4500, easing: easeInOutSine }, { axis: [240, 100], duration: 4500, easing: easeInOutSine }], colors: [48, 112], ledRing: [56, 68], gobo: 16 },
        { moves: [{ axis: [195, 76], duration: 5000, easing: easeInOutSine }, { axis: [258, 90], duration: 5000, easing: easeInOutSine }, { axis: [218, 68], duration: 5000, easing: easeInOutSine }], colors: [112, 96], ledRing: [60, 72], gobo: 0 },
      ],
      mini: [
        { ledRing: [44, 56], gobo: true, beam: 76, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [34, 46], gobo: true, beam: 66, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [54, 64], gobo: false, beam: 56, laser: 14, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'metal+emotional': {
    luminous: { head: 80, mini: 110, par: 65 },
    strobing: { threshold: 0.9, paceWeight: 0.08, energyWeight: 0.92, danceExp: 2.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 0, 0], duration: 5000 }, { rgbw: [10, 0, 0], duration: 5000 }, { rgbw: [50, 0, 0], duration: 5000 }] },
        { colors: [{ rgbw: [60, 0, 10], duration: 6000 }, { rgbw: [5, 0, 5], duration: 6000 }, { rgbw: [40, 0, 8], duration: 6000 }] },
        { colors: [{ rgbw: [70, 0, 0], duration: 7000 }, { rgbw: [8, 0, 0], duration: 7000 }, { rgbw: [45, 0, 5], duration: 7000 }, { rgbw: [5, 0, 0], duration: 7000 }] },
      ],
      head: [
        { moves: [{ axis: [240, 78], duration: 8000, easing: easeInOutSine }, { axis: [270, 68], duration: 8000, easing: easeInOutSine }], colors: [16, 0], ledRing: [40, 52], gobo: 0 },
        { moves: [{ axis: [220, 82], duration: 10000, easing: easeInOutSine }, { axis: [290, 70], duration: 10000, easing: easeInOutSine }, { axis: [252, 86], duration: 10000, easing: easeInOutSine }], colors: [0, 16], ledRing: [32, 44], gobo: 0 },
        { moves: [{ axis: [230, 76], duration: 12000, easing: easeInOutSine }, { axis: [262, 82], duration: 12000, easing: easeInOutSine }, { axis: [245, 72], duration: 12000, easing: easeInOutSine }, { axis: [275, 80], duration: 12000, easing: easeInOutSine }], colors: [16, 80], ledRing: [44, 56], gobo: 0 },
      ],
      mini: [
        { ledRing: [0, 14], gobo: true, beam: 30, laser: 12, starfield: true, moves: [{ axis: [310, 60], duration: 8000 }, { axis: [460, 75], duration: 8000 }, { axis: [610, 60], duration: 8000 }, { axis: [460, 50], duration: 8000 }] },
        { ledRing: [0, 10], gobo: true, beam: 24, laser: 10, starfield: true, moves: [{ axis: [270, 60], duration: 10000 }, { axis: [420, 75], duration: 10000 }, { axis: [570, 60], duration: 10000 }, { axis: [420, 50], duration: 10000 }] },
        { ledRing: [0, 16], gobo: false, beam: 20, laser: 8, starfield: true, moves: [{ axis: [340, 60], duration: 12000 }, { axis: [490, 75], duration: 12000 }, { axis: [640, 60], duration: 12000 }, { axis: [490, 50], duration: 12000 }] },
      ],
    },
  },

  'hardrock+emotional': {
    luminous: { head: 120, mini: 162, par: 100 },
    strobing: { threshold: 0.84, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 0, 40], duration: 3500 }, { rgbw: [60, 0, 80], duration: 3500 }, { rgbw: [90, 0, 30], duration: 3500 }] },
        { colors: [{ rgbw: [100, 0, 60], duration: 4000 }, { rgbw: [50, 0, 70], duration: 4000 }, { rgbw: [80, 0, 40], duration: 4000 }] },
        { colors: [{ rgbw: [110, 0, 50], duration: 4500 }, { rgbw: [40, 0, 80], duration: 4500 }, { rgbw: [85, 0, 35], duration: 4500 }, { rgbw: [30, 0, 65], duration: 4500 }] },
      ],
      head: [
        { moves: [{ axis: [185, 80], duration: 4500, easing: easeInOutSine }, { axis: [335, 68], duration: 4500, easing: easeInOutSine }], colors: [16, 0], ledRing: [62, 74], gobo: 0 },
        { moves: [{ axis: [140, 84], duration: 5000, easing: easeInOutSine }, { axis: [365, 70], duration: 5000, easing: easeInOutSine }, { axis: [250, 88], duration: 5000, easing: easeInOutSine }], colors: [0, 16], ledRing: [52, 64], gobo: 0 },
        { moves: [{ axis: [165, 78], duration: 6000, easing: easeInOutSine }, { axis: [310, 66], duration: 6000, easing: easeInOutSine }, { axis: [238, 84], duration: 6000, easing: easeInOutSine }, { axis: [175, 72], duration: 6000, easing: easeInOutSine }], colors: [16, 80], ledRing: [68, 58], gobo: 0 },
      ],
      mini: [
        { ledRing: [38, 50], gobo: true, beam: 68, laser: 18, starfield: true, moves: [{ axis: [255, 60], duration: 4500 }, { axis: [405, 75], duration: 4500 }, { axis: [555, 60], duration: 4500 }, { axis: [405, 50], duration: 4500 }] },
        { ledRing: [28, 40], gobo: true, beam: 58, laser: 14, starfield: true, moves: [{ axis: [210, 60], duration: 5000 }, { axis: [360, 75], duration: 5000 }, { axis: [510, 60], duration: 5000 }, { axis: [360, 50], duration: 5000 }] },
        { ledRing: [48, 58], gobo: false, beam: 48, laser: 12, starfield: true, moves: [{ axis: [300, 60], duration: 6000 }, { axis: [450, 75], duration: 6000 }, { axis: [600, 60], duration: 6000 }, { axis: [450, 50], duration: 6000 }] },
      ],
    },
  },

  'dance+emotional': {
    luminous: { head: 140, mini: 182, par: 120 },
    strobing: { threshold: 0.82, paceWeight: 0.12, energyWeight: 0.88, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 60, 180], duration: 3000 }, { rgbw: [80, 0, 160], duration: 3000 }, { rgbw: [0, 40, 140], duration: 3000 }] },
        { colors: [{ rgbw: [60, 0, 150], duration: 3500 }, { rgbw: [0, 50, 160], duration: 3500 }, { rgbw: [40, 0, 130], duration: 3500 }] },
        { colors: [{ rgbw: [0, 70, 170], duration: 3500 }, { rgbw: [70, 0, 155], duration: 3500 }, { rgbw: [0, 45, 145], duration: 3500 }, { rgbw: [55, 0, 135], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [195, 80], duration: 4000, easing: easeInOutSine }, { axis: [325, 68], duration: 4000, easing: easeInOutSine }], colors: [112, 48], ledRing: [72, 82], gobo: 0 },
        { moves: [{ axis: [155, 84], duration: 4500, easing: easeInOutSine }, { axis: [360, 70], duration: 4500, easing: easeInOutSine }, { axis: [250, 88], duration: 4500, easing: easeInOutSine }], colors: [48, 112], ledRing: [64, 76], gobo: 0 },
        { moves: [{ axis: [178, 78], duration: 5000, easing: easeInOutSine }, { axis: [298, 66], duration: 5000, easing: easeInOutSine }, { axis: [235, 84], duration: 5000, easing: easeInOutSine }, { axis: [270, 72], duration: 5000, easing: easeInOutSine }], colors: [112, 96], ledRing: [76, 66], gobo: 0 },
      ],
      mini: [
        { ledRing: [48, 60], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [38, 50], gobo: true, beam: 72, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [58, 68], gobo: false, beam: 62, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'house+emotional': {
    luminous: { head: 105, mini: 145, par: 88 },
    strobing: { threshold: 0.88, paceWeight: 0.09, energyWeight: 0.91, danceExp: 2.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 20, 100], duration: 5000 }, { rgbw: [0, 0, 70], duration: 5000 }, { rgbw: [0, 10, 80], duration: 5000 }] },
        { colors: [{ rgbw: [0, 15, 90], duration: 6000 }, { rgbw: [10, 0, 60], duration: 6000 }, { rgbw: [0, 8, 75], duration: 6000 }] },
        { colors: [{ rgbw: [0, 25, 110], duration: 6000 }, { rgbw: [5, 0, 80], duration: 6000 }, { rgbw: [0, 12, 90], duration: 6000 }, { rgbw: [8, 0, 65], duration: 6000 }] },
      ],
      head: [
        { moves: [{ axis: [238, 78], duration: 8000, easing: easeInOutSine }, { axis: [268, 68], duration: 8000, easing: easeInOutSine }], colors: [112, 48], ledRing: [54, 66], gobo: 0 },
        { moves: [{ axis: [218, 82], duration: 10000, easing: easeInOutSine }, { axis: [292, 70], duration: 10000, easing: easeInOutSine }, { axis: [252, 86], duration: 10000, easing: easeInOutSine }], colors: [48, 0], ledRing: [46, 58], gobo: 0 },
        { moves: [{ axis: [228, 76], duration: 12000, easing: easeInOutSine }, { axis: [264, 82], duration: 12000, easing: easeInOutSine }, { axis: [244, 72], duration: 12000, easing: easeInOutSine }, { axis: [278, 80], duration: 12000, easing: easeInOutSine }], colors: [96, 48], ledRing: [58, 68], gobo: 0 },
      ],
      mini: [
        { ledRing: [0, 15], gobo: true, beam: 35, laser: 14, starfield: true, moves: [{ axis: [310, 60], duration: 8000 }, { axis: [460, 75], duration: 8000 }, { axis: [610, 60], duration: 8000 }, { axis: [460, 50], duration: 8000 }] },
        { ledRing: [0, 12], gobo: true, beam: 28, laser: 11, starfield: true, moves: [{ axis: [270, 60], duration: 10000 }, { axis: [420, 75], duration: 10000 }, { axis: [570, 60], duration: 10000 }, { axis: [420, 50], duration: 10000 }] },
        { ledRing: [0, 18], gobo: false, beam: 22, laser: 9, starfield: true, moves: [{ axis: [340, 60], duration: 12000 }, { axis: [490, 75], duration: 12000 }, { axis: [640, 60], duration: 12000 }, { axis: [490, 50], duration: 12000 }] },
      ],
    },
  },

  'disco+emotional': {
    luminous: { head: 135, mini: 178, par: 115 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 80, 80], duration: 3000 }, { rgbw: [160, 130, 10], duration: 3000 }, { rgbw: [150, 60, 70], duration: 3000 }] },
        { colors: [{ rgbw: [170, 100, 60], duration: 3500 }, { rgbw: [140, 110, 20], duration: 3500 }, { rgbw: [160, 70, 80], duration: 3500 }] },
        { colors: [{ rgbw: [190, 90, 70], duration: 4000 }, { rgbw: [150, 120, 15], duration: 4000 }, { rgbw: [165, 75, 85], duration: 4000 }, { rgbw: [130, 100, 25], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [190, 76], duration: 4000, easing: easeInOutSine }, { axis: [340, 66], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [72, 84], gobo: 32 },
        { moves: [{ axis: [148, 80], duration: 4500, easing: easeInOutSine }, { axis: [362, 68], duration: 4500, easing: easeInOutSine }, { axis: [248, 86], duration: 4500, easing: easeInOutSine }], colors: [80, 96], ledRing: [62, 76], gobo: 48 },
        { moves: [{ axis: [172, 74], duration: 5000, easing: easeInOutSine }, { axis: [318, 64], duration: 5000, easing: easeInOutSine }, { axis: [240, 80], duration: 5000, easing: easeInOutSine }, { axis: [282, 70], duration: 5000, easing: easeInOutSine }], colors: [64, 96], ledRing: [76, 66], gobo: 64 },
      ],
      mini: [
        { ledRing: [50, 62], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [40, 52], gobo: true, beam: 72, laser: 18, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [60, 70], gobo: false, beam: 62, laser: 15, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  'chillout+emotional': {
    luminous: { head: 130, mini: 172, par: 112 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 140, 160], duration: 3500 }, { rgbw: [100, 80, 180], duration: 3500 }, { rgbw: [50, 160, 150], duration: 3500 }] },
        { colors: [{ rgbw: [70, 100, 175], duration: 4000 }, { rgbw: [120, 70, 160], duration: 4000 }, { rgbw: [45, 140, 145], duration: 4000 }] },
        { colors: [{ rgbw: [55, 120, 165], duration: 4500 }, { rgbw: [110, 90, 170], duration: 4500 }, { rgbw: [40, 150, 155], duration: 4500 }, { rgbw: [130, 75, 155], duration: 4500 }] },
      ],
      head: [
        { moves: [{ axis: [200, 80], duration: 5000, easing: easeInOutSine }, { axis: [305, 68], duration: 5000, easing: easeInOutSine }], colors: [48, 96], ledRing: [68, 78], gobo: 0 },
        { moves: [{ axis: [165, 84], duration: 5500, easing: easeInOutSine }, { axis: [328, 70], duration: 5500, easing: easeInOutSine }, { axis: [248, 88], duration: 5500, easing: easeInOutSine }], colors: [96, 48], ledRing: [60, 72], gobo: 0 },
        { moves: [{ axis: [185, 78], duration: 6000, easing: easeInOutSine }, { axis: [298, 66], duration: 6000, easing: easeInOutSine }, { axis: [232, 84], duration: 6000, easing: easeInOutSine }, { axis: [272, 72], duration: 6000, easing: easeInOutSine }], colors: [48, 80], ledRing: [72, 62], gobo: 0 },
      ],
      mini: [
        { ledRing: [44, 56], gobo: true, beam: 78, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 5000 }, { axis: [405, 75], duration: 5000 }, { axis: [555, 60], duration: 5000 }, { axis: [405, 50], duration: 5000 }] },
        { ledRing: [34, 46], gobo: true, beam: 68, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 5500 }, { axis: [360, 75], duration: 5500 }, { axis: [510, 60], duration: 5500 }, { axis: [360, 50], duration: 5500 }] },
        { ledRing: [54, 64], gobo: false, beam: 58, laser: 14, starfield: true, moves: [{ axis: [300, 60], duration: 6000 }, { axis: [450, 75], duration: 6000 }, { axis: [600, 60], duration: 6000 }, { axis: [450, 50], duration: 6000 }] },
      ],
    },
  },

  'triphop+emotional': {
    luminous: { head: 140, mini: 165, par: 108 },
    strobing: { threshold: 0.84, paceWeight: 0.11, energyWeight: 0.89, danceExp: 2.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [60, 0, 120], duration: 3500 }, { rgbw: [30, 30, 80], duration: 3500 }, { rgbw: [80, 0, 50], duration: 3500 }] },
        { colors: [{ rgbw: [50, 0, 100], duration: 4000 }, { rgbw: [90, 0, 40], duration: 4000 }, { rgbw: [20, 20, 70], duration: 4000 }] },
        { colors: [{ rgbw: [70, 0, 130], duration: 4500 }, { rgbw: [100, 0, 50], duration: 4500 }, { rgbw: [0, 40, 70], duration: 4500 }, { rgbw: [55, 0, 110], duration: 4500 }] },
      ],
      head: [
        { moves: [{ axis: [212, 82], duration: 4500, easing: easeInOutSine }, { axis: [295, 70], duration: 4500, easing: easeInOutSine }], colors: [112, 48], ledRing: [58, 70], gobo: 32 },
        { moves: [{ axis: [148, 88], duration: 5000, easing: easeInOutSine }, { axis: [340, 70], duration: 5000, easing: easeInOutSine }, { axis: [228, 84], duration: 5000, easing: easeInOutSine }], colors: [48, 112], ledRing: [50, 62], gobo: 16 },
        { moves: [{ axis: [192, 84], duration: 6000, easing: easeInOutSine }, { axis: [282, 70], duration: 6000, easing: easeInOutSine }, { axis: [158, 80], duration: 6000, easing: easeInOutSine }, { axis: [220, 86], duration: 6000, easing: easeInOutSine }], colors: [96, 32], ledRing: [62, 52], gobo: 0 },
      ],
      mini: [
        { ledRing: [42, 54], gobo: true, beam: 72, laser: 18, starfield: true, moves: [{ axis: [255, 60], duration: 4500 }, { axis: [405, 75], duration: 4500 }, { axis: [555, 60], duration: 4500 }, { axis: [405, 50], duration: 4500 }] },
        { ledRing: [32, 44], gobo: true, beam: 62, laser: 14, starfield: true, moves: [{ axis: [210, 60], duration: 5000 }, { axis: [360, 75], duration: 5000 }, { axis: [510, 60], duration: 5000 }, { axis: [360, 50], duration: 5000 }] },
        { ledRing: [52, 62], gobo: false, beam: 52, laser: 12, starfield: true, moves: [{ axis: [300, 60], duration: 6000 }, { axis: [450, 75], duration: 6000 }, { axis: [600, 60], duration: 6000 }, { axis: [450, 50], duration: 6000 }] },
      ],
    },
  },

  'newage+emotional': {
    luminous: { head: 112, mini: 148, par: 90 },
    strobing: { threshold: 0.9, paceWeight: 0.08, energyWeight: 0.92, danceExp: 2.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 190, 240, 30], duration: 5000 }, { rgbw: [230, 240, 255, 60], duration: 5000 }, { rgbw: [100, 205, 190, 20], duration: 5000 }] },
        { colors: [{ rgbw: [190, 230, 255, 50], duration: 6000 }, { rgbw: [110, 230, 195, 15], duration: 6000 }, { rgbw: [195, 195, 250, 40], duration: 6000 }] },
        { colors: [{ rgbw: [225, 240, 255, 55], duration: 7000 }, { rgbw: [130, 205, 250, 25], duration: 7000 }, { rgbw: [155, 235, 195, 15], duration: 7000 }, { rgbw: [215, 230, 250, 45], duration: 7000 }] },
      ],
      head: [
        { moves: [{ axis: [241, 76], duration: 7000, easing: easeInOutSine }, { axis: [269, 84], duration: 7000, easing: easeInOutSine }], colors: [0, 48], ledRing: [74, 84], gobo: 0 },
        { moves: [{ axis: [202, 80], duration: 8000, easing: easeInOutSine }, { axis: [308, 70], duration: 8000, easing: easeInOutSine }, { axis: [236, 84], duration: 8000, easing: easeInOutSine }], colors: [48, 0], ledRing: [68, 78], gobo: 0 },
        { moves: [{ axis: [218, 78], duration: 9000, easing: easeInOutSine }, { axis: [264, 72], duration: 9000, easing: easeInOutSine }, { axis: [232, 84], duration: 9000, easing: easeInOutSine }, { axis: [278, 76], duration: 9000, easing: easeInOutSine }], colors: [0, 112], ledRing: [78, 88], gobo: 0 },
      ],
      mini: [
        { ledRing: [25, 36], gobo: true, beam: 50, laser: 14, starfield: true, moves: [{ axis: [320, 60], duration: 7000 }, { axis: [470, 75], duration: 7000 }, { axis: [620, 60], duration: 7000 }, { axis: [470, 50], duration: 7000 }] },
        { ledRing: [15, 26], gobo: true, beam: 40, laser: 11, starfield: true, moves: [{ axis: [280, 60], duration: 8000 }, { axis: [430, 75], duration: 8000 }, { axis: [580, 60], duration: 8000 }, { axis: [430, 50], duration: 8000 }] },
        { ledRing: [35, 46], gobo: false, beam: 32, laser: 9, starfield: true, moves: [{ axis: [350, 60], duration: 9000 }, { axis: [500, 75], duration: 9000 }, { axis: [650, 60], duration: 9000 }, { axis: [500, 50], duration: 9000 }] },
      ],
    },
  },

  'psychedelic+emotional': {
    luminous: { head: 170, mini: 210, par: 145 },
    strobing: { threshold: 0.82, paceWeight: 0.13, energyWeight: 0.87, danceExp: 1.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 0, 180], duration: 3000 }, { rgbw: [0, 80, 120], duration: 3000 }, { rgbw: [100, 0, 140], duration: 3000 }] },
        { colors: [{ rgbw: [60, 0, 160], duration: 3500 }, { rgbw: [0, 100, 100], duration: 3500 }, { rgbw: [120, 0, 100], duration: 3500 }] },
        { colors: [{ rgbw: [90, 0, 190], duration: 4000 }, { rgbw: [0, 90, 110], duration: 4000 }, { rgbw: [110, 0, 150], duration: 4000 }, { rgbw: [0, 70, 130], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [165, 74], duration: 4000, easing: easeInOutSine }, { axis: [365, 90], duration: 4000, easing: easeInOutSine }], colors: [96, 48], ledRing: [80, 95], gobo: 128 },
        { moves: [{ axis: [115, 68], duration: 4500, easing: easeInOutSine }, { axis: [415, 84], duration: 4500, easing: easeInOutSine }, { axis: [242, 100], duration: 4500, easing: easeInOutSine }], colors: [48, 112], ledRing: [72, 88], gobo: 160 },
        { moves: [{ axis: [250, 78], duration: 5500, easing: easeInOutSine }, { axis: [128, 94], duration: 5500, easing: easeInOutSine }, { axis: [395, 66], duration: 5500, easing: easeInOutSine }, { axis: [268, 84], duration: 5500, easing: easeInOutSine }], colors: [112, 96], ledRing: [76, 92], gobo: 140 },
      ],
      mini: [
        { ledRing: [60, 75], gobo: true, beam: 92, laser: 26, starfield: true, moves: [{ axis: [310, 60], duration: 4000 }, { axis: [460, 75], duration: 4000 }, { axis: [610, 60], duration: 4000 }, { axis: [460, 50], duration: 4000 }] },
        { ledRing: [50, 65], gobo: true, beam: 82, laser: 22, starfield: true, moves: [{ axis: [270, 60], duration: 4500 }, { axis: [420, 75], duration: 4500 }, { axis: [570, 60], duration: 4500 }, { axis: [420, 50], duration: 4500 }] },
        { ledRing: [70, 85], gobo: false, beam: 72, laser: 18, starfield: true, moves: [{ axis: [340, 60], duration: 5500 }, { axis: [490, 75], duration: 5500 }, { axis: [640, 60], duration: 5500 }, { axis: [490, 50], duration: 5500 }] },
      ],
    },
  },

  'energetic+emotional': {
    luminous: { head: 165, mini: 205, par: 140 },
    strobing: { threshold: 0.82, paceWeight: 0.13, energyWeight: 0.87, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 160, 0], duration: 3000 }, { rgbw: [180, 120, 0], duration: 3000 }, { rgbw: [200, 140, 10], duration: 3000 }] },
        { colors: [{ rgbw: [240, 170, 10], duration: 3500 }, { rgbw: [160, 110, 0], duration: 3500 }, { rgbw: [210, 150, 5], duration: 3500 }] },
        { colors: [{ rgbw: [255, 180, 20], duration: 3500 }, { rgbw: [150, 100, 0], duration: 3500 }, { rgbw: [220, 155, 8], duration: 3500 }, { rgbw: [140, 90, 0], duration: 3500 }] },
      ],
      head: [
        { moves: [{ axis: [192, 78], duration: 4000, easing: easeInOutSine }, { axis: [320, 66], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [74, 86], gobo: 16 },
        { moves: [{ axis: [152, 82], duration: 4500, easing: easeInOutSine }, { axis: [348, 68], duration: 4500, easing: easeInOutSine }, { axis: [248, 88], duration: 4500, easing: easeInOutSine }], colors: [80, 64], ledRing: [64, 78], gobo: 0 },
        { moves: [{ axis: [178, 76], duration: 5000, easing: easeInOutSine }, { axis: [305, 64], duration: 5000, easing: easeInOutSine }, { axis: [238, 82], duration: 5000, easing: easeInOutSine }, { axis: [272, 70], duration: 5000, easing: easeInOutSine }], colors: [64, 48], ledRing: [78, 66], gobo: 16 },
      ],
      mini: [
        { ledRing: [52, 64], gobo: true, beam: 88, laser: 24, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [42, 54], gobo: true, beam: 78, laser: 20, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [62, 72], gobo: false, beam: 68, laser: 17, starfield: true, moves: [{ axis: [300, 60], duration: 5000 }, { axis: [450, 75], duration: 5000 }, { axis: [600, 60], duration: 5000 }, { axis: [450, 50], duration: 5000 }] },
      ],
    },
  },

  // ── +dark entries ────────────────────────────────────────────────────────

  'electronic+dark': {
    luminous: { head: 160, mini: 200, par: 135 },
    strobing: { threshold: 0.58, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.6 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 60, 100], duration: 2500 }, { rgbw: [0, 0, 80], duration: 2500 }, { rgbw: [0, 40, 80], duration: 2500 }] },
        { colors: [{ rgbw: [0, 0, 100], duration: 3000 }, { rgbw: [0, 50, 80], duration: 3000 }, { rgbw: [20, 0, 90], duration: 3000 }] },
        { colors: [{ rgbw: [0, 70, 110], duration: 3000 }, { rgbw: [10, 0, 100], duration: 3000 }, { rgbw: [0, 30, 90], duration: 3000 }, { rgbw: [15, 0, 75], duration: 3000 }] },
      ],
      head: [
        { moves: [{ axis: [178, 72], duration: 3500, easing: easeInOutSine }, { axis: [338, 60], duration: 3500, easing: easeInOutSine }], colors: [112, 48], ledRing: [72, 84], gobo: 0 },
        { moves: [{ axis: [135, 76], duration: 4000, easing: easeInOutSine }, { axis: [378, 62], duration: 4000, easing: easeInOutSine }, { axis: [248, 80], duration: 4000, easing: easeInOutSine }], colors: [48, 96], ledRing: [62, 76], gobo: 0 },
        { moves: [{ axis: [158, 70], duration: 4500, easing: easeInOutSine }, { axis: [315, 58], duration: 4500, easing: easeInOutSine }, { axis: [228, 76], duration: 4500, easing: easeInOutSine }, { axis: [270, 64], duration: 4500, easing: easeInOutSine }], colors: [112, 96], ledRing: [76, 66], gobo: 0 },
      ],
      mini: [
        { ledRing: [50, 62], gobo: true, beam: 110, laser: 35, starfield: true, moves: [{ axis: [290, 60], duration: 3500 }, { axis: [440, 75], duration: 3500 }, { axis: [590, 60], duration: 3500 }, { axis: [440, 50], duration: 3500 }] },
        { ledRing: [40, 52], gobo: true, beam: 98, laser: 30, starfield: true, moves: [{ axis: [250, 60], duration: 4000 }, { axis: [400, 75], duration: 4000 }, { axis: [550, 60], duration: 4000 }, { axis: [400, 50], duration: 4000 }] },
        { ledRing: [60, 70], gobo: false, beam: 88, laser: 26, starfield: true, moves: [{ axis: [320, 60], duration: 4500 }, { axis: [470, 75], duration: 4500 }, { axis: [620, 60], duration: 4500 }, { axis: [470, 50], duration: 4500 }] },
      ],
    },
  },

  'hiphop+dark': {
    luminous: { head: 145, mini: 185, par: 118 },
    strobing: { threshold: 0.62, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.6 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 0, 100], duration: 3000 }, { rgbw: [5, 0, 10], duration: 2000 }, { rgbw: [60, 0, 70], duration: 3000 }] },
        { colors: [{ rgbw: [60, 0, 80], duration: 3500 }, { rgbw: [8, 0, 8], duration: 2000 }, { rgbw: [30, 0, 90], duration: 3500 }] },
        { colors: [{ rgbw: [50, 0, 110], duration: 3000 }, { rgbw: [0, 0, 10], duration: 1500 }, { rgbw: [70, 0, 60], duration: 3000 }, { rgbw: [5, 0, 5], duration: 1500 }] },
      ],
      head: [
        { moves: [{ axis: [158, 62], duration: 3500, easing: easeInExpo }, { axis: [362, 78], duration: 3500, easing: easeInExpo }], colors: [112, 32], ledRing: [80, 96], gobo: 32 },
        { moves: [{ axis: [90, 58], duration: 4000, easing: easeInExpo }, { axis: [418, 80], duration: 4000, easing: easeInExpo }, { axis: [235, 66], duration: 4000, easing: easeInExpo }], colors: [32, 112], ledRing: [70, 86], gobo: 16 },
        { moves: [{ axis: [105, 56], duration: 4500, easing: easeInExpo }, { axis: [422, 82], duration: 4500, easing: easeInExpo }, { axis: [238, 64], duration: 4500, easing: easeInExpo }, { axis: [118, 60], duration: 4500, easing: easeInExpo }], colors: [64, 112], ledRing: [88, 76], gobo: 48 },
      ],
      mini: [
        { ledRing: [60, 74], gobo: true, beam: 120, laser: 38, starfield: true, moves: [{ axis: [270, 35], duration: 3500 }, { axis: [420, 60], duration: 3500 }, { axis: [570, 35], duration: 3500 }, { axis: [420, 15], duration: 3500 }] },
        { ledRing: [50, 64], gobo: true, beam: 108, laser: 32, starfield: true, moves: [{ axis: [225, 35], duration: 4000 }, { axis: [375, 60], duration: 4000 }, { axis: [525, 35], duration: 4000 }, { axis: [375, 15], duration: 4000 }] },
        { ledRing: [70, 82], gobo: false, beam: 96, laser: 28, starfield: true, moves: [{ axis: [315, 35], duration: 4500 }, { axis: [465, 60], duration: 4500 }, { axis: [615, 35], duration: 4500 }, { axis: [465, 15], duration: 4500 }] },
      ],
    },
  },

  'ambient+dark': {
    luminous: { head: 35, mini: 50, par: 22 },
    strobing: { threshold: 0.95, paceWeight: 0.06, energyWeight: 0.94, danceExp: 2.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 5, 20], duration: 10000 }, { rgbw: [0, 2, 10], duration: 10000 }, { rgbw: [2, 0, 15], duration: 10000 }] },
        { colors: [{ rgbw: [0, 8, 18], duration: 12000 }, { rgbw: [3, 0, 12], duration: 12000 }, { rgbw: [0, 4, 8], duration: 12000 }] },
        { colors: [{ rgbw: [0, 6, 22], duration: 12000 }, { rgbw: [4, 0, 16], duration: 12000 }, { rgbw: [0, 10, 14], duration: 12000 }, { rgbw: [2, 2, 10], duration: 12000 }] },
      ],
      head: [
        { moves: [{ axis: [240, 76], duration: 18000, easing: easeInOutSine }, { axis: [268, 82], duration: 18000, easing: easeInOutSine }], colors: [112, 48], ledRing: [0, 8], gobo: 0 },
        { moves: [{ axis: [218, 80], duration: 22000, easing: easeInOutSine }, { axis: [295, 70], duration: 22000, easing: easeInOutSine }, { axis: [255, 84], duration: 22000, easing: easeInOutSine }], colors: [48, 112], ledRing: [0, 6], gobo: 0 },
        { moves: [{ axis: [205, 78], duration: 20000, easing: easeInOutSine }, { axis: [258, 68], duration: 20000, easing: easeInOutSine }, { axis: [228, 82], duration: 20000, easing: easeInOutSine }, { axis: [278, 74], duration: 20000, easing: easeInOutSine }], colors: [112, 48], ledRing: [0, 10], gobo: 0 },
      ],
      mini: [
        { ledRing: [0, 6], gobo: true, beam: 15, laser: 8, starfield: true, moves: [{ axis: [310, 60], duration: 12000 }, { axis: [460, 75], duration: 12000 }, { axis: [610, 60], duration: 12000 }, { axis: [460, 50], duration: 12000 }] },
        { ledRing: [0, 4], gobo: true, beam: 10, laser: 6, starfield: true, moves: [{ axis: [270, 60], duration: 16000 }, { axis: [420, 75], duration: 16000 }, { axis: [570, 60], duration: 16000 }, { axis: [420, 50], duration: 16000 }] },
        { ledRing: [0, 8], gobo: false, beam: 8, laser: 5, starfield: true, moves: [{ axis: [340, 60], duration: 20000 }, { axis: [490, 75], duration: 20000 }, { axis: [640, 60], duration: 20000 }, { axis: [490, 50], duration: 20000 }] },
      ],
    },
  },

  'classical+dark': {
    luminous: { head: 105, mini: 140, par: 88 },
    strobing: { threshold: 0.88, paceWeight: 0.08, energyWeight: 0.92, danceExp: 2.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 110, 80, 20], duration: 6000 }, { rgbw: [60, 80, 120, 10], duration: 6000 }, { rgbw: [100, 90, 70, 15], duration: 6000 }] },
        { colors: [{ rgbw: [80, 70, 100, 15], duration: 7000 }, { rgbw: [110, 100, 80, 20], duration: 7000 }, { rgbw: [50, 65, 105, 8], duration: 7000 }] },
        { colors: [{ rgbw: [130, 115, 90, 25], duration: 7000 }, { rgbw: [55, 72, 115, 10], duration: 7000 }, { rgbw: [105, 95, 78, 18], duration: 7000 }, { rgbw: [45, 60, 100, 6], duration: 7000 }] },
      ],
      head: [
        { moves: [{ axis: [236, 72], duration: 7000, easing: easeInOutSine }, { axis: [274, 82], duration: 7000, easing: easeInOutSine }], colors: [0, 48], ledRing: [60, 72], gobo: 0 },
        { moves: [{ axis: [212, 76], duration: 8000, easing: easeInOutSine }, { axis: [298, 66], duration: 8000, easing: easeInOutSine }, { axis: [255, 84], duration: 8000, easing: easeInOutSine }], colors: [48, 0], ledRing: [52, 64], gobo: 0 },
        { moves: [{ axis: [228, 74], duration: 9000, easing: easeInOutSine }, { axis: [266, 80], duration: 9000, easing: easeInOutSine }, { axis: [240, 70], duration: 9000, easing: easeInOutSine }, { axis: [280, 78], duration: 9000, easing: easeInOutSine }], colors: [0, 112], ledRing: [56, 68], gobo: 0 },
      ],
      mini: [
        { ledRing: [30, 42], gobo: true, beam: 65, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 7000 }, { axis: [405, 75], duration: 7000 }, { axis: [555, 60], duration: 7000 }, { axis: [405, 50], duration: 7000 }] },
        { ledRing: [20, 32], gobo: true, beam: 55, laser: 16, starfield: true, moves: [{ axis: [240, 60], duration: 8000 }, { axis: [390, 75], duration: 8000 }, { axis: [540, 60], duration: 8000 }, { axis: [390, 50], duration: 8000 }] },
        { ledRing: [40, 52], gobo: false, beam: 45, laser: 13, starfield: true, moves: [{ axis: [270, 60], duration: 9000 }, { axis: [420, 75], duration: 9000 }, { axis: [570, 60], duration: 9000 }, { axis: [420, 50], duration: 9000 }] },
      ],
    },
  },

  'country+dark': {
    luminous: { head: 130, mini: 172, par: 108 },
    strobing: { threshold: 0.7, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [140, 80, 10], duration: 3500 }, { rgbw: [60, 30, 5], duration: 3500 }, { rgbw: [100, 55, 8], duration: 3500 }] },
        { colors: [{ rgbw: [120, 65, 8], duration: 4000 }, { rgbw: [50, 25, 4], duration: 4000 }, { rgbw: [90, 45, 6], duration: 4000 }] },
        { colors: [{ rgbw: [150, 85, 12], duration: 4500 }, { rgbw: [45, 20, 3], duration: 4500 }, { rgbw: [110, 60, 8], duration: 4500 }, { rgbw: [40, 18, 3], duration: 4500 }] },
      ],
      head: [
        { moves: [{ axis: [198, 74], duration: 4500, easing: easeInOutSine }, { axis: [318, 62], duration: 4500, easing: easeInOutSine }], colors: [64, 80], ledRing: [56, 68], gobo: 16 },
        { moves: [{ axis: [158, 78], duration: 5000, easing: easeInOutSine }, { axis: [342, 64], duration: 5000, easing: easeInOutSine }, { axis: [248, 80], duration: 5000, easing: easeInOutSine }], colors: [80, 64], ledRing: [48, 60], gobo: 32 },
        { moves: [{ axis: [178, 72], duration: 6000, easing: easeInOutSine }, { axis: [305, 60], duration: 6000, easing: easeInOutSine }, { axis: [238, 76], duration: 6000, easing: easeInOutSine }, { axis: [285, 66], duration: 6000, easing: easeInOutSine }], colors: [64, 80], ledRing: [60, 50], gobo: 16 },
      ],
      mini: [
        { ledRing: [36, 48], gobo: true, beam: 72, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 4500 }, { axis: [405, 75], duration: 4500 }, { axis: [555, 60], duration: 4500 }, { axis: [405, 50], duration: 4500 }] },
        { ledRing: [26, 38], gobo: true, beam: 62, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 5000 }, { axis: [360, 75], duration: 5000 }, { axis: [510, 60], duration: 5000 }, { axis: [360, 50], duration: 5000 }] },
        { ledRing: [46, 56], gobo: false, beam: 52, laser: 13, starfield: true, moves: [{ axis: [300, 60], duration: 6000 }, { axis: [450, 75], duration: 6000 }, { axis: [600, 60], duration: 6000 }, { axis: [450, 50], duration: 6000 }] },
      ],
    },
  },

  'latin+dark': {
    luminous: { head: 165, mini: 205, par: 138 },
    strobing: { threshold: 0.6, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.6 },
    variants: {
      par: [
        { colors: [{ rgbw: [160, 0, 0], duration: 2500 }, { rgbw: [100, 40, 0], duration: 2500 }, { rgbw: [120, 0, 10], duration: 2500 }] },
        { colors: [{ rgbw: [140, 0, 0], duration: 3000 }, { rgbw: [80, 30, 0], duration: 3000 }, { rgbw: [110, 0, 20], duration: 3000 }] },
        { colors: [{ rgbw: [170, 0, 10], duration: 3000 }, { rgbw: [90, 40, 0], duration: 3000 }, { rgbw: [130, 0, 15], duration: 3000 }, { rgbw: [70, 25, 0], duration: 3000 }] },
      ],
      head: [
        { moves: [{ axis: [172, 70], duration: 3000, easing: easeInOutSine }, { axis: [338, 58], duration: 3000, easing: easeInOutSine }], colors: [80, 64], ledRing: [88, 102], gobo: 64 },
        { moves: [{ axis: [128, 66], duration: 3500, easing: easeInOutSine }, { axis: [378, 78], duration: 3500, easing: easeInOutSine }, { axis: [245, 92], duration: 3500, easing: easeInOutSine }], colors: [64, 80], ledRing: [78, 94], gobo: 48 },
        { moves: [{ axis: [155, 68], duration: 4000, easing: easeInOutSine }, { axis: [322, 60], duration: 4000, easing: easeInOutSine }, { axis: [242, 76], duration: 4000, easing: easeInOutSine }, { axis: [285, 64], duration: 4000, easing: easeInOutSine }], colors: [80, 16], ledRing: [92, 80], gobo: 32 },
      ],
      mini: [
        { ledRing: [68, 82], gobo: true, beam: 115, laser: 36, starfield: true, moves: [{ axis: [255, 35], duration: 3000 }, { axis: [405, 60], duration: 3000 }, { axis: [555, 35], duration: 3000 }, { axis: [405, 15], duration: 3000 }] },
        { ledRing: [58, 72], gobo: true, beam: 102, laser: 30, starfield: true, moves: [{ axis: [210, 35], duration: 3500 }, { axis: [360, 60], duration: 3500 }, { axis: [510, 35], duration: 3500 }, { axis: [360, 15], duration: 3500 }] },
        { ledRing: [78, 90], gobo: false, beam: 90, laser: 26, starfield: true, moves: [{ axis: [300, 35], duration: 4000 }, { axis: [450, 60], duration: 4000 }, { axis: [600, 35], duration: 4000 }, { axis: [450, 15], duration: 4000 }] },
      ],
    },
  },

  'reggae+dark': {
    luminous: { head: 128, mini: 168, par: 108 },
    strobing: { threshold: 0.72, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 60, 40], duration: 3500 }, { rgbw: [0, 80, 50], duration: 3500 }, { rgbw: [0, 45, 35], duration: 3500 }] },
        { colors: [{ rgbw: [0, 50, 60], duration: 4000 }, { rgbw: [0, 70, 45], duration: 4000 }, { rgbw: [0, 40, 50], duration: 4000 }] },
        { colors: [{ rgbw: [0, 65, 45], duration: 4000 }, { rgbw: [0, 85, 55], duration: 4000 }, { rgbw: [0, 42, 38], duration: 4000 }, { rgbw: [0, 55, 48], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [192, 76], duration: 4000, easing: easeInOutSine }, { axis: [322, 62], duration: 4000, easing: easeInOutSine }], colors: [32, 64], ledRing: [54, 66], gobo: 32 },
        { moves: [{ axis: [150, 80], duration: 4500, easing: easeInOutSine }, { axis: [348, 66], duration: 4500, easing: easeInOutSine }, { axis: [248, 82], duration: 4500, easing: easeInOutSine }], colors: [64, 32], ledRing: [46, 58], gobo: 16 },
        { moves: [{ axis: [170, 74], duration: 5500, easing: easeInOutSine }, { axis: [312, 60], duration: 5500, easing: easeInOutSine }, { axis: [232, 78], duration: 5500, easing: easeInOutSine }, { axis: [278, 66], duration: 5500, easing: easeInOutSine }], colors: [32, 80], ledRing: [58, 48], gobo: 32 },
      ],
      mini: [
        { ledRing: [34, 46], gobo: true, beam: 72, laser: 20, starfield: true, moves: [{ axis: [255, 60], duration: 4000 }, { axis: [405, 75], duration: 4000 }, { axis: [555, 60], duration: 4000 }, { axis: [405, 50], duration: 4000 }] },
        { ledRing: [24, 36], gobo: true, beam: 62, laser: 16, starfield: true, moves: [{ axis: [210, 60], duration: 4500 }, { axis: [360, 75], duration: 4500 }, { axis: [510, 60], duration: 4500 }, { axis: [360, 50], duration: 4500 }] },
        { ledRing: [44, 54], gobo: false, beam: 52, laser: 13, starfield: true, moves: [{ axis: [300, 60], duration: 5500 }, { axis: [450, 75], duration: 5500 }, { axis: [600, 60], duration: 5500 }, { axis: [450, 50], duration: 5500 }] },
      ],
    },
  },

  'blues+dark': {
    luminous: { head: 95, mini: 130, par: 78 },
    strobing: { threshold: 0.82, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 10, 80], duration: 4500 }, { rgbw: [0, 0, 40], duration: 4500 }, { rgbw: [0, 5, 60], duration: 4500 }] },
        { colors: [{ rgbw: [0, 5, 70], duration: 5500 }, { rgbw: [5, 0, 30], duration: 5500 }, { rgbw: [0, 2, 50], duration: 5500 }] },
        { colors: [{ rgbw: [0, 12, 90], duration: 6000 }, { rgbw: [3, 0, 40], duration: 6000 }, { rgbw: [0, 6, 65], duration: 6000 }, { rgbw: [2, 0, 32], duration: 6000 }] },
      ],
      head: [
        { moves: [{ axis: [208, 72], duration: 5000, easing: easeInOutSine }, { axis: [295, 84], duration: 5000, easing: easeInOutSine }], colors: [112, 48], ledRing: [50, 62], gobo: 0 },
        { moves: [{ axis: [155, 68], duration: 6000, easing: easeInOutSine }, { axis: [375, 84], duration: 6000, easing: easeInOutSine }, { axis: [238, 100], duration: 6000, easing: easeInOutSine }], colors: [48, 112], ledRing: [42, 54], gobo: 16 },
        { moves: [{ axis: [192, 70], duration: 7000, easing: easeInOutSine }, { axis: [258, 86], duration: 7000, easing: easeInOutSine }, { axis: [218, 66], duration: 7000, easing: easeInOutSine }], colors: [112, 96], ledRing: [46, 58], gobo: 0 },
      ],
      mini: [
        { ledRing: [28, 40], gobo: true, beam: 58, laser: 16, starfield: true, moves: [{ axis: [255, 60], duration: 5000 }, { axis: [405, 75], duration: 5000 }, { axis: [555, 60], duration: 5000 }, { axis: [405, 50], duration: 5000 }] },
        { ledRing: [18, 30], gobo: true, beam: 48, laser: 12, starfield: true, moves: [{ axis: [210, 60], duration: 6000 }, { axis: [360, 75], duration: 6000 }, { axis: [510, 60], duration: 6000 }, { axis: [360, 50], duration: 6000 }] },
        { ledRing: [38, 50], gobo: false, beam: 38, laser: 10, starfield: true, moves: [{ axis: [300, 60], duration: 7000 }, { axis: [450, 75], duration: 7000 }, { axis: [600, 60], duration: 7000 }, { axis: [450, 50], duration: 7000 }] },
      ],
    },
  },

  'dance+dark': {
    luminous: { head: 155, mini: 198, par: 130 },
    strobing: { threshold: 0.58, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 20, 120], duration: 2500 }, { rgbw: [50, 0, 100], duration: 2500 }, { rgbw: [0, 10, 90], duration: 2500 }] },
        { colors: [{ rgbw: [40, 0, 110], duration: 3000 }, { rgbw: [0, 15, 100], duration: 3000 }, { rgbw: [30, 0, 85], duration: 3000 }] },
        { colors: [{ rgbw: [0, 25, 130], duration: 2500 }, { rgbw: [55, 0, 105], duration: 2500 }, { rgbw: [0, 12, 95], duration: 2500 }, { rgbw: [42, 0, 80], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [175, 68], duration: 2500, easing: easeInOutSine }, { axis: [338, 56], duration: 2500, easing: easeInOutSine }], colors: [112, 48], ledRing: [78, 92], gobo: 0 },
        { moves: [{ axis: [130, 72], duration: 3000, easing: easeInOutSine }, { axis: [368, 60], duration: 3000, easing: easeInOutSine }, { axis: [245, 80], duration: 3000, easing: easeInOutSine }], colors: [48, 96], ledRing: [68, 84], gobo: 0 },
        { moves: [{ axis: [155, 66], duration: 3500, easing: easeInOutSine }, { axis: [318, 56], duration: 3500, easing: easeInOutSine }, { axis: [232, 76], duration: 3500, easing: easeInOutSine }, { axis: [268, 62], duration: 3500, easing: easeInOutSine }], colors: [112, 96], ledRing: [82, 70], gobo: 0 },
      ],
      mini: [
        { ledRing: [58, 72], gobo: true, beam: 108, laser: 34, starfield: true, moves: [{ axis: [270, 35], duration: 2500 }, { axis: [420, 60], duration: 2500 }, { axis: [570, 35], duration: 2500 }, { axis: [420, 15], duration: 2500 }] },
        { ledRing: [48, 62], gobo: true, beam: 96, laser: 28, starfield: true, moves: [{ axis: [225, 35], duration: 3000 }, { axis: [375, 60], duration: 3000 }, { axis: [525, 35], duration: 3000 }, { axis: [375, 15], duration: 3000 }] },
        { ledRing: [68, 80], gobo: false, beam: 85, laser: 24, starfield: true, moves: [{ axis: [315, 35], duration: 3500 }, { axis: [465, 60], duration: 3500 }, { axis: [615, 35], duration: 3500 }, { axis: [465, 15], duration: 3500 }] },
      ],
    },
  },

  'disco+dark': {
    luminous: { head: 125, mini: 165, par: 104 },
    strobing: { threshold: 0.7, paceWeight: 0.16, energyWeight: 0.84, danceExp: 1.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 100, 0], duration: 3500 }, { rgbw: [80, 0, 80], duration: 3500 }, { rgbw: [100, 80, 10], duration: 3500 }] },
        { colors: [{ rgbw: [100, 80, 20], duration: 4000 }, { rgbw: [60, 0, 90], duration: 4000 }, { rgbw: [90, 60, 5], duration: 4000 }] },
        { colors: [{ rgbw: [130, 110, 15], duration: 4000 }, { rgbw: [70, 0, 100], duration: 4000 }, { rgbw: [105, 85, 10], duration: 4000 }, { rgbw: [55, 0, 75], duration: 4000 }] },
      ],
      head: [
        { moves: [{ axis: [158, 72], duration: 4000, easing: easeInOutSine }, { axis: [355, 62], duration: 4000, easing: easeInOutSine }], colors: [64, 80], ledRing: [62, 76], gobo: 32 },
        { moves: [{ axis: [115, 68], duration: 4500, easing: easeInOutSine }, { axis: [362, 76], duration: 4500, easing: easeInOutSine }, { axis: [245, 84], duration: 4500, easing: easeInOutSine }, { axis: [130, 64], duration: 4500, easing: easeInOutSine }], colors: [80, 96], ledRing: [52, 68], gobo: 48 },
        { moves: [{ axis: [242, 70], duration: 5000, easing: easeInOutSine }, { axis: [122, 60], duration: 5000, easing: easeInOutSine }, { axis: [378, 80], duration: 5000, easing: easeInOutSine }], colors: [96, 64], ledRing: [66, 80], gobo: 64 },
      ],
      mini: [
        { ledRing: [44, 58], gobo: true, beam: 82, laser: 24, starfield: true, moves: [{ axis: [270, 35], duration: 4000 }, { axis: [420, 60], duration: 4000 }, { axis: [570, 35], duration: 4000 }, { axis: [420, 15], duration: 4000 }] },
        { ledRing: [34, 48], gobo: true, beam: 72, laser: 20, starfield: true, moves: [{ axis: [225, 35], duration: 4500 }, { axis: [375, 60], duration: 4500 }, { axis: [525, 35], duration: 4500 }, { axis: [375, 15], duration: 4500 }] },
        { ledRing: [54, 66], gobo: false, beam: 62, laser: 17, starfield: true, moves: [{ axis: [315, 35], duration: 5000 }, { axis: [465, 60], duration: 5000 }, { axis: [615, 35], duration: 5000 }, { axis: [465, 15], duration: 5000 }] },
      ],
    },
  },

  // ── +upbeat entries ──────────────────────────────────────────────────────

  'rock+upbeat': {
    luminous: { head: 240, mini: 255, par: 195 },
    strobing: { threshold: 0.2, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 0], duration: 250 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [220, 0, 0], duration: 250 }, { rgbw: [100, 0, 0], duration: 100 }] },
        { colors: [{ rgbw: [255, 80, 0], duration: 300 }, { rgbw: [255, 0, 0], duration: 200 }, { rgbw: [200, 30, 0], duration: 200 }, { rgbw: [50, 0, 0], duration: 100 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 120 }, { rgbw: [255, 0, 0], duration: 250 }, { rgbw: [180, 0, 0], duration: 200 }, { rgbw: [80, 0, 0], duration: 130 }] },
      ],
      head: [
        { moves: [{ axis: [80, 56], duration: 450, easing: easeInExpo }, { axis: [440, 72], duration: 450, easing: easeInExpo }], colors: [16, 0], ledRing: [148, 130], gobo: 32 },
        { moves: [{ axis: [210, 58], duration: 450, easing: easeInExpo }, { axis: [120, 76], duration: 450, easing: easeInExpo }, { axis: [385, 90], duration: 450, easing: easeInExpo }, { axis: [210, 62], duration: 450, easing: easeInExpo }], colors: [16, 80], ledRing: [130, 148], gobo: 16 },
        { moves: [{ axis: [38, 64], duration: 450, easing: easeInExpo }, { axis: [462, 78], duration: 450, easing: easeInExpo }, { axis: [250, 56], duration: 450, easing: easeInExpo }, { axis: [78, 66], duration: 450, easing: easeInExpo }], colors: [0, 16], ledRing: [108, 96], gobo: 48 },
      ],
      mini: [
        { ledRing: [175, 195], gobo: true, beam: 205, laser: 58, moves: [{ axis: [270, 35], duration: 450 }, { axis: [420, 60], duration: 450 }, { axis: [570, 35], duration: 450 }, { axis: [420, 15], duration: 450 }] },
        { ledRing: [155, 175], gobo: true, beam: 225, laser: 72, moves: [{ axis: [225, 35], duration: 450 }, { axis: [375, 60], duration: 450 }, { axis: [525, 35], duration: 450 }, { axis: [375, 15], duration: 450 }] },
        { ledRing: [205, 225], gobo: false, beam: 195, laser: 62, moves: [{ axis: [315, 35], duration: 450 }, { axis: [465, 60], duration: 450 }, { axis: [615, 35], duration: 450 }, { axis: [465, 15], duration: 450 }] },
      ],
    },
  },

  'pop+upbeat': {
    luminous: { head: 230, mini: 255, par: 200 },
    strobing: { threshold: 0.22, paceWeight: 0.3, energyWeight: 0.7, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 200], duration: 350 }, { rgbw: [255, 220, 0], duration: 350 }, { rgbw: [0, 200, 255], duration: 350 }, { rgbw: [200, 80, 255], duration: 350 }] },
        { colors: [{ rgbw: [255, 100, 200], duration: 400 }, { rgbw: [255, 220, 0], duration: 400 }, { rgbw: [100, 200, 255], duration: 400 }, { rgbw: [200, 100, 255], duration: 400 }] },
        { colors: [{ rgbw: [255, 180, 0], duration: 350 }, { rgbw: [0, 255, 200], duration: 350 }, { rgbw: [255, 0, 180], duration: 350 }, { rgbw: [255, 255, 100], duration: 350 }] },
      ],
      head: [
        { moves: [{ axis: [168, 76], duration: 750, easing: easeInOutSine }, { axis: [342, 105], duration: 750, easing: easeInOutSine }], colors: [96, 64], ledRing: [200, 215], gobo: 80 },
        { moves: [{ axis: [252, 65], duration: 750, easing: easeInOutSine }, { axis: [122, 100], duration: 750, easing: easeInOutSine }, { axis: [378, 82], duration: 750, easing: easeInOutSine }], colors: [64, 96], ledRing: [215, 228], gobo: 64 },
        { moves: [{ axis: [208, 84], duration: 800, easing: easeInOutSine }, { axis: [292, 70], duration: 800, easing: easeInOutSine }, { axis: [168, 108], duration: 800, easing: easeInOutSine }], colors: [0, 64], ledRing: [190, 205], gobo: 96 },
      ],
      mini: [
        { ledRing: [50, 40], gobo: true, beam: 185, laser: 68, moves: [{ axis: [255, 35], duration: 750 }, { axis: [405, 60], duration: 750 }, { axis: [555, 35], duration: 750 }, { axis: [405, 15], duration: 750 }] },
        { ledRing: [60, 50], gobo: true, beam: 200, laser: 72, moves: [{ axis: [210, 35], duration: 750 }, { axis: [360, 60], duration: 750 }, { axis: [510, 35], duration: 750 }, { axis: [360, 15], duration: 750 }] },
        { ledRing: [35, 25], gobo: true, beam: 172, laser: 62, moves: [{ axis: [300, 35], duration: 750 }, { axis: [450, 60], duration: 750 }, { axis: [600, 35], duration: 750 }, { axis: [450, 15], duration: 750 }] },
      ],
    },
  },

  'electronic+upbeat': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.18, paceWeight: 0.33, energyWeight: 0.67, danceExp: 0.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 255, 255], duration: 250 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [0, 200, 255], duration: 250 }, { rgbw: [255, 0, 255], duration: 200 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 120 }, { rgbw: [0, 255, 200], duration: 250 }, { rgbw: [0, 150, 255], duration: 250 }, { rgbw: [200, 255, 0], duration: 180 }] },
        { colors: [{ rgbw: [200, 0, 255], duration: 200 }, { rgbw: [0, 255, 255], duration: 250 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [0, 200, 255], duration: 250 }] },
      ],
      head: [
        { moves: [{ axis: [122, 60], duration: 500, easing: easeInSine }, { axis: [382, 100], duration: 500, easing: easeInSine }, { axis: [210, 56], duration: 500, easing: easeInSine }], colors: [112, 48], ledRing: [228, 248], gobo: 160 },
        { moves: [{ axis: [252, 80], duration: 500, easing: easeInSine }, { axis: [82, 56], duration: 500, easing: easeInSine }, { axis: [428, 110], duration: 500, easing: easeInSine }], colors: [48, 96], ledRing: [242, 238], gobo: 180 },
        { moves: [{ axis: [168, 56], duration: 500, easing: easeInSine }, { axis: [342, 118], duration: 500, easing: easeInSine }, { axis: [82, 68], duration: 500, easing: easeInSine }], colors: [96, 112], ledRing: [196, 222], gobo: 140 },
      ],
      mini: [
        { ledRing: [205, 218], gobo: true, beam: 210, laser: 68, moves: [{ axis: [290, 35], duration: 520 }, { axis: [440, 60], duration: 520 }, { axis: [590, 35], duration: 520 }, { axis: [440, 15], duration: 520 }] },
        { ledRing: [222, 238], gobo: true, beam: 228, laser: 78, moves: [{ axis: [248, 35], duration: 500 }, { axis: [398, 60], duration: 500 }, { axis: [548, 35], duration: 500 }, { axis: [398, 15], duration: 500 }] },
        { ledRing: [192, 212], gobo: false, beam: 192, laser: 62, moves: [{ axis: [320, 35], duration: 540 }, { axis: [470, 60], duration: 540 }, { axis: [620, 35], duration: 540 }, { axis: [470, 15], duration: 540 }] },
      ],
    },
  },

  'hiphop+upbeat': {
    luminous: { head: 240, mini: 255, par: 200 },
    strobing: { threshold: 0.2, paceWeight: 0.35, energyWeight: 0.65, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [150, 0, 255], duration: 300 }, { rgbw: [0, 255, 80], duration: 300 }, { rgbw: [255, 220, 0], duration: 300 }] },
        { colors: [{ rgbw: [100, 0, 255], duration: 300 }, { rgbw: [0, 200, 50], duration: 200 }, { rgbw: [30, 0, 60], duration: 100 }] },
        { colors: [{ rgbw: [200, 0, 255], duration: 250 }, { rgbw: [0, 255, 100], duration: 250 }, { rgbw: [255, 180, 0], duration: 250 }, { rgbw: [20, 0, 50], duration: 100 }] },
      ],
      head: [
        { moves: [{ axis: [148, 60], duration: 420, easing: easeInExpo }, { axis: [362, 80], duration: 420, easing: easeInExpo }], colors: [112, 32], ledRing: [214, 200], gobo: 144 },
        { moves: [{ axis: [82, 56], duration: 420, easing: easeInExpo }, { axis: [428, 90], duration: 420, easing: easeInExpo }, { axis: [232, 66], duration: 420, easing: easeInExpo }, { axis: [108, 58], duration: 420, easing: easeInExpo }], colors: [16, 112], ledRing: [198, 218], gobo: 160 },
        { moves: [{ axis: [272, 56], duration: 420, easing: easeInExpo }, { axis: [168, 100], duration: 420, easing: easeInExpo }, { axis: [428, 66], duration: 420, easing: easeInExpo }, { axis: [278, 60], duration: 420, easing: easeInExpo }], colors: [64, 112], ledRing: [222, 192], gobo: 48 },
      ],
      mini: [
        { ledRing: [182, 175], gobo: true, beam: 205, laser: 48, moves: [{ axis: [270, 35], duration: 420 }, { axis: [420, 60], duration: 420 }, { axis: [570, 35], duration: 420 }, { axis: [420, 15], duration: 420 }] },
        { ledRing: [202, 215], gobo: true, beam: 215, laser: 62, moves: [{ axis: [225, 35], duration: 420 }, { axis: [375, 60], duration: 420 }, { axis: [525, 35], duration: 420 }, { axis: [375, 15], duration: 420 }] },
        { ledRing: [162, 182], gobo: false, beam: 185, laser: 52, moves: [{ axis: [315, 35], duration: 420 }, { axis: [465, 60], duration: 420 }, { axis: [615, 35], duration: 420 }, { axis: [465, 15], duration: 420 }] },
      ],
    },
  },

  'jazz+upbeat': {
    luminous: { head: 215, mini: 248, par: 185 },
    strobing: { threshold: 0.28, paceWeight: 0.28, energyWeight: 0.72, danceExp: 1.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 140, 0], duration: 500 }, { rgbw: [255, 200, 30], duration: 500 }, { rgbw: [200, 80, 0], duration: 500 }] },
        { colors: [{ rgbw: [220, 100, 0], duration: 500 }, { rgbw: [255, 160, 30], duration: 500 }, { rgbw: [180, 70, 0], duration: 500 }, { rgbw: [255, 220, 60], duration: 500 }] },
        { colors: [{ rgbw: [255, 180, 40], duration: 600 }, { rgbw: [200, 90, 0], duration: 600 }, { rgbw: [255, 150, 20], duration: 600 }] },
      ],
      head: [
        { moves: [{ axis: [208, 74], duration: 900, easing: easeInOutSine }, { axis: [298, 62], duration: 900, easing: easeInOutSine }], colors: [80, 64], ledRing: [130, 148], gobo: 16 },
        { moves: [{ axis: [165, 72], duration: 900, easing: easeInOutSine }, { axis: [345, 80], duration: 900, easing: easeInOutSine }, { axis: [250, 62], duration: 900, easing: easeInOutSine }], colors: [64, 80], ledRing: [148, 130], gobo: 0 },
        { moves: [{ axis: [185, 80], duration: 1000, easing: easeInOutSine }, { axis: [272, 58], duration: 1000, easing: easeInOutSine }, { axis: [148, 74], duration: 1000, easing: easeInOutSine }, { axis: [318, 88], duration: 1000, easing: easeInOutSine }], colors: [80, 16], ledRing: [138, 122], gobo: 16 },
      ],
      mini: [
        { ledRing: [95, 110], gobo: true, beam: 148, laser: 55, moves: [{ axis: [255, 35], duration: 900 }, { axis: [405, 60], duration: 900 }, { axis: [555, 35], duration: 900 }, { axis: [405, 15], duration: 900 }] },
        { ledRing: [125, 140], gobo: true, beam: 128, laser: 48, moves: [{ axis: [210, 35], duration: 900 }, { axis: [360, 60], duration: 900 }, { axis: [510, 35], duration: 900 }, { axis: [360, 15], duration: 900 }] },
        { ledRing: [68, 82], gobo: false, beam: 118, laser: 42, moves: [{ axis: [300, 35], duration: 900 }, { axis: [450, 60], duration: 900 }, { axis: [600, 35], duration: 900 }, { axis: [450, 15], duration: 900 }] },
      ],
    },
  },

  'rnb+upbeat': {
    luminous: { head: 220, mini: 252, par: 190 },
    strobing: { threshold: 0.25, paceWeight: 0.28, energyWeight: 0.72, danceExp: 1.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 100, 50], duration: 500 }, { rgbw: [255, 180, 0], duration: 500 }, { rgbw: [220, 60, 80], duration: 500 }] },
        { colors: [{ rgbw: [255, 80, 60], duration: 500 }, { rgbw: [220, 150, 20], duration: 500 }, { rgbw: [255, 50, 100], duration: 500 }, { rgbw: [200, 120, 40], duration: 500 }] },
        { colors: [{ rgbw: [240, 90, 70], duration: 600 }, { rgbw: [255, 170, 10], duration: 600 }, { rgbw: [210, 60, 90], duration: 600 }] },
      ],
      head: [
        { moves: [{ axis: [182, 70], duration: 900, easing: easeInOutSine }, { axis: [332, 80], duration: 900, easing: easeInOutSine }], colors: [80, 96], ledRing: [160, 140], gobo: 32 },
        { moves: [{ axis: [125, 68], duration: 900, easing: easeInOutSine }, { axis: [362, 84], duration: 900, easing: easeInOutSine }, { axis: [222, 106], duration: 900, easing: easeInOutSine }], colors: [64, 80], ledRing: [140, 160], gobo: 48 },
        { moves: [{ axis: [88, 60], duration: 1000, easing: easeInOutSine }, { axis: [402, 80], duration: 1000, easing: easeInOutSine }, { axis: [248, 66], duration: 1000, easing: easeInOutSine }, { axis: [112, 62], duration: 1000, easing: easeInOutSine }], colors: [96, 16], ledRing: [170, 180], gobo: 16 },
      ],
      mini: [
        { ledRing: [82, 64], gobo: true, beam: 168, laser: 58, moves: [{ axis: [255, 35], duration: 900 }, { axis: [405, 60], duration: 900 }, { axis: [555, 35], duration: 900 }, { axis: [405, 15], duration: 900 }] },
        { ledRing: [72, 84], gobo: true, beam: 158, laser: 52, moves: [{ axis: [210, 35], duration: 900 }, { axis: [360, 60], duration: 900 }, { axis: [510, 35], duration: 900 }, { axis: [360, 15], duration: 900 }] },
        { ledRing: [112, 104], gobo: false, beam: 138, laser: 48, moves: [{ axis: [300, 35], duration: 900 }, { axis: [450, 60], duration: 900 }, { axis: [600, 35], duration: 900 }, { axis: [450, 15], duration: 900 }] },
      ],
    },
  },

  'folk+upbeat': {
    luminous: { head: 210, mini: 245, par: 178 },
    strobing: { threshold: 0.3, paceWeight: 0.28, energyWeight: 0.72, danceExp: 1.1 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 200, 0], duration: 500 }, { rgbw: [220, 180, 0], duration: 500 }, { rgbw: [60, 180, 0], duration: 500 }] },
        { colors: [{ rgbw: [200, 180, 30], duration: 500 }, { rgbw: [50, 200, 0], duration: 500 }, { rgbw: [180, 160, 20], duration: 500 }, { rgbw: [70, 190, 0], duration: 500 }] },
        { colors: [{ rgbw: [240, 200, 40], duration: 600 }, { rgbw: [80, 210, 20], duration: 600 }, { rgbw: [210, 170, 10], duration: 600 }] },
      ],
      head: [
        { moves: [{ axis: [178, 72], duration: 900, easing: easeInOutSine }, { axis: [328, 80], duration: 900, easing: easeInOutSine }], colors: [64, 80], ledRing: [102, 118], gobo: 16 },
        { moves: [{ axis: [132, 66], duration: 900, easing: easeInOutSine }, { axis: [352, 80], duration: 900, easing: easeInOutSine }, { axis: [248, 82], duration: 900, easing: easeInOutSine }], colors: [80, 64], ledRing: [92, 108], gobo: 0 },
        { moves: [{ axis: [155, 72], duration: 1000, easing: easeInOutSine }, { axis: [308, 62], duration: 1000, easing: easeInOutSine }, { axis: [238, 82], duration: 1000, easing: easeInOutSine }, { axis: [280, 70], duration: 1000, easing: easeInOutSine }], colors: [64, 32], ledRing: [110, 96], gobo: 16 },
      ],
      mini: [
        { ledRing: [25, 38], gobo: true, beam: 140, laser: 48, moves: [{ axis: [255, 35], duration: 900 }, { axis: [405, 60], duration: 900 }, { axis: [555, 35], duration: 900 }, { axis: [405, 15], duration: 900 }] },
        { ledRing: [15, 28], gobo: true, beam: 120, laser: 42, moves: [{ axis: [210, 35], duration: 900 }, { axis: [360, 60], duration: 900 }, { axis: [510, 35], duration: 900 }, { axis: [360, 15], duration: 900 }] },
        { ledRing: [65, 55], gobo: false, beam: 108, laser: 38, moves: [{ axis: [300, 35], duration: 900 }, { axis: [450, 60], duration: 900 }, { axis: [600, 35], duration: 900 }, { axis: [450, 15], duration: 900 }] },
      ],
    },
  },

  'ambient+upbeat': {
    luminous: { head: 175, mini: 215, par: 148 },
    strobing: { threshold: 0.4, paceWeight: 0.22, energyWeight: 0.78, danceExp: 1.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 120, 180], duration: 1200 }, { rgbw: [0, 180, 160], duration: 1200 }, { rgbw: [0, 100, 150], duration: 1200 }] },
        { colors: [{ rgbw: [0, 150, 200], duration: 1500 }, { rgbw: [20, 160, 180], duration: 1500 }, { rgbw: [0, 130, 170], duration: 1500 }] },
        { colors: [{ rgbw: [0, 140, 190], duration: 1500 }, { rgbw: [10, 170, 170], duration: 1500 }, { rgbw: [0, 110, 160], duration: 1500 }, { rgbw: [5, 155, 155], duration: 1500 }] },
      ],
      head: [
        { moves: [{ axis: [185, 72], duration: 2500, easing: easeInOutSine }, { axis: [322, 60], duration: 2500, easing: easeInOutSine }], colors: [112, 48], ledRing: [90, 105], gobo: 0 },
        { moves: [{ axis: [148, 76], duration: 2800, easing: easeInOutSine }, { axis: [355, 62], duration: 2800, easing: easeInOutSine }, { axis: [248, 80], duration: 2800, easing: easeInOutSine }], colors: [48, 112], ledRing: [80, 96], gobo: 0 },
        { moves: [{ axis: [168, 70], duration: 3200, easing: easeInOutSine }, { axis: [315, 58], duration: 3200, easing: easeInOutSine }, { axis: [230, 76], duration: 3200, easing: easeInOutSine }, { axis: [268, 64], duration: 3200, easing: easeInOutSine }], colors: [112, 96], ledRing: [94, 108], gobo: 0 },
      ],
      mini: [
        { ledRing: [72, 85], gobo: true, beam: 125, laser: 40, starfield: true, moves: [{ axis: [310, 60], duration: 2500 }, { axis: [460, 75], duration: 2500 }, { axis: [610, 60], duration: 2500 }, { axis: [460, 50], duration: 2500 }] },
        { ledRing: [62, 75], gobo: true, beam: 112, laser: 35, starfield: true, moves: [{ axis: [270, 60], duration: 2800 }, { axis: [420, 75], duration: 2800 }, { axis: [570, 60], duration: 2800 }, { axis: [420, 50], duration: 2800 }] },
        { ledRing: [82, 95], gobo: false, beam: 100, laser: 30, starfield: true, moves: [{ axis: [340, 60], duration: 3200 }, { axis: [490, 75], duration: 3200 }, { axis: [640, 60], duration: 3200 }, { axis: [490, 50], duration: 3200 }] },
      ],
    },
  },

  'classical+upbeat': {
    luminous: { head: 222, mini: 252, par: 190 },
    strobing: { threshold: 0.35, paceWeight: 0.22, energyWeight: 0.78, danceExp: 1.2 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 240, 200, 100], duration: 700 }, { rgbw: [255, 255, 240, 80], duration: 700 }, { rgbw: [240, 230, 190, 90], duration: 700 }] },
        { colors: [{ rgbw: [255, 248, 220, 110], duration: 800 }, { rgbw: [230, 230, 255, 60], duration: 800 }, { rgbw: [255, 235, 200, 95], duration: 800 }] },
        { colors: [{ rgbw: [255, 252, 230, 120], duration: 700 }, { rgbw: [215, 225, 255, 50], duration: 700 }, { rgbw: [255, 242, 215, 105], duration: 700 }, { rgbw: [200, 218, 250, 40], duration: 700 }] },
      ],
      head: [
        { moves: [{ axis: [198, 72], duration: 1800, easing: easeInOutSine }, { axis: [308, 60], duration: 1800, easing: easeInOutSine }], colors: [0, 48], ledRing: [122, 136], gobo: 16 },
        { moves: [{ axis: [158, 78], duration: 2000, easing: easeInOutSine }, { axis: [345, 66], duration: 2000, easing: easeInOutSine }, { axis: [258, 84], duration: 2000, easing: easeInOutSine }], colors: [48, 0], ledRing: [112, 128], gobo: 0 },
        { moves: [{ axis: [178, 74], duration: 2200, easing: easeInOutSine }, { axis: [298, 64], duration: 2200, easing: easeInOutSine }, { axis: [242, 82], duration: 2200, easing: easeInOutSine }, { axis: [272, 70], duration: 2200, easing: easeInOutSine }], colors: [0, 64], ledRing: [130, 144], gobo: 16 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: true, beam: 158, laser: 52, moves: [{ axis: [255, 35], duration: 1800 }, { axis: [405, 60], duration: 1800 }, { axis: [555, 35], duration: 1800 }, { axis: [405, 15], duration: 1800 }] },
        { ledRing: [68, 82], gobo: true, beam: 142, laser: 46, moves: [{ axis: [210, 35], duration: 2000 }, { axis: [360, 60], duration: 2000 }, { axis: [510, 35], duration: 2000 }, { axis: [360, 15], duration: 2000 }] },
        { ledRing: [88, 102], gobo: false, beam: 128, laser: 40, moves: [{ axis: [300, 35], duration: 2200 }, { axis: [450, 60], duration: 2200 }, { axis: [600, 35], duration: 2200 }, { axis: [450, 15], duration: 2200 }] },
      ],
    },
  },

  'country+upbeat': {
    luminous: { head: 228, mini: 255, par: 195 },
    strobing: { threshold: 0.25, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 200, 50], duration: 450 }, { rgbw: [255, 240, 180], duration: 450 }, { rgbw: [240, 150, 30], duration: 450 }] },
        { colors: [{ rgbw: [255, 180, 60], duration: 500 }, { rgbw: [255, 210, 140], duration: 500 }, { rgbw: [220, 160, 40], duration: 500 }, { rgbw: [255, 230, 100], duration: 500 }] },
        { colors: [{ rgbw: [255, 230, 160], duration: 480 }, { rgbw: [210, 140, 20], duration: 480 }, { rgbw: [255, 220, 120], duration: 480 }, { rgbw: [200, 120, 30], duration: 480 }] },
      ],
      head: [
        { moves: [{ axis: [178, 68], duration: 800, easing: easeInOutSine }, { axis: [332, 80], duration: 800, easing: easeInOutSine }], colors: [64, 80], ledRing: [112, 124], gobo: 16 },
        { moves: [{ axis: [122, 62], duration: 800, easing: easeInOutSine }, { axis: [372, 80], duration: 800, easing: easeInOutSine }, { axis: [232, 64], duration: 800, easing: easeInOutSine }], colors: [80, 64], ledRing: [100, 114], gobo: 32 },
        { moves: [{ axis: [158, 74], duration: 900, easing: easeInOutSine }, { axis: [308, 62], duration: 900, easing: easeInOutSine }, { axis: [342, 70], duration: 900, easing: easeInOutSine }, { axis: [198, 76], duration: 900, easing: easeInOutSine }], colors: [64, 80], ledRing: [118, 106], gobo: 16 },
      ],
      mini: [
        { ledRing: [86, 96], gobo: true, beam: 148, laser: 58, moves: [{ axis: [255, 35], duration: 800 }, { axis: [405, 60], duration: 800 }, { axis: [555, 35], duration: 800 }, { axis: [405, 15], duration: 800 }] },
        { ledRing: [52, 64], gobo: true, beam: 128, laser: 52, moves: [{ axis: [210, 35], duration: 800 }, { axis: [360, 60], duration: 800 }, { axis: [510, 35], duration: 800 }, { axis: [360, 15], duration: 800 }] },
        { ledRing: [22, 34], gobo: true, beam: 118, laser: 47, moves: [{ axis: [300, 35], duration: 800 }, { axis: [450, 60], duration: 800 }, { axis: [600, 35], duration: 800 }, { axis: [450, 15], duration: 800 }] },
      ],
    },
  },

  'latin+upbeat': {
    luminous: { head: 248, mini: 255, par: 205 },
    strobing: { threshold: 0.18, paceWeight: 0.32, energyWeight: 0.68, danceExp: 0.85 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 150, 0], duration: 300 }, { rgbw: [255, 0, 150], duration: 300 }, { rgbw: [255, 240, 0], duration: 300 }, { rgbw: [255, 80, 0], duration: 300 }] },
        { colors: [{ rgbw: [255, 0, 100], duration: 300 }, { rgbw: [255, 150, 0], duration: 300 }, { rgbw: [200, 0, 200], duration: 300 }, { rgbw: [255, 200, 0], duration: 300 }] },
        { colors: [{ rgbw: [255, 220, 0], duration: 350 }, { rgbw: [255, 80, 0], duration: 350 }, { rgbw: [200, 200, 0], duration: 350 }, { rgbw: [255, 0, 120], duration: 350 }] },
      ],
      head: [
        { moves: [{ axis: [168, 68], duration: 600, easing: easeInOutSine }, { axis: [342, 84], duration: 600, easing: easeInOutSine }], colors: [64, 80], ledRing: [186, 200], gobo: 128 },
        { moves: [{ axis: [102, 60], duration: 600, easing: easeInOutSine }, { axis: [428, 82], duration: 600, easing: easeInOutSine }, { axis: [232, 106], duration: 600, easing: easeInOutSine }], colors: [16, 96], ledRing: [198, 185], gobo: 80 },
        { moves: [{ axis: [272, 72], duration: 650, easing: easeInOutSine }, { axis: [148, 100], duration: 650, easing: easeInOutSine }, { axis: [382, 60], duration: 650, easing: easeInOutSine }], colors: [80, 64], ledRing: [155, 145], gobo: 140 },
      ],
      mini: [
        { ledRing: [195, 208], gobo: true, beam: 198, laser: 42, moves: [{ axis: [270, 35], duration: 600 }, { axis: [420, 60], duration: 600 }, { axis: [570, 35], duration: 600 }, { axis: [420, 15], duration: 600 }] },
        { ledRing: [208, 228], gobo: true, beam: 208, laser: 57, moves: [{ axis: [225, 35], duration: 600 }, { axis: [375, 60], duration: 600 }, { axis: [525, 35], duration: 600 }, { axis: [375, 15], duration: 600 }] },
        { ledRing: [42, 55], gobo: false, beam: 178, laser: 47, moves: [{ axis: [315, 35], duration: 600 }, { axis: [465, 60], duration: 600 }, { axis: [615, 35], duration: 600 }, { axis: [465, 15], duration: 600 }] },
      ],
    },
  },

  'reggae+upbeat': {
    luminous: { head: 228, mini: 255, par: 195 },
    strobing: { threshold: 0.28, paceWeight: 0.28, energyWeight: 0.72, danceExp: 1.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 50, 0], duration: 500 }, { rgbw: [255, 200, 0], duration: 500 }, { rgbw: [0, 180, 0], duration: 500 }, { rgbw: [255, 100, 0], duration: 500 }] },
        { colors: [{ rgbw: [0, 220, 0], duration: 500 }, { rgbw: [255, 200, 0], duration: 500 }, { rgbw: [220, 50, 0], duration: 500 }] },
        { colors: [{ rgbw: [255, 200, 0], duration: 600 }, { rgbw: [60, 220, 0], duration: 600 }, { rgbw: [220, 80, 0], duration: 600 }, { rgbw: [255, 160, 0], duration: 600 }] },
      ],
      head: [
        { moves: [{ axis: [188, 75], duration: 900, easing: easeInOutSine }, { axis: [322, 60], duration: 900, easing: easeInOutSine }], colors: [32, 64], ledRing: [108, 120], gobo: 32 },
        { moves: [{ axis: [122, 68], duration: 900, easing: easeInOutSine }, { axis: [382, 100], duration: 900, easing: easeInOutSine }, { axis: [208, 60], duration: 900, easing: easeInOutSine }], colors: [64, 16], ledRing: [118, 108], gobo: 16 },
        { moves: [{ axis: [168, 68], duration: 1000, easing: easeInOutSine }, { axis: [298, 90], duration: 1000, easing: easeInOutSine }, { axis: [352, 74], duration: 1000, easing: easeInOutSine }, { axis: [208, 66], duration: 1000, easing: easeInOutSine }], colors: [32, 80], ledRing: [100, 114], gobo: 32 },
      ],
      mini: [
        { ledRing: [72, 84], gobo: true, beam: 168, laser: 58, moves: [{ axis: [255, 35], duration: 900 }, { axis: [405, 60], duration: 900 }, { axis: [555, 35], duration: 900 }, { axis: [405, 15], duration: 900 }] },
        { ledRing: [62, 54], gobo: true, beam: 148, laser: 52, moves: [{ axis: [210, 35], duration: 900 }, { axis: [360, 60], duration: 900 }, { axis: [510, 35], duration: 900 }, { axis: [360, 15], duration: 900 }] },
        { ledRing: [32, 22], gobo: true, beam: 128, laser: 47, moves: [{ axis: [300, 35], duration: 900 }, { axis: [450, 60], duration: 900 }, { axis: [600, 35], duration: 900 }, { axis: [450, 15], duration: 900 }] },
      ],
    },
  },

  'funk+upbeat': {
    luminous: { head: 228, mini: 255, par: 195 },
    strobing: { threshold: 0.25, paceWeight: 0.3, energyWeight: 0.7, danceExp: 0.95 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 100, 0], duration: 500 }, { rgbw: [255, 0, 180], duration: 500 }, { rgbw: [255, 200, 0], duration: 500 }] },
        { colors: [{ rgbw: [200, 0, 150], duration: 500 }, { rgbw: [255, 150, 0], duration: 500 }, { rgbw: [100, 0, 200], duration: 500 }, { rgbw: [255, 200, 0], duration: 500 }] },
        { colors: [{ rgbw: [255, 200, 0], duration: 550 }, { rgbw: [200, 100, 0], duration: 550 }, { rgbw: [255, 50, 100], duration: 550 }] },
      ],
      head: [
        { moves: [{ axis: [148, 62], duration: 900, easing: easeInOutSine }, { axis: [342, 80], duration: 900, easing: easeInOutSine }], colors: [80, 96], ledRing: [158, 178], gobo: 64 },
        { moves: [{ axis: [82, 58], duration: 900, easing: easeInOutSine }, { axis: [402, 80], duration: 900, easing: easeInOutSine }, { axis: [208, 106], duration: 900, easing: easeInOutSine }], colors: [96, 80], ledRing: [178, 158], gobo: 48 },
        { moves: [{ axis: [232, 62], duration: 1000, easing: easeInOutSine }, { axis: [122, 100], duration: 1000, easing: easeInOutSine }, { axis: [362, 80], duration: 1000, easing: easeInOutSine }], colors: [64, 96], ledRing: [165, 152], gobo: 80 },
      ],
      mini: [
        { ledRing: [104, 92], gobo: true, beam: 188, laser: 62, moves: [{ axis: [255, 35], duration: 900 }, { axis: [405, 60], duration: 900 }, { axis: [555, 35], duration: 900 }, { axis: [405, 15], duration: 900 }] },
        { ledRing: [115, 128], gobo: true, beam: 178, laser: 57, moves: [{ axis: [210, 35], duration: 900 }, { axis: [360, 60], duration: 900 }, { axis: [510, 35], duration: 900 }, { axis: [360, 15], duration: 900 }] },
        { ledRing: [82, 72], gobo: true, beam: 158, laser: 52, moves: [{ axis: [300, 35], duration: 900 }, { axis: [450, 60], duration: 900 }, { axis: [600, 35], duration: 900 }, { axis: [450, 15], duration: 900 }] },
      ],
    },
  },

  'blues+upbeat': {
    luminous: { head: 205, mini: 240, par: 175 },
    strobing: { threshold: 0.32, paceWeight: 0.26, energyWeight: 0.74, danceExp: 1.1 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 100, 220], duration: 600 }, { rgbw: [180, 160, 0], duration: 600 }, { rgbw: [0, 80, 200], duration: 600 }] },
        { colors: [{ rgbw: [60, 60, 220], duration: 600 }, { rgbw: [160, 140, 20], duration: 600 }, { rgbw: [0, 100, 200], duration: 600 }, { rgbw: [140, 120, 10], duration: 600 }] },
        { colors: [{ rgbw: [0, 120, 240], duration: 700 }, { rgbw: [200, 180, 30], duration: 700 }, { rgbw: [0, 90, 210], duration: 700 }] },
      ],
      head: [
        { moves: [{ axis: [122, 64], duration: 1000, easing: easeInOutSine }, { axis: [382, 88], duration: 1000, easing: easeInOutSine }, { axis: [238, 116], duration: 1000, easing: easeInOutSine }], colors: [112, 48], ledRing: [108, 124], gobo: 0 },
        { moves: [{ axis: [202, 70], duration: 1100, easing: easeInOutSine }, { axis: [298, 86], duration: 1100, easing: easeInOutSine }], colors: [48, 112], ledRing: [118, 130], gobo: 16 },
        { moves: [{ axis: [196, 72], duration: 1200, easing: easeInOutSine }, { axis: [258, 88], duration: 1200, easing: easeInOutSine }, { axis: [218, 60], duration: 1200, easing: easeInOutSine }], colors: [112, 96], ledRing: [100, 116], gobo: 0 },
      ],
      mini: [
        { ledRing: [132, 145], gobo: true, beam: 158, laser: 58, moves: [{ axis: [255, 35], duration: 1000 }, { axis: [405, 60], duration: 1000 }, { axis: [555, 35], duration: 1000 }, { axis: [405, 15], duration: 1000 }] },
        { ledRing: [112, 125], gobo: true, beam: 138, laser: 50, moves: [{ axis: [210, 35], duration: 1000 }, { axis: [360, 60], duration: 1000 }, { axis: [510, 35], duration: 1000 }, { axis: [360, 15], duration: 1000 }] },
        { ledRing: [152, 142], gobo: false, beam: 128, laser: 47, moves: [{ axis: [300, 35], duration: 1000 }, { axis: [450, 60], duration: 1000 }, { axis: [600, 35], duration: 1000 }, { axis: [450, 15], duration: 1000 }] },
      ],
    },
  },

  'dance+upbeat': {
    luminous: { head: 255, mini: 255, par: 215 },
    strobing: { threshold: 0.14, paceWeight: 0.35, energyWeight: 0.65, danceExp: 0.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 200], duration: 250 }, { rgbw: [0, 220, 255], duration: 250 }, { rgbw: [255, 220, 0], duration: 250 }, { rgbw: [0, 255, 100], duration: 250 }] },
        { colors: [{ rgbw: [255, 100, 0], duration: 250 }, { rgbw: [0, 100, 255], duration: 250 }, { rgbw: [200, 0, 255], duration: 250 }, { rgbw: [0, 255, 180], duration: 250 }] },
        { colors: [{ rgbw: [255, 50, 150], duration: 280 }, { rgbw: [50, 255, 200], duration: 280 }, { rgbw: [255, 200, 0], duration: 280 }, { rgbw: [100, 50, 255], duration: 280 }] },
      ],
      head: [
        { moves: [{ axis: [158, 68], duration: 580, easing: easeInOutSine }, { axis: [348, 84], duration: 580, easing: easeInOutSine }], colors: [96, 48], ledRing: [215, 230], gobo: 120 },
        { moves: [{ axis: [118, 64], duration: 540, easing: easeInOutSine }, { axis: [272, 90], duration: 540, easing: easeInOutSine }, { axis: [418, 70], duration: 540, easing: easeInOutSine }, { axis: [158, 74], duration: 540, easing: easeInOutSine }], colors: [48, 96], ledRing: [228, 242], gobo: 140 },
        { moves: [{ axis: [168, 72], duration: 580, easing: easeInSine }, { axis: [338, 88], duration: 580, easing: easeInSine }, { axis: [238, 62], duration: 580, easing: easeInSine }], colors: [96, 64], ledRing: [205, 218], gobo: 100 },
      ],
      mini: [
        { ledRing: [205, 222], gobo: true, beam: 215, laser: 74, moves: [{ axis: [270, 35], duration: 580 }, { axis: [420, 60], duration: 580 }, { axis: [570, 35], duration: 580 }, { axis: [420, 15], duration: 580 }] },
        { ledRing: [218, 235], gobo: true, beam: 228, laser: 78, moves: [{ axis: [315, 35], duration: 540 }, { axis: [465, 60], duration: 540 }, { axis: [615, 35], duration: 540 }, { axis: [465, 15], duration: 540 }] },
        { ledRing: [188, 205], gobo: false, beam: 200, laser: 68, moves: [{ axis: [240, 35], duration: 620 }, { axis: [390, 60], duration: 620 }, { axis: [540, 35], duration: 620 }, { axis: [390, 15], duration: 620 }] },
      ],
    },
  },

  'newage+upbeat': {
    luminous: { head: 182, mini: 222, par: 155 },
    strobing: { threshold: 0.45, paceWeight: 0.2, energyWeight: 0.8, danceExp: 1.4 },
    variants: {
      par: [
        { colors: [{ rgbw: [140, 210, 255, 50], duration: 1200 }, { rgbw: [250, 255, 255, 90], duration: 1200 }, { rgbw: [110, 230, 200, 35], duration: 1200 }] },
        { colors: [{ rgbw: [210, 250, 255, 70], duration: 1400 }, { rgbw: [130, 250, 210, 30], duration: 1400 }, { rgbw: [210, 210, 255, 55], duration: 1400 }] },
        { colors: [{ rgbw: [240, 250, 255, 80], duration: 1400 }, { rgbw: [148, 218, 255, 40], duration: 1400 }, { rgbw: [168, 248, 210, 25], duration: 1400 }, { rgbw: [228, 240, 255, 65], duration: 1400 }] },
      ],
      head: [
        { moves: [{ axis: [195, 70], duration: 2500, easing: easeInOutSine }, { axis: [318, 58], duration: 2500, easing: easeInOutSine }], colors: [0, 48], ledRing: [108, 120], gobo: 0 },
        { moves: [{ axis: [155, 74], duration: 2800, easing: easeInOutSine }, { axis: [335, 62], duration: 2800, easing: easeInOutSine }, { axis: [248, 78], duration: 2800, easing: easeInOutSine }], colors: [48, 0], ledRing: [98, 112], gobo: 0 },
        { moves: [{ axis: [175, 70], duration: 3000, easing: easeInOutSine }, { axis: [302, 60], duration: 3000, easing: easeInOutSine }, { axis: [235, 76], duration: 3000, easing: easeInOutSine }, { axis: [275, 66], duration: 3000, easing: easeInOutSine }], colors: [0, 112], ledRing: [115, 128], gobo: 0 },
      ],
      mini: [
        { ledRing: [32, 46], gobo: true, beam: 72, laser: 22, starfield: true, moves: [{ axis: [320, 60], duration: 2500 }, { axis: [470, 75], duration: 2500 }, { axis: [620, 60], duration: 2500 }, { axis: [470, 50], duration: 2500 }] },
        { ledRing: [22, 36], gobo: true, beam: 60, laser: 18, starfield: true, moves: [{ axis: [280, 60], duration: 2800 }, { axis: [430, 75], duration: 2800 }, { axis: [580, 60], duration: 2800 }, { axis: [430, 50], duration: 2800 }] },
        { ledRing: [42, 56], gobo: false, beam: 52, laser: 15, starfield: true, moves: [{ axis: [350, 60], duration: 3000 }, { axis: [500, 75], duration: 3000 }, { axis: [650, 60], duration: 3000 }, { axis: [500, 50], duration: 3000 }] },
      ],
    },
  },

  'psychedelic+upbeat': {
    luminous: { head: 248, mini: 255, par: 205 },
    strobing: { threshold: 0.2, paceWeight: 0.28, energyWeight: 0.72, danceExp: 0.95 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 0, 255], duration: 350 }, { rgbw: [0, 255, 80], duration: 350 }, { rgbw: [0, 100, 255], duration: 350 }, { rgbw: [255, 0, 200], duration: 350 }] },
        { colors: [{ rgbw: [255, 0, 200], duration: 350 }, { rgbw: [100, 0, 255], duration: 350 }, { rgbw: [60, 220, 0], duration: 350 }, { rgbw: [180, 0, 255], duration: 350 }] },
        { colors: [{ rgbw: [0, 100, 255], duration: 400 }, { rgbw: [255, 0, 160], duration: 400 }, { rgbw: [80, 255, 0], duration: 400 }] },
      ],
      head: [
        { moves: [{ axis: [158, 72], duration: 1200, easing: easeInOutSine }, { axis: [362, 88], duration: 1200, easing: easeInOutSine }], colors: [96, 48], ledRing: [182, 202], gobo: 128 },
        { moves: [{ axis: [98, 60], duration: 1400, easing: easeInOutSine }, { axis: [422, 84], duration: 1400, easing: easeInOutSine }, { axis: [238, 108], duration: 1400, easing: easeInOutSine }], colors: [48, 112], ledRing: [202, 222], gobo: 160 },
        { moves: [{ axis: [252, 80], duration: 1600, easing: easeInOutSine }, { axis: [128, 96], duration: 1600, easing: easeInOutSine }, { axis: [398, 68], duration: 1600, easing: easeInOutSine }, { axis: [268, 82], duration: 1600, easing: easeInOutSine }], colors: [112, 96], ledRing: [172, 192], gobo: 140 },
      ],
      mini: [
        { ledRing: [162, 182], gobo: true, beam: 188, laser: 58, starfield: true, moves: [{ axis: [310, 60], duration: 1200 }, { axis: [460, 75], duration: 1200 }, { axis: [610, 60], duration: 1200 }, { axis: [460, 50], duration: 1200 }] },
        { ledRing: [182, 205], gobo: true, beam: 205, laser: 65, starfield: true, moves: [{ axis: [270, 60], duration: 1400 }, { axis: [420, 75], duration: 1400 }, { axis: [570, 60], duration: 1400 }, { axis: [420, 50], duration: 1400 }] },
        { ledRing: [145, 165], gobo: true, beam: 175, laser: 52, starfield: true, moves: [{ axis: [340, 60], duration: 1600 }, { axis: [490, 75], duration: 1600 }, { axis: [640, 60], duration: 1600 }, { axis: [490, 50], duration: 1600 }] },
      ],
    },
  },

  // ── +epic entries ────────────────────────────────────────────────────────

  'rock+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 0], duration: 150 }, { rgbw: [255, 100, 0], duration: 150 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [200, 0, 0], duration: 120 }] },
        { colors: [{ rgbw: [255, 80, 0], duration: 150 }, { rgbw: [255, 0, 0], duration: 150 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [60, 0, 0], duration: 120 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 80 }, { rgbw: [255, 0, 0], duration: 150 }, { rgbw: [255, 60, 0], duration: 150 }, { rgbw: [100, 0, 0], duration: 120 }] },
      ],
      head: [
        { moves: [{ axis: [40, 56], duration: 350, easing: easeInExpo }, { axis: [480, 72], duration: 350, easing: easeInExpo }], colors: [16, 0], ledRing: [154, 190], gobo: 32 },
        { moves: [{ axis: [35, 56], duration: 320, easing: easeInExpo }, { axis: [488, 70], duration: 320, easing: easeInExpo }, { axis: [210, 56], duration: 320, easing: easeInExpo }, { axis: [52, 58], duration: 320, easing: easeInExpo }], colors: [0, 16], ledRing: [190, 154], gobo: 48 },
        { moves: [{ axis: [28, 60], duration: 300, easing: easeInExpo }, { axis: [510, 56], duration: 300, easing: easeInExpo }, { axis: [245, 70], duration: 300, easing: easeInExpo }, { axis: [42, 62], duration: 300, easing: easeInExpo }], colors: [16, 80], ledRing: [220, 250], gobo: 16 },
      ],
      mini: [
        { ledRing: [160, 180], gobo: true, beam: 225, laser: 72, moves: [{ axis: [270, 35], duration: 350 }, { axis: [420, 60], duration: 350 }, { axis: [570, 35], duration: 350 }, { axis: [420, 15], duration: 350 }] },
        { ledRing: [180, 200], gobo: true, beam: 235, laser: 80, moves: [{ axis: [225, 35], duration: 320 }, { axis: [375, 60], duration: 320 }, { axis: [525, 35], duration: 320 }, { axis: [375, 15], duration: 320 }] },
        { ledRing: [210, 232], gobo: false, beam: 215, laser: 68, moves: [{ axis: [315, 35], duration: 300 }, { axis: [465, 60], duration: 300 }, { axis: [615, 35], duration: 300 }, { axis: [465, 15], duration: 300 }] },
      ],
    },
  },

  'pop+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 200], duration: 150 }, { rgbw: [255, 220, 0], duration: 150 }, { rgbw: [0, 200, 255], duration: 150 }, { rgbw: [200, 80, 255], duration: 150 }] },
        { colors: [{ rgbw: [255, 100, 200], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [100, 200, 255], duration: 180 }, { rgbw: [255, 180, 0], duration: 150 }] },
        { colors: [{ rgbw: [255, 255, 100], duration: 150 }, { rgbw: [255, 0, 180], duration: 150 }, { rgbw: [0, 255, 200], duration: 150 }, { rgbw: [255, 255, 255], duration: 80 }] },
      ],
      head: [
        { moves: [{ axis: [65, 60], duration: 380, easing: easeInExpo }, { axis: [462, 105], duration: 380, easing: easeInExpo }], colors: [96, 64], ledRing: [220, 242], gobo: 80 },
        { moves: [{ axis: [48, 58], duration: 350, easing: easeInExpo }, { axis: [255, 100], duration: 350, easing: easeInExpo }, { axis: [475, 65], duration: 350, easing: easeInExpo }], colors: [64, 96], ledRing: [235, 250], gobo: 64 },
        { moves: [{ axis: [85, 84], duration: 380, easing: easeInExpo }, { axis: [415, 70], duration: 380, easing: easeInExpo }, { axis: [165, 108], duration: 380, easing: easeInExpo }], colors: [0, 64], ledRing: [210, 228], gobo: 96 },
      ],
      mini: [
        { ledRing: [55, 45], gobo: true, beam: 198, laser: 72, moves: [{ axis: [255, 35], duration: 380 }, { axis: [405, 60], duration: 380 }, { axis: [555, 35], duration: 380 }, { axis: [405, 15], duration: 380 }] },
        { ledRing: [65, 55], gobo: true, beam: 215, laser: 78, moves: [{ axis: [210, 35], duration: 350 }, { axis: [360, 60], duration: 350 }, { axis: [510, 35], duration: 350 }, { axis: [360, 15], duration: 350 }] },
        { ledRing: [38, 28], gobo: true, beam: 185, laser: 65, moves: [{ axis: [300, 35], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 35], duration: 380 }, { axis: [450, 15], duration: 380 }] },
      ],
    },
  },

  'electronic+epic': {
    luminous: { head: 255, mini: 255, par: 215 },
    strobing: { threshold: 0.1, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.65 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 255, 255, 120], duration: 120 }, { rgbw: [0, 255, 255], duration: 180 }, { rgbw: [255, 255, 255, 100], duration: 80 }, { rgbw: [0, 200, 255], duration: 180 }] },
        { colors: [{ rgbw: [255, 255, 255, 110], duration: 100 }, { rgbw: [255, 0, 255], duration: 180 }, { rgbw: [0, 255, 255], duration: 180 }, { rgbw: [255, 255, 255, 80], duration: 80 }] },
        { colors: [{ rgbw: [0, 255, 255], duration: 150 }, { rgbw: [255, 255, 255, 130], duration: 100 }, { rgbw: [0, 200, 255], duration: 150 }, { rgbw: [255, 255, 255, 80], duration: 80 }] },
      ],
      head: [
        { moves: [{ axis: [42, 56], duration: 280, easing: easeInExpo }, { axis: [488, 68], duration: 280, easing: easeInExpo }], colors: [0, 48], ledRing: [248, 255], gobo: 32 },
        { moves: [{ axis: [38, 56], duration: 300, easing: easeInExpo }, { axis: [448, 72], duration: 300, easing: easeInExpo }, { axis: [248, 60], duration: 300, easing: easeInExpo }], colors: [48, 0], ledRing: [238, 252], gobo: 16 },
        { moves: [{ axis: [28, 60], duration: 260, easing: easeInExpo }, { axis: [478, 56], duration: 260, easing: easeInExpo }, { axis: [285, 68], duration: 260, easing: easeInExpo }, { axis: [50, 58], duration: 260, easing: easeInExpo }], colors: [0, 16], ledRing: [255, 244], gobo: 48 },
      ],
      mini: [
        { ledRing: [228, 248], gobo: false, beam: 238, laser: 80, moves: [{ axis: [270, 35], duration: 280 }, { axis: [420, 60], duration: 280 }, { axis: [570, 35], duration: 280 }, { axis: [420, 15], duration: 280 }] },
        { ledRing: [238, 225], gobo: false, beam: 248, laser: 80, moves: [{ axis: [225, 35], duration: 280 }, { axis: [375, 60], duration: 280 }, { axis: [525, 35], duration: 280 }, { axis: [375, 15], duration: 280 }] },
        { ledRing: [208, 228], gobo: true, beam: 228, laser: 78, moves: [{ axis: [315, 35], duration: 280 }, { axis: [465, 60], duration: 280 }, { axis: [615, 35], duration: 280 }, { axis: [465, 15], duration: 280 }] },
      ],
    },
  },

  'hiphop+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.4, energyWeight: 0.6, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [150, 0, 255], duration: 200 }, { rgbw: [255, 200, 0], duration: 200 }, { rgbw: [0, 200, 50], duration: 200 }, { rgbw: [20, 0, 60], duration: 100 }] },
        { colors: [{ rgbw: [200, 0, 255], duration: 180 }, { rgbw: [255, 180, 0], duration: 180 }, { rgbw: [50, 0, 80], duration: 80 }, { rgbw: [0, 220, 80], duration: 180 }] },
        { colors: [{ rgbw: [255, 220, 0], duration: 180 }, { rgbw: [120, 0, 255], duration: 200 }, { rgbw: [0, 255, 80], duration: 180 }, { rgbw: [10, 0, 30], duration: 80 }] },
      ],
      head: [
        { moves: [{ axis: [60, 56], duration: 380, easing: easeInExpo }, { axis: [458, 80], duration: 380, easing: easeInExpo }], colors: [112, 32], ledRing: [225, 210], gobo: 144 },
        { moves: [{ axis: [48, 56], duration: 360, easing: easeInExpo }, { axis: [448, 90], duration: 360, easing: easeInExpo }, { axis: [232, 64], duration: 360, easing: easeInExpo }, { axis: [65, 58], duration: 360, easing: easeInExpo }], colors: [16, 112], ledRing: [210, 228], gobo: 160 },
        { moves: [{ axis: [260, 56], duration: 360, easing: easeInExpo }, { axis: [155, 100], duration: 360, easing: easeInExpo }, { axis: [448, 66], duration: 360, easing: easeInExpo }, { axis: [268, 60], duration: 360, easing: easeInExpo }], colors: [64, 112], ledRing: [230, 200], gobo: 48 },
      ],
      mini: [
        { ledRing: [188, 178], gobo: true, beam: 215, laser: 52, moves: [{ axis: [270, 35], duration: 380 }, { axis: [420, 60], duration: 380 }, { axis: [570, 35], duration: 380 }, { axis: [420, 15], duration: 380 }] },
        { ledRing: [210, 222], gobo: true, beam: 225, laser: 65, moves: [{ axis: [225, 35], duration: 360 }, { axis: [375, 60], duration: 360 }, { axis: [525, 35], duration: 360 }, { axis: [375, 15], duration: 360 }] },
        { ledRing: [168, 188], gobo: false, beam: 195, laser: 58, moves: [{ axis: [315, 35], duration: 360 }, { axis: [465, 60], duration: 360 }, { axis: [615, 35], duration: 360 }, { axis: [465, 15], duration: 360 }] },
      ],
    },
  },

  'jazz+epic': {
    luminous: { head: 245, mini: 255, par: 205 },
    strobing: { threshold: 0.14, paceWeight: 0.35, energyWeight: 0.65, danceExp: 0.8 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 160, 0], duration: 200 }, { rgbw: [255, 220, 40], duration: 180 }, { rgbw: [200, 80, 0], duration: 200 }, { rgbw: [255, 100, 0], duration: 200 }] },
        { colors: [{ rgbw: [255, 200, 30], duration: 200 }, { rgbw: [200, 90, 0], duration: 200 }, { rgbw: [255, 140, 0], duration: 200 }, { rgbw: [255, 255, 180], duration: 120 }] },
        { colors: [{ rgbw: [255, 180, 40], duration: 220 }, { rgbw: [200, 80, 0], duration: 220 }, { rgbw: [255, 220, 60], duration: 220 }] },
      ],
      head: [
        { moves: [{ axis: [100, 62], duration: 500, easing: easeInExpo }, { axis: [415, 80], duration: 500, easing: easeInExpo }], colors: [80, 64], ledRing: [178, 200], gobo: 16 },
        { moves: [{ axis: [82, 58], duration: 480, easing: easeInExpo }, { axis: [395, 84], duration: 480, easing: easeInExpo }, { axis: [238, 62], duration: 480, easing: easeInExpo }], colors: [64, 80], ledRing: [195, 175], gobo: 0 },
        { moves: [{ axis: [92, 80], duration: 500, easing: easeInExpo }, { axis: [272, 56], duration: 500, easing: easeInExpo }, { axis: [145, 74], duration: 500, easing: easeInExpo }, { axis: [318, 90], duration: 500, easing: easeInExpo }], colors: [80, 16], ledRing: [185, 165], gobo: 16 },
      ],
      mini: [
        { ledRing: [100, 120], gobo: true, beam: 195, laser: 65, moves: [{ axis: [255, 35], duration: 500 }, { axis: [405, 60], duration: 500 }, { axis: [555, 35], duration: 500 }, { axis: [405, 15], duration: 500 }] },
        { ledRing: [130, 148], gobo: true, beam: 182, laser: 58, moves: [{ axis: [210, 35], duration: 480 }, { axis: [360, 60], duration: 480 }, { axis: [510, 35], duration: 480 }, { axis: [360, 15], duration: 480 }] },
        { ledRing: [72, 92], gobo: false, beam: 168, laser: 52, moves: [{ axis: [300, 35], duration: 480 }, { axis: [450, 60], duration: 480 }, { axis: [600, 35], duration: 480 }, { axis: [450, 15], duration: 480 }] },
      ],
    },
  },

  'rnb+epic': {
    luminous: { head: 248, mini: 255, par: 208 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 100, 50], duration: 180 }, { rgbw: [255, 200, 0], duration: 180 }, { rgbw: [220, 50, 80], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [255, 80, 60], duration: 180 }, { rgbw: [220, 150, 20], duration: 180 }, { rgbw: [255, 50, 100], duration: 180 }, { rgbw: [255, 180, 40], duration: 180 }] },
        { colors: [{ rgbw: [240, 90, 70], duration: 200 }, { rgbw: [255, 170, 10], duration: 200 }, { rgbw: [210, 60, 90], duration: 200 }] },
      ],
      head: [
        { moves: [{ axis: [72, 64], duration: 400, easing: easeInExpo }, { axis: [448, 80], duration: 400, easing: easeInExpo }], colors: [80, 96], ledRing: [190, 175], gobo: 32 },
        { moves: [{ axis: [58, 60], duration: 380, easing: easeInExpo }, { axis: [422, 84], duration: 380, easing: easeInExpo }, { axis: [222, 106], duration: 380, easing: easeInExpo }], colors: [64, 80], ledRing: [175, 192], gobo: 48 },
        { moves: [{ axis: [42, 58], duration: 380, easing: easeInExpo }, { axis: [462, 80], duration: 380, easing: easeInExpo }, { axis: [248, 66], duration: 380, easing: easeInExpo }, { axis: [65, 62], duration: 380, easing: easeInExpo }], colors: [96, 16], ledRing: [205, 218], gobo: 16 },
      ],
      mini: [
        { ledRing: [85, 68], gobo: true, beam: 215, laser: 70, moves: [{ axis: [255, 35], duration: 400 }, { axis: [405, 60], duration: 400 }, { axis: [555, 35], duration: 400 }, { axis: [405, 15], duration: 400 }] },
        { ledRing: [75, 88], gobo: true, beam: 205, laser: 65, moves: [{ axis: [210, 35], duration: 380 }, { axis: [360, 60], duration: 380 }, { axis: [510, 35], duration: 380 }, { axis: [360, 15], duration: 380 }] },
        { ledRing: [115, 108], gobo: false, beam: 188, laser: 60, moves: [{ axis: [300, 35], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 35], duration: 380 }, { axis: [450, 15], duration: 380 }] },
      ],
    },
  },

  'folk+epic': {
    luminous: { head: 235, mini: 255, par: 198 },
    strobing: { threshold: 0.15, paceWeight: 0.35, energyWeight: 0.65, danceExp: 0.85 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 200, 0], duration: 200 }, { rgbw: [240, 200, 40], duration: 200 }, { rgbw: [60, 180, 0], duration: 200 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [200, 180, 30], duration: 200 }, { rgbw: [50, 200, 0], duration: 200 }, { rgbw: [255, 200, 0], duration: 200 }, { rgbw: [70, 190, 0], duration: 200 }] },
        { colors: [{ rgbw: [255, 220, 50], duration: 200 }, { rgbw: [90, 210, 20], duration: 200 }, { rgbw: [220, 170, 10], duration: 200 }] },
      ],
      head: [
        { moves: [{ axis: [62, 60], duration: 440, easing: easeInExpo }, { axis: [458, 80], duration: 440, easing: easeInExpo }], colors: [64, 80], ledRing: [148, 168], gobo: 16 },
        { moves: [{ axis: [48, 58], duration: 420, easing: easeInExpo }, { axis: [425, 80], duration: 420, easing: easeInExpo }, { axis: [238, 82], duration: 420, easing: easeInExpo }], colors: [80, 64], ledRing: [138, 158], gobo: 0 },
        { moves: [{ axis: [55, 72], duration: 440, easing: easeInExpo }, { axis: [408, 62], duration: 440, easing: easeInExpo }, { axis: [238, 82], duration: 440, easing: easeInExpo }, { axis: [280, 70], duration: 440, easing: easeInExpo }], colors: [64, 32], ledRing: [158, 142], gobo: 16 },
      ],
      mini: [
        { ledRing: [28, 44], gobo: true, beam: 188, laser: 62, moves: [{ axis: [255, 35], duration: 440 }, { axis: [405, 60], duration: 440 }, { axis: [555, 35], duration: 440 }, { axis: [405, 15], duration: 440 }] },
        { ledRing: [18, 34], gobo: true, beam: 175, laser: 56, moves: [{ axis: [210, 35], duration: 420 }, { axis: [360, 60], duration: 420 }, { axis: [510, 35], duration: 420 }, { axis: [360, 15], duration: 420 }] },
        { ledRing: [68, 58], gobo: false, beam: 162, laser: 50, moves: [{ axis: [300, 35], duration: 420 }, { axis: [450, 60], duration: 420 }, { axis: [600, 35], duration: 420 }, { axis: [450, 15], duration: 420 }] },
      ],
    },
  },

  'ambient+epic': {
    luminous: { head: 178, mini: 218, par: 150 },
    strobing: { threshold: 0.5, paceWeight: 0.18, energyWeight: 0.82, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 100, 180], duration: 2500 }, { rgbw: [0, 160, 140], duration: 2500 }, { rgbw: [20, 0, 140], duration: 2500 }] },
        { colors: [{ rgbw: [0, 140, 200], duration: 3000 }, { rgbw: [30, 0, 160], duration: 3000 }, { rgbw: [0, 120, 165], duration: 3000 }] },
        { colors: [{ rgbw: [0, 120, 190], duration: 3000 }, { rgbw: [25, 0, 150], duration: 3000 }, { rgbw: [0, 155, 160], duration: 3000 }, { rgbw: [10, 0, 135], duration: 3000 }] },
      ],
      head: [
        { moves: [{ axis: [80, 56], duration: 6000, easing: easeInOutSine }, { axis: [440, 72], duration: 6000, easing: easeInOutSine }], colors: [112, 48], ledRing: [105, 122], gobo: 0 },
        { moves: [{ axis: [60, 60], duration: 7000, easing: easeInOutSine }, { axis: [265, 84], duration: 7000, easing: easeInOutSine }, { axis: [450, 62], duration: 7000, easing: easeInOutSine }], colors: [48, 112], ledRing: [95, 112], gobo: 0 },
        { moves: [{ axis: [68, 64], duration: 8000, easing: easeInOutSine }, { axis: [220, 80], duration: 8000, easing: easeInOutSine }, { axis: [360, 58], duration: 8000, easing: easeInOutSine }, { axis: [488, 70], duration: 8000, easing: easeInOutSine }], colors: [112, 96], ledRing: [112, 128], gobo: 0 },
      ],
      mini: [
        { ledRing: [75, 92], gobo: true, beam: 130, laser: 42, starfield: true, moves: [{ axis: [310, 60], duration: 6000 }, { axis: [460, 75], duration: 6000 }, { axis: [610, 60], duration: 6000 }, { axis: [460, 50], duration: 6000 }] },
        { ledRing: [65, 82], gobo: true, beam: 118, laser: 36, starfield: true, moves: [{ axis: [270, 60], duration: 7000 }, { axis: [420, 75], duration: 7000 }, { axis: [570, 60], duration: 7000 }, { axis: [420, 50], duration: 7000 }] },
        { ledRing: [85, 102], gobo: false, beam: 108, laser: 32, starfield: true, moves: [{ axis: [340, 60], duration: 8000 }, { axis: [490, 75], duration: 8000 }, { axis: [640, 60], duration: 8000 }, { axis: [490, 50], duration: 8000 }] },
      ],
    },
  },

  'country+epic': {
    luminous: { head: 252, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 200, 50], duration: 180 }, { rgbw: [255, 255, 180], duration: 120 }, { rgbw: [255, 140, 20], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [255, 180, 60], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [220, 150, 30], duration: 180 }, { rgbw: [255, 220, 100], duration: 180 }] },
        { colors: [{ rgbw: [255, 230, 160], duration: 180 }, { rgbw: [210, 140, 20], duration: 180 }, { rgbw: [255, 220, 120], duration: 180 }, { rgbw: [200, 120, 30], duration: 180 }] },
      ],
      head: [
        { moves: [{ axis: [48, 56], duration: 380, easing: easeInExpo }, { axis: [465, 80], duration: 380, easing: easeInExpo }], colors: [64, 80], ledRing: [168, 188], gobo: 16 },
        { moves: [{ axis: [38, 58], duration: 360, easing: easeInExpo }, { axis: [445, 80], duration: 360, easing: easeInExpo }, { axis: [238, 64], duration: 360, easing: easeInExpo }], colors: [80, 64], ledRing: [152, 172], gobo: 32 },
        { moves: [{ axis: [45, 72], duration: 380, easing: easeInExpo }, { axis: [398, 62], duration: 380, easing: easeInExpo }, { axis: [338, 70], duration: 380, easing: easeInExpo }, { axis: [188, 78], duration: 380, easing: easeInExpo }], colors: [64, 80], ledRing: [178, 162], gobo: 16 },
      ],
      mini: [
        { ledRing: [92, 108], gobo: true, beam: 205, laser: 72, moves: [{ axis: [255, 35], duration: 380 }, { axis: [405, 60], duration: 380 }, { axis: [555, 35], duration: 380 }, { axis: [405, 15], duration: 380 }] },
        { ledRing: [56, 72], gobo: true, beam: 192, laser: 68, moves: [{ axis: [210, 35], duration: 360 }, { axis: [360, 60], duration: 360 }, { axis: [510, 35], duration: 360 }, { axis: [360, 15], duration: 360 }] },
        { ledRing: [24, 40], gobo: true, beam: 178, laser: 62, moves: [{ axis: [300, 35], duration: 360 }, { axis: [450, 60], duration: 360 }, { axis: [600, 35], duration: 360 }, { axis: [450, 15], duration: 360 }] },
      ],
    },
  },

  'latin+epic': {
    luminous: { head: 255, mini: 255, par: 215 },
    strobing: { threshold: 0.1, paceWeight: 0.4, energyWeight: 0.6, danceExp: 0.65 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 150, 0], duration: 150 }, { rgbw: [255, 0, 150], duration: 150 }, { rgbw: [255, 220, 0], duration: 150 }, { rgbw: [255, 80, 0], duration: 150 }] },
        { colors: [{ rgbw: [255, 0, 100], duration: 150 }, { rgbw: [255, 150, 0], duration: 150 }, { rgbw: [200, 0, 200], duration: 150 }, { rgbw: [255, 200, 0], duration: 150 }] },
        { colors: [{ rgbw: [255, 220, 0], duration: 150 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [200, 200, 0], duration: 150 }, { rgbw: [255, 0, 120], duration: 150 }] },
      ],
      head: [
        { moves: [{ axis: [50, 56], duration: 320, easing: easeInExpo }, { axis: [475, 84], duration: 320, easing: easeInExpo }], colors: [64, 80], ledRing: [202, 218], gobo: 128 },
        { moves: [{ axis: [38, 58], duration: 300, easing: easeInExpo }, { axis: [498, 82], duration: 300, easing: easeInExpo }, { axis: [232, 106], duration: 300, easing: easeInExpo }], colors: [16, 96], ledRing: [215, 200], gobo: 80 },
        { moves: [{ axis: [44, 72], duration: 320, easing: easeInExpo }, { axis: [418, 62], duration: 320, easing: easeInExpo }, { axis: [148, 100], duration: 320, easing: easeInExpo }], colors: [80, 64], ledRing: [188, 175], gobo: 140 },
      ],
      mini: [
        { ledRing: [205, 220], gobo: true, beam: 215, laser: 52, moves: [{ axis: [270, 35], duration: 320 }, { axis: [420, 60], duration: 320 }, { axis: [570, 35], duration: 320 }, { axis: [420, 15], duration: 320 }] },
        { ledRing: [218, 238], gobo: true, beam: 228, laser: 68, moves: [{ axis: [225, 35], duration: 300 }, { axis: [375, 60], duration: 300 }, { axis: [525, 35], duration: 300 }, { axis: [375, 15], duration: 300 }] },
        { ledRing: [48, 62], gobo: false, beam: 198, laser: 58, moves: [{ axis: [315, 35], duration: 300 }, { axis: [465, 60], duration: 300 }, { axis: [615, 35], duration: 300 }, { axis: [465, 15], duration: 300 }] },
      ],
    },
  },

  'reggae+epic': {
    luminous: { head: 248, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 50, 0], duration: 180 }, { rgbw: [255, 200, 0], duration: 180 }, { rgbw: [0, 200, 0], duration: 180 }, { rgbw: [255, 100, 0], duration: 180 }] },
        { colors: [{ rgbw: [0, 220, 0], duration: 180 }, { rgbw: [255, 200, 0], duration: 180 }, { rgbw: [255, 0, 0], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [255, 200, 0], duration: 200 }, { rgbw: [60, 220, 0], duration: 200 }, { rgbw: [200, 80, 0], duration: 200 }, { rgbw: [0, 255, 0], duration: 200 }] },
      ],
      head: [
        { moves: [{ axis: [52, 58], duration: 400, easing: easeInExpo }, { axis: [460, 80], duration: 400, easing: easeInExpo }], colors: [32, 64], ledRing: [168, 188], gobo: 32 },
        { moves: [{ axis: [40, 56], duration: 380, easing: easeInExpo }, { axis: [452, 100], duration: 380, easing: easeInExpo }, { axis: [208, 60], duration: 380, easing: easeInExpo }], colors: [64, 16], ledRing: [182, 165], gobo: 16 },
        { moves: [{ axis: [48, 68], duration: 400, easing: easeInExpo }, { axis: [298, 90], duration: 400, easing: easeInExpo }, { axis: [352, 74], duration: 400, easing: easeInExpo }, { axis: [208, 66], duration: 400, easing: easeInExpo }], colors: [32, 80], ledRing: [155, 175], gobo: 32 },
      ],
      mini: [
        { ledRing: [82, 98], gobo: true, beam: 208, laser: 72, moves: [{ axis: [255, 35], duration: 400 }, { axis: [405, 60], duration: 400 }, { axis: [555, 35], duration: 400 }, { axis: [405, 15], duration: 400 }] },
        { ledRing: [68, 85], gobo: true, beam: 192, laser: 65, moves: [{ axis: [210, 35], duration: 380 }, { axis: [360, 60], duration: 380 }, { axis: [510, 35], duration: 380 }, { axis: [360, 15], duration: 380 }] },
        { ledRing: [35, 22], gobo: true, beam: 178, laser: 58, moves: [{ axis: [300, 35], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 35], duration: 380 }, { axis: [450, 15], duration: 380 }] },
      ],
    },
  },

  'funk+epic': {
    luminous: { head: 252, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 120, 0], duration: 180 }, { rgbw: [255, 0, 180], duration: 180 }, { rgbw: [255, 220, 0], duration: 180 }, { rgbw: [200, 0, 150], duration: 180 }] },
        { colors: [{ rgbw: [200, 0, 150], duration: 180 }, { rgbw: [255, 150, 0], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [100, 0, 200], duration: 180 }] },
        { colors: [{ rgbw: [255, 200, 0], duration: 200 }, { rgbw: [200, 80, 0], duration: 200 }, { rgbw: [255, 50, 100], duration: 200 }] },
      ],
      head: [
        { moves: [{ axis: [55, 56], duration: 400, easing: easeInExpo }, { axis: [462, 80], duration: 400, easing: easeInExpo }], colors: [80, 96], ledRing: [195, 218], gobo: 64 },
        { moves: [{ axis: [42, 56], duration: 380, easing: easeInExpo }, { axis: [462, 80], duration: 380, easing: easeInExpo }, { axis: [208, 106], duration: 380, easing: easeInExpo }], colors: [96, 80], ledRing: [212, 195], gobo: 48 },
        { moves: [{ axis: [232, 62], duration: 380, easing: easeInExpo }, { axis: [122, 100], duration: 380, easing: easeInExpo }, { axis: [455, 80], duration: 380, easing: easeInExpo }], colors: [64, 96], ledRing: [205, 188], gobo: 80 },
      ],
      mini: [
        { ledRing: [112, 100], gobo: true, beam: 218, laser: 72, moves: [{ axis: [255, 35], duration: 400 }, { axis: [405, 60], duration: 400 }, { axis: [555, 35], duration: 400 }, { axis: [405, 15], duration: 400 }] },
        { ledRing: [128, 142], gobo: true, beam: 205, laser: 68, moves: [{ axis: [210, 35], duration: 380 }, { axis: [360, 60], duration: 380 }, { axis: [510, 35], duration: 380 }, { axis: [360, 15], duration: 380 }] },
        { ledRing: [92, 80], gobo: true, beam: 192, laser: 62, moves: [{ axis: [300, 35], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 35], duration: 380 }, { axis: [450, 15], duration: 380 }] },
      ],
    },
  },

  'blues+epic': {
    luminous: { head: 248, mini: 255, par: 208 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.78 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 120, 255], duration: 180 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [0, 80, 220], duration: 180 }, { rgbw: [0, 100, 255], duration: 180 }] },
        { colors: [{ rgbw: [60, 80, 255], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [0, 100, 240], duration: 200 }, { rgbw: [40, 60, 220], duration: 180 }] },
        { colors: [{ rgbw: [0, 150, 255], duration: 180 }, { rgbw: [200, 180, 30], duration: 180 }, { rgbw: [0, 100, 240], duration: 180 }] },
      ],
      head: [
        { moves: [{ axis: [48, 56], duration: 400, easing: easeInExpo }, { axis: [462, 88], duration: 400, easing: easeInExpo }], colors: [112, 48], ledRing: [168, 192], gobo: 0 },
        { moves: [{ axis: [38, 58], duration: 380, easing: easeInExpo }, { axis: [448, 84], duration: 380, easing: easeInExpo }, { axis: [238, 116], duration: 380, easing: easeInExpo }], colors: [48, 112], ledRing: [182, 165], gobo: 16 },
        { moves: [{ axis: [42, 62], duration: 380, easing: easeInExpo }, { axis: [258, 88], duration: 380, easing: easeInExpo }, { axis: [448, 66], duration: 380, easing: easeInExpo }], colors: [112, 96], ledRing: [158, 178], gobo: 0 },
      ],
      mini: [
        { ledRing: [138, 155], gobo: true, beam: 212, laser: 72, moves: [{ axis: [255, 35], duration: 400 }, { axis: [405, 60], duration: 400 }, { axis: [555, 35], duration: 400 }, { axis: [405, 15], duration: 400 }] },
        { ledRing: [118, 135], gobo: true, beam: 198, laser: 65, moves: [{ axis: [210, 35], duration: 380 }, { axis: [360, 60], duration: 380 }, { axis: [510, 35], duration: 380 }, { axis: [360, 15], duration: 380 }] },
        { ledRing: [158, 145], gobo: false, beam: 185, laser: 58, moves: [{ axis: [300, 35], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 35], duration: 380 }, { axis: [450, 15], duration: 380 }] },
      ],
    },
  },

  'disco+epic': {
    luminous: { head: 252, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.75 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 200, 0], duration: 180 }, { rgbw: [255, 255, 255, 80], duration: 100 }, { rgbw: [255, 60, 160], duration: 180 }, { rgbw: [255, 120, 0], duration: 180 }] },
        { colors: [{ rgbw: [255, 0, 180], duration: 180 }, { rgbw: [255, 160, 20], duration: 180 }, { rgbw: [255, 240, 0], duration: 180 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [255, 240, 200, 80], duration: 180 }, { rgbw: [255, 80, 100], duration: 180 }, { rgbw: [255, 140, 0], duration: 180 }, { rgbw: [255, 210, 0], duration: 180 }] },
      ],
      head: [
        { moves: [{ axis: [52, 56], duration: 400, easing: easeInExpo }, { axis: [458, 85], duration: 400, easing: easeInExpo }], colors: [64, 80], ledRing: [210, 232], gobo: 80 },
        { moves: [{ axis: [42, 56], duration: 380, easing: easeInExpo }, { axis: [255, 84], duration: 380, easing: easeInExpo }, { axis: [448, 72], duration: 380, easing: easeInExpo }, { axis: [62, 58], duration: 380, easing: easeInExpo }], colors: [80, 96], ledRing: [222, 242], gobo: 96 },
        { moves: [{ axis: [245, 76], duration: 400, easing: easeInExpo }, { axis: [58, 64], duration: 400, easing: easeInExpo }, { axis: [448, 90], duration: 400, easing: easeInExpo }], colors: [96, 64], ledRing: [228, 212], gobo: 112 },
      ],
      mini: [
        { ledRing: [200, 218], gobo: true, beam: 215, laser: 72, moves: [{ axis: [270, 35], duration: 400 }, { axis: [420, 60], duration: 400 }, { axis: [570, 35], duration: 400 }, { axis: [420, 15], duration: 400 }] },
        { ledRing: [215, 232], gobo: true, beam: 228, laser: 78, moves: [{ axis: [225, 35], duration: 380 }, { axis: [375, 60], duration: 380 }, { axis: [525, 35], duration: 380 }, { axis: [375, 15], duration: 380 }] },
        { ledRing: [188, 202], gobo: false, beam: 202, laser: 65, moves: [{ axis: [315, 35], duration: 380 }, { axis: [465, 60], duration: 380 }, { axis: [615, 35], duration: 380 }, { axis: [465, 15], duration: 380 }] },
      ],
    },
  },

  'triphop+epic': {
    luminous: { head: 218, mini: 248, par: 185 },
    strobing: { threshold: 0.22, paceWeight: 0.3, energyWeight: 0.7, danceExp: 1.1 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 0, 220], duration: 500 }, { rgbw: [0, 60, 160], duration: 500 }, { rgbw: [160, 0, 100], duration: 500 }] },
        { colors: [{ rgbw: [100, 0, 200], duration: 600 }, { rgbw: [180, 0, 80], duration: 600 }, { rgbw: [40, 40, 160], duration: 600 }] },
        { colors: [{ rgbw: [140, 0, 240], duration: 500 }, { rgbw: [0, 80, 140], duration: 500 }, { rgbw: [180, 0, 120], duration: 500 }, { rgbw: [60, 0, 180], duration: 500 }] },
      ],
      head: [
        { moves: [{ axis: [88, 62], duration: 800, easing: easeInOutSine }, { axis: [445, 80], duration: 800, easing: easeInOutSine }], colors: [112, 48], ledRing: [125, 145], gobo: 32 },
        { moves: [{ axis: [70, 58], duration: 750, easing: easeInOutSine }, { axis: [435, 82], duration: 750, easing: easeInOutSine }, { axis: [228, 80], duration: 750, easing: easeInOutSine }], colors: [48, 112], ledRing: [112, 132], gobo: 16 },
        { moves: [{ axis: [78, 82], duration: 850, easing: easeInOutSine }, { axis: [285, 68], duration: 850, easing: easeInOutSine }, { axis: [155, 78], duration: 850, easing: easeInOutSine }, { axis: [420, 84], duration: 850, easing: easeInOutSine }], colors: [96, 32], ledRing: [138, 118], gobo: 0 },
      ],
      mini: [
        { ledRing: [68, 82], gobo: true, beam: 162, laser: 50, starfield: true, moves: [{ axis: [255, 60], duration: 800 }, { axis: [405, 75], duration: 800 }, { axis: [555, 60], duration: 800 }, { axis: [405, 50], duration: 800 }] },
        { ledRing: [55, 70], gobo: true, beam: 148, laser: 44, starfield: true, moves: [{ axis: [210, 60], duration: 750 }, { axis: [360, 75], duration: 750 }, { axis: [510, 60], duration: 750 }, { axis: [360, 50], duration: 750 }] },
        { ledRing: [78, 92], gobo: false, beam: 138, laser: 40, starfield: true, moves: [{ axis: [300, 60], duration: 850 }, { axis: [450, 75], duration: 850 }, { axis: [600, 60], duration: 850 }, { axis: [450, 50], duration: 850 }] },
      ],
    },
  },

  'metal+dark': {
    luminous: { head: 155, mini: 165, par: 95 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [10, 10, 10], duration: 700 }, { rgbw: [40, 0, 0], duration: 700 }, { rgbw: [0, 0, 0, 10], duration: 700 }] },
        { colors: [{ rgbw: [80, 0, 80], duration: 800 }, { rgbw: [10, 10, 10], duration: 800 }, { rgbw: [40, 0, 0], duration: 800 }, { rgbw: [0, 0, 0, 10], duration: 800 }] },
        { colors: [{ rgbw: [40, 0, 0], duration: 900 }, { rgbw: [80, 0, 80], duration: 900 }, { rgbw: [10, 10, 10], duration: 900 }] },
      ],
      head: [
        { moves: [{ axis: [250, 90], duration: 1300, easing: easeInExpo }, { axis: [290, 100], duration: 1300, easing: easeInExpo }], colors: [0, 16], ledRing: [75, 95], gobo: 0 },
        { moves: [{ axis: [235, 88], duration: 1500, easing: easeInExpo }, { axis: [305, 102], duration: 1500, easing: easeInExpo }, { axis: [262, 95], duration: 1500, easing: easeInExpo }], colors: [16, 0], ledRing: [85, 105], gobo: 16 },
        { moves: [{ axis: [268, 96], duration: 1400, easing: easeInExpo }, { axis: [242, 88], duration: 1400, easing: easeInExpo }, { axis: [298, 104], duration: 1400, easing: easeInExpo }], colors: [0, 16], ledRing: [70, 90], gobo: 0 },
      ],
      mini: [
        { ledRing: [72, 88], gobo: false, beam: 142, laser: 40, moves: [{ axis: [255, 75], duration: 900 }, { axis: [370, 85], duration: 900 }, { axis: [255, 70], duration: 900 }] },
        { ledRing: [80, 96], gobo: true, beam: 152, laser: 46, moves: [{ axis: [240, 75], duration: 1000 }, { axis: [355, 85], duration: 1000 }, { axis: [265, 70], duration: 1000 }] },
        { ledRing: [68, 84], gobo: false, beam: 148, laser: 42, moves: [{ axis: [270, 75], duration: 1100 }, { axis: [385, 85], duration: 1100 }, { axis: [250, 70], duration: 1100 }] },
      ],
    },
  },

  'hardrock+dark': {
    luminous: { head: 160, mini: 170, par: 98 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 0, 0], duration: 750 }, { rgbw: [60, 0, 20], duration: 750 }, { rgbw: [30, 0, 0], duration: 750 }] },
        { colors: [{ rgbw: [80, 10, 10], duration: 800 }, { rgbw: [60, 0, 20], duration: 800 }, { rgbw: [100, 0, 0], duration: 800 }, { rgbw: [30, 0, 0], duration: 800 }] },
        { colors: [{ rgbw: [100, 0, 0], duration: 850 }, { rgbw: [30, 0, 0], duration: 850 }, { rgbw: [80, 10, 10], duration: 850 }] },
      ],
      head: [
        { moves: [{ axis: [248, 92], duration: 1350, easing: easeInExpo }, { axis: [292, 102], duration: 1350, easing: easeInExpo }], colors: [16, 0], ledRing: [78, 98], gobo: 0 },
        { moves: [{ axis: [232, 88], duration: 1500, easing: easeInExpo }, { axis: [300, 104], duration: 1500, easing: easeInExpo }, { axis: [260, 96], duration: 1500, easing: easeInExpo }], colors: [0, 16], ledRing: [88, 108], gobo: 16 },
        { moves: [{ axis: [265, 98], duration: 1400, easing: easeInExpo }, { axis: [238, 90], duration: 1400, easing: easeInExpo }, { axis: [295, 106], duration: 1400, easing: easeInExpo }], colors: [16, 0], ledRing: [72, 92], gobo: 0 },
      ],
      mini: [
        { ledRing: [74, 90], gobo: true, beam: 148, laser: 42, moves: [{ axis: [255, 72], duration: 950 }, { axis: [365, 82], duration: 950 }, { axis: [255, 68], duration: 950 }] },
        { ledRing: [82, 98], gobo: false, beam: 158, laser: 48, moves: [{ axis: [238, 72], duration: 1050 }, { axis: [352, 82], duration: 1050 }, { axis: [268, 68], duration: 1050 }] },
        { ledRing: [70, 86], gobo: true, beam: 152, laser: 44, moves: [{ axis: [272, 72], duration: 1150 }, { axis: [382, 82], duration: 1150 }, { axis: [248, 68], duration: 1150 }] },
      ],
    },
  },

  'house+dark': {
    luminous: { head: 158, mini: 168, par: 96 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 20, 60], duration: 800 }, { rgbw: [0, 40, 80], duration: 800 }, { rgbw: [10, 10, 50], duration: 800 }] },
        { colors: [{ rgbw: [0, 0, 40], duration: 900 }, { rgbw: [0, 20, 60], duration: 900 }, { rgbw: [0, 40, 80], duration: 900 }, { rgbw: [10, 10, 50], duration: 900 }] },
        { colors: [{ rgbw: [0, 40, 80], duration: 750 }, { rgbw: [10, 10, 50], duration: 750 }, { rgbw: [0, 20, 60], duration: 750 }] },
      ],
      head: [
        { moves: [{ axis: [245, 94], duration: 1400, easing: easeInExpo }, { axis: [295, 104], duration: 1400, easing: easeInExpo }], colors: [96, 80], ledRing: [80, 100], gobo: 0 },
        { moves: [{ axis: [228, 90], duration: 1600, easing: easeInExpo }, { axis: [308, 106], duration: 1600, easing: easeInExpo }, { axis: [258, 98], duration: 1600, easing: easeInExpo }], colors: [80, 96], ledRing: [90, 112], gobo: 16 },
        { moves: [{ axis: [262, 100], duration: 1500, easing: easeInExpo }, { axis: [236, 92], duration: 1500, easing: easeInExpo }, { axis: [296, 108], duration: 1500, easing: easeInExpo }], colors: [96, 80], ledRing: [74, 94], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 92], gobo: true, beam: 150, laser: 44, starfield: true, moves: [{ axis: [255, 68], duration: 1000 }, { axis: [368, 78], duration: 1000 }, { axis: [255, 64], duration: 1000 }] },
        { ledRing: [84, 100], gobo: false, beam: 160, laser: 50, starfield: true, moves: [{ axis: [235, 68], duration: 1100 }, { axis: [350, 78], duration: 1100 }, { axis: [270, 64], duration: 1100 }] },
        { ledRing: [72, 88], gobo: true, beam: 155, laser: 46, starfield: true, moves: [{ axis: [268, 68], duration: 1200 }, { axis: [385, 78], duration: 1200 }, { axis: [245, 64], duration: 1200 }] },
      ],
    },
  },

  'chillout+dark': {
    luminous: { head: 155, mini: 162, par: 92 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [20, 30, 60], duration: 900 }, { rgbw: [10, 20, 50], duration: 900 }, { rgbw: [30, 30, 70], duration: 900 }] },
        { colors: [{ rgbw: [15, 25, 55], duration: 1000 }, { rgbw: [20, 30, 60], duration: 1000 }, { rgbw: [10, 20, 50], duration: 1000 }, { rgbw: [30, 30, 70], duration: 1000 }] },
        { colors: [{ rgbw: [30, 30, 70], duration: 850 }, { rgbw: [15, 25, 55], duration: 850 }, { rgbw: [20, 30, 60], duration: 850 }] },
      ],
      head: [
        { moves: [{ axis: [242, 96], duration: 1500, easing: easeInExpo }, { axis: [298, 106], duration: 1500, easing: easeInExpo }], colors: [96, 112], ledRing: [78, 98], gobo: 0 },
        { moves: [{ axis: [225, 92], duration: 1700, easing: easeInExpo }, { axis: [312, 108], duration: 1700, easing: easeInExpo }, { axis: [256, 100], duration: 1700, easing: easeInExpo }], colors: [112, 96], ledRing: [88, 108], gobo: 16 },
        { moves: [{ axis: [260, 102], duration: 1600, easing: easeInExpo }, { axis: [232, 94], duration: 1600, easing: easeInExpo }, { axis: [294, 110], duration: 1600, easing: easeInExpo }], colors: [96, 112], ledRing: [72, 92], gobo: 0 },
      ],
      mini: [
        { ledRing: [75, 92], gobo: false, beam: 148, laser: 42, starfield: true, moves: [{ axis: [255, 65], duration: 1100 }, { axis: [370, 76], duration: 1100 }, { axis: [255, 62], duration: 1100 }] },
        { ledRing: [85, 102], gobo: true, beam: 158, laser: 48, starfield: true, moves: [{ axis: [232, 65], duration: 1200 }, { axis: [348, 76], duration: 1200 }, { axis: [272, 62], duration: 1200 }] },
        { ledRing: [70, 88], gobo: false, beam: 152, laser: 44, starfield: true, moves: [{ axis: [270, 65], duration: 1300 }, { axis: [388, 76], duration: 1300 }, { axis: [242, 62], duration: 1300 }] },
      ],
    },
  },

  'triphop+dark': {
    luminous: { head: 160, mini: 172, par: 96 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 0, 80], duration: 850 }, { rgbw: [20, 0, 60], duration: 850 }, { rgbw: [60, 10, 100], duration: 850 }] },
        { colors: [{ rgbw: [30, 0, 50], duration: 950 }, { rgbw: [40, 0, 80], duration: 950 }, { rgbw: [20, 0, 60], duration: 950 }, { rgbw: [60, 10, 100], duration: 950 }] },
        { colors: [{ rgbw: [60, 10, 100], duration: 800 }, { rgbw: [30, 0, 50], duration: 800 }, { rgbw: [40, 0, 80], duration: 800 }] },
      ],
      head: [
        { moves: [{ axis: [244, 94], duration: 1450, easing: easeInExpo }, { axis: [296, 104], duration: 1450, easing: easeInExpo }], colors: [112, 96], ledRing: [82, 102], gobo: 16 },
        { moves: [{ axis: [226, 90], duration: 1650, easing: easeInExpo }, { axis: [310, 106], duration: 1650, easing: easeInExpo }, { axis: [257, 98], duration: 1650, easing: easeInExpo }], colors: [96, 112], ledRing: [92, 112], gobo: 0 },
        { moves: [{ axis: [263, 100], duration: 1550, easing: easeInExpo }, { axis: [234, 92], duration: 1550, easing: easeInExpo }, { axis: [297, 108], duration: 1550, easing: easeInExpo }], colors: [112, 96], ledRing: [74, 94], gobo: 16 },
      ],
      mini: [
        { ledRing: [78, 94], gobo: true, beam: 152, laser: 46, starfield: true, moves: [{ axis: [255, 67], duration: 1050 }, { axis: [372, 78], duration: 1050 }, { axis: [255, 63], duration: 1050 }] },
        { ledRing: [86, 104], gobo: false, beam: 162, laser: 52, starfield: true, moves: [{ axis: [234, 67], duration: 1150 }, { axis: [352, 78], duration: 1150 }, { axis: [274, 63], duration: 1150 }] },
        { ledRing: [72, 90], gobo: true, beam: 156, laser: 48, starfield: true, moves: [{ axis: [267, 67], duration: 1250 }, { axis: [386, 78], duration: 1250 }, { axis: [244, 63], duration: 1250 }] },
      ],
    },
  },

  'newage+dark': {
    luminous: { head: 152, mini: 160, par: 90 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 20, 80], duration: 950 }, { rgbw: [10, 30, 60], duration: 950 }, { rgbw: [0, 10, 100], duration: 950 }] },
        { colors: [{ rgbw: [5, 20, 70], duration: 1050 }, { rgbw: [0, 20, 80], duration: 1050 }, { rgbw: [10, 30, 60], duration: 1050 }, { rgbw: [0, 10, 100], duration: 1050 }] },
        { colors: [{ rgbw: [0, 10, 100], duration: 900 }, { rgbw: [5, 20, 70], duration: 900 }, { rgbw: [0, 20, 80], duration: 900 }] },
      ],
      head: [
        { moves: [{ axis: [243, 97], duration: 1600, easing: easeInExpo }, { axis: [297, 107], duration: 1600, easing: easeInExpo }], colors: [96, 80], ledRing: [76, 96], gobo: 0 },
        { moves: [{ axis: [226, 93], duration: 1800, easing: easeInExpo }, { axis: [312, 109], duration: 1800, easing: easeInExpo }, { axis: [256, 101], duration: 1800, easing: easeInExpo }], colors: [80, 96], ledRing: [86, 106], gobo: 16 },
        { moves: [{ axis: [261, 103], duration: 1700, easing: easeInExpo }, { axis: [233, 95], duration: 1700, easing: easeInExpo }, { axis: [295, 111], duration: 1700, easing: easeInExpo }], colors: [96, 80], ledRing: [70, 90], gobo: 0 },
      ],
      mini: [
        { ledRing: [74, 90], gobo: false, beam: 146, laser: 40, starfield: true, moves: [{ axis: [255, 64], duration: 1150 }, { axis: [374, 75], duration: 1150 }, { axis: [255, 61], duration: 1150 }] },
        { ledRing: [84, 100], gobo: true, beam: 156, laser: 46, starfield: true, moves: [{ axis: [231, 64], duration: 1250 }, { axis: [350, 75], duration: 1250 }, { axis: [273, 61], duration: 1250 }] },
        { ledRing: [70, 86], gobo: false, beam: 150, laser: 42, starfield: true, moves: [{ axis: [269, 64], duration: 1350 }, { axis: [390, 75], duration: 1350 }, { axis: [243, 61], duration: 1350 }] },
      ],
    },
  },

  'energetic+dark': {
    luminous: { head: 168, mini: 180, par: 105 },
    strobing: { threshold: 0.35, paceWeight: 0.25, energyWeight: 0.75, danceExp: 1.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 20, 0], duration: 700 }, { rgbw: [60, 0, 0], duration: 700 }, { rgbw: [100, 30, 10], duration: 700 }] },
        { colors: [{ rgbw: [40, 0, 0], duration: 800 }, { rgbw: [80, 20, 0], duration: 800 }, { rgbw: [60, 0, 0], duration: 800 }, { rgbw: [100, 30, 10], duration: 800 }] },
        { colors: [{ rgbw: [100, 30, 10], duration: 750 }, { rgbw: [40, 0, 0], duration: 750 }, { rgbw: [80, 20, 0], duration: 750 }] },
      ],
      head: [
        { moves: [{ axis: [246, 92], duration: 1350, easing: easeInExpo }, { axis: [294, 102], duration: 1350, easing: easeInExpo }], colors: [16, 32], ledRing: [84, 104], gobo: 0 },
        { moves: [{ axis: [228, 88], duration: 1550, easing: easeInExpo }, { axis: [308, 104], duration: 1550, easing: easeInExpo }, { axis: [259, 96], duration: 1550, easing: easeInExpo }], colors: [32, 16], ledRing: [94, 114], gobo: 16 },
        { moves: [{ axis: [264, 98], duration: 1450, easing: easeInExpo }, { axis: [236, 90], duration: 1450, easing: easeInExpo }, { axis: [296, 106], duration: 1450, easing: easeInExpo }], colors: [16, 32], ledRing: [76, 96], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 96], gobo: true, beam: 155, laser: 48, moves: [{ axis: [255, 70], duration: 950 }, { axis: [366, 80], duration: 950 }, { axis: [255, 66], duration: 950 }] },
        { ledRing: [88, 106], gobo: false, beam: 165, laser: 54, moves: [{ axis: [237, 70], duration: 1050 }, { axis: [353, 80], duration: 1050 }, { axis: [271, 66], duration: 1050 }] },
        { ledRing: [74, 92], gobo: true, beam: 160, laser: 50, moves: [{ axis: [266, 70], duration: 1150 }, { axis: [383, 80], duration: 1150 }, { axis: [247, 66], duration: 1150 }] },
      ],
    },
  },

  'metal+upbeat': {
    luminous: { head: 245, mini: 255, par: 200 },
    strobing: { threshold: 0.20, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 255, 255], duration: 220 }, { rgbw: [0, 255, 255], duration: 220 }, { rgbw: [255, 0, 0], duration: 220 }] },
        { colors: [{ rgbw: [200, 200, 255], duration: 200 }, { rgbw: [255, 255, 255], duration: 200 }, { rgbw: [0, 255, 255], duration: 200 }, { rgbw: [255, 0, 0], duration: 200 }] },
        { colors: [{ rgbw: [255, 0, 0], duration: 240 }, { rgbw: [200, 200, 255], duration: 240 }, { rgbw: [255, 255, 255], duration: 240 }] },
      ],
      head: [
        { moves: [{ axis: [50, 55], duration: 480, easing: easeInExpo }, { axis: [460, 88], duration: 480, easing: easeInExpo }], colors: [0, 80], ledRing: [180, 210], gobo: 32 },
        { moves: [{ axis: [40, 55], duration: 460, easing: easeInExpo }, { axis: [260, 86], duration: 460, easing: easeInExpo }, { axis: [450, 74], duration: 460, easing: easeInExpo }], colors: [80, 0], ledRing: [195, 222], gobo: 48 },
        { moves: [{ axis: [248, 78], duration: 500, easing: easeInExpo }, { axis: [55, 66], duration: 500, easing: easeInExpo }, { axis: [452, 92], duration: 500, easing: easeInExpo }], colors: [0, 80], ledRing: [172, 200], gobo: 16 },
      ],
      mini: [
        { ledRing: [195, 220], gobo: true, beam: 210, laser: 70, moves: [{ axis: [270, 32], duration: 480 }, { axis: [420, 58], duration: 480 }, { axis: [570, 32], duration: 480 }, { axis: [420, 12], duration: 480 }] },
        { ledRing: [210, 228], gobo: true, beam: 225, laser: 78, moves: [{ axis: [228, 32], duration: 460 }, { axis: [378, 58], duration: 460 }, { axis: [528, 32], duration: 460 }, { axis: [378, 12], duration: 460 }] },
        { ledRing: [185, 208], gobo: false, beam: 200, laser: 64, moves: [{ axis: [318, 32], duration: 500 }, { axis: [468, 58], duration: 500 }, { axis: [618, 32], duration: 500 }, { axis: [468, 12], duration: 500 }] },
      ],
    },
  },

  'hardrock+upbeat': {
    luminous: { head: 242, mini: 252, par: 198 },
    strobing: { threshold: 0.21, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 0], duration: 230 }, { rgbw: [255, 100, 0], duration: 230 }, { rgbw: [255, 255, 255], duration: 230 }] },
        { colors: [{ rgbw: [200, 0, 0], duration: 210 }, { rgbw: [255, 0, 0], duration: 210 }, { rgbw: [255, 100, 0], duration: 210 }, { rgbw: [255, 255, 255], duration: 210 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 250 }, { rgbw: [200, 0, 0], duration: 250 }, { rgbw: [255, 0, 0], duration: 250 }] },
      ],
      head: [
        { moves: [{ axis: [52, 57], duration: 490, easing: easeInExpo }, { axis: [455, 86], duration: 490, easing: easeInExpo }], colors: [16, 32], ledRing: [175, 205], gobo: 32 },
        { moves: [{ axis: [42, 57], duration: 470, easing: easeInExpo }, { axis: [258, 84], duration: 470, easing: easeInExpo }, { axis: [448, 72], duration: 470, easing: easeInExpo }], colors: [32, 16], ledRing: [188, 218], gobo: 48 },
        { moves: [{ axis: [246, 76], duration: 510, easing: easeInExpo }, { axis: [56, 64], duration: 510, easing: easeInExpo }, { axis: [450, 90], duration: 510, easing: easeInExpo }], colors: [16, 32], ledRing: [168, 198], gobo: 16 },
      ],
      mini: [
        { ledRing: [192, 218], gobo: true, beam: 208, laser: 68, moves: [{ axis: [272, 34], duration: 490 }, { axis: [422, 60], duration: 490 }, { axis: [572, 34], duration: 490 }, { axis: [422, 14], duration: 490 }] },
        { ledRing: [208, 226], gobo: true, beam: 222, laser: 76, moves: [{ axis: [230, 34], duration: 470 }, { axis: [380, 60], duration: 470 }, { axis: [530, 34], duration: 470 }, { axis: [380, 14], duration: 470 }] },
        { ledRing: [182, 206], gobo: false, beam: 198, laser: 62, moves: [{ axis: [320, 34], duration: 510 }, { axis: [470, 60], duration: 510 }, { axis: [620, 34], duration: 510 }, { axis: [470, 14], duration: 510 }] },
      ],
    },
  },

  'house+upbeat': {
    luminous: { head: 240, mini: 252, par: 196 },
    strobing: { threshold: 0.22, paceWeight: 0.38, energyWeight: 0.62, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 255], duration: 220 }, { rgbw: [0, 255, 255], duration: 220 }, { rgbw: [255, 255, 0], duration: 220 }] },
        { colors: [{ rgbw: [0, 200, 255], duration: 200 }, { rgbw: [255, 0, 255], duration: 200 }, { rgbw: [0, 255, 255], duration: 200 }, { rgbw: [255, 255, 0], duration: 200 }] },
        { colors: [{ rgbw: [255, 255, 0], duration: 240 }, { rgbw: [0, 200, 255], duration: 240 }, { rgbw: [255, 0, 255], duration: 240 }] },
      ],
      head: [
        { moves: [{ axis: [54, 58], duration: 470, easing: easeInExpo }, { axis: [456, 87], duration: 470, easing: easeInExpo }], colors: [128, 80], ledRing: [182, 212], gobo: 48 },
        { moves: [{ axis: [44, 58], duration: 450, easing: easeInExpo }, { axis: [258, 85], duration: 450, easing: easeInExpo }, { axis: [449, 73], duration: 450, easing: easeInExpo }], colors: [80, 128], ledRing: [196, 224], gobo: 64 },
        { moves: [{ axis: [247, 77], duration: 490, easing: easeInExpo }, { axis: [57, 65], duration: 490, easing: easeInExpo }, { axis: [451, 91], duration: 490, easing: easeInExpo }], colors: [128, 80], ledRing: [175, 204], gobo: 32 },
      ],
      mini: [
        { ledRing: [198, 222], gobo: true, beam: 212, laser: 72, moves: [{ axis: [268, 33], duration: 470 }, { axis: [418, 59], duration: 470 }, { axis: [568, 33], duration: 470 }, { axis: [418, 13], duration: 470 }] },
        { ledRing: [212, 230], gobo: true, beam: 226, laser: 80, moves: [{ axis: [226, 33], duration: 450 }, { axis: [376, 59], duration: 450 }, { axis: [526, 33], duration: 450 }, { axis: [376, 13], duration: 450 }] },
        { ledRing: [188, 210], gobo: false, beam: 204, laser: 66, moves: [{ axis: [316, 33], duration: 490 }, { axis: [466, 59], duration: 490 }, { axis: [616, 33], duration: 490 }, { axis: [466, 13], duration: 490 }] },
      ],
    },
  },

  'disco+upbeat': {
    luminous: { head: 248, mini: 255, par: 205 },
    strobing: { threshold: 0.18, paceWeight: 0.40, energyWeight: 0.60, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 150], duration: 210 }, { rgbw: [255, 200, 0], duration: 210 }, { rgbw: [0, 200, 255], duration: 210 }] },
        { colors: [{ rgbw: [200, 0, 255], duration: 190 }, { rgbw: [255, 0, 150], duration: 190 }, { rgbw: [255, 200, 0], duration: 190 }, { rgbw: [0, 200, 255], duration: 190 }] },
        { colors: [{ rgbw: [0, 200, 255], duration: 230 }, { rgbw: [200, 0, 255], duration: 230 }, { rgbw: [255, 0, 150], duration: 230 }] },
      ],
      head: [
        { moves: [{ axis: [50, 56], duration: 460, easing: easeInExpo }, { axis: [460, 88], duration: 460, easing: easeInExpo }], colors: [128, 48], ledRing: [205, 232], gobo: 80 },
        { moves: [{ axis: [40, 56], duration: 440, easing: easeInExpo }, { axis: [256, 86], duration: 440, easing: easeInExpo }, { axis: [450, 74], duration: 440, easing: easeInExpo }], colors: [48, 128], ledRing: [218, 240], gobo: 96 },
        { moves: [{ axis: [245, 76], duration: 480, easing: easeInExpo }, { axis: [54, 64], duration: 480, easing: easeInExpo }, { axis: [452, 92], duration: 480, easing: easeInExpo }], colors: [128, 48], ledRing: [196, 222], gobo: 64 },
      ],
      mini: [
        { ledRing: [202, 224], gobo: true, beam: 218, laser: 74, moves: [{ axis: [266, 32], duration: 460 }, { axis: [416, 58], duration: 460 }, { axis: [566, 32], duration: 460 }, { axis: [416, 12], duration: 460 }] },
        { ledRing: [216, 234], gobo: true, beam: 230, laser: 82, moves: [{ axis: [224, 32], duration: 440 }, { axis: [374, 58], duration: 440 }, { axis: [524, 32], duration: 440 }, { axis: [374, 12], duration: 440 }] },
        { ledRing: [192, 214], gobo: false, beam: 206, laser: 68, moves: [{ axis: [314, 32], duration: 480 }, { axis: [464, 58], duration: 480 }, { axis: [614, 32], duration: 480 }, { axis: [464, 12], duration: 480 }] },
      ],
    },
  },

  'chillout+upbeat': {
    luminous: { head: 232, mini: 248, par: 188 },
    strobing: { threshold: 0.23, paceWeight: 0.36, energyWeight: 0.64, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 200, 255], duration: 280 }, { rgbw: [150, 255, 200], duration: 280 }, { rgbw: [200, 150, 255], duration: 280 }] },
        { colors: [{ rgbw: [100, 255, 200], duration: 260 }, { rgbw: [100, 200, 255], duration: 260 }, { rgbw: [150, 255, 200], duration: 260 }, { rgbw: [200, 150, 255], duration: 260 }] },
        { colors: [{ rgbw: [200, 150, 255], duration: 300 }, { rgbw: [100, 255, 200], duration: 300 }, { rgbw: [100, 200, 255], duration: 300 }] },
      ],
      head: [
        { moves: [{ axis: [58, 62], duration: 520, easing: easeInExpo }, { axis: [452, 84], duration: 520, easing: easeInExpo }], colors: [80, 64], ledRing: [165, 195], gobo: 32 },
        { moves: [{ axis: [48, 62], duration: 500, easing: easeInExpo }, { axis: [262, 82], duration: 500, easing: easeInExpo }, { axis: [444, 70], duration: 500, easing: easeInExpo }], colors: [64, 80], ledRing: [178, 208], gobo: 48 },
        { moves: [{ axis: [252, 74], duration: 540, easing: easeInExpo }, { axis: [62, 62], duration: 540, easing: easeInExpo }, { axis: [444, 88], duration: 540, easing: easeInExpo }], colors: [80, 64], ledRing: [158, 188], gobo: 16 },
      ],
      mini: [
        { ledRing: [178, 202], gobo: true, beam: 198, laser: 62, moves: [{ axis: [274, 36], duration: 520 }, { axis: [424, 62], duration: 520 }, { axis: [574, 36], duration: 520 }, { axis: [424, 16], duration: 520 }] },
        { ledRing: [192, 216], gobo: false, beam: 212, laser: 70, moves: [{ axis: [232, 36], duration: 500 }, { axis: [382, 62], duration: 500 }, { axis: [532, 36], duration: 500 }, { axis: [382, 16], duration: 500 }] },
        { ledRing: [168, 192], gobo: true, beam: 204, laser: 66, moves: [{ axis: [322, 36], duration: 540 }, { axis: [472, 62], duration: 540 }, { axis: [622, 36], duration: 540 }, { axis: [472, 16], duration: 540 }] },
      ],
    },
  },

  'triphop+upbeat': {
    luminous: { head: 235, mini: 250, par: 190 },
    strobing: { threshold: 0.22, paceWeight: 0.37, energyWeight: 0.63, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [150, 0, 255], duration: 260 }, { rgbw: [0, 200, 200], duration: 260 }, { rgbw: [100, 50, 255], duration: 260 }] },
        { colors: [{ rgbw: [0, 150, 200], duration: 240 }, { rgbw: [150, 0, 255], duration: 240 }, { rgbw: [0, 200, 200], duration: 240 }, { rgbw: [100, 50, 255], duration: 240 }] },
        { colors: [{ rgbw: [100, 50, 255], duration: 280 }, { rgbw: [0, 150, 200], duration: 280 }, { rgbw: [150, 0, 255], duration: 280 }] },
      ],
      head: [
        { moves: [{ axis: [56, 60], duration: 500, easing: easeInExpo }, { axis: [454, 86], duration: 500, easing: easeInExpo }], colors: [112, 80], ledRing: [170, 200], gobo: 48 },
        { moves: [{ axis: [46, 60], duration: 480, easing: easeInExpo }, { axis: [260, 84], duration: 480, easing: easeInExpo }, { axis: [446, 72], duration: 480, easing: easeInExpo }], colors: [80, 112], ledRing: [184, 214], gobo: 64 },
        { moves: [{ axis: [250, 76], duration: 520, easing: easeInExpo }, { axis: [60, 64], duration: 520, easing: easeInExpo }, { axis: [448, 90], duration: 520, easing: easeInExpo }], colors: [112, 80], ledRing: [162, 192], gobo: 32 },
      ],
      mini: [
        { ledRing: [182, 206], gobo: true, beam: 202, laser: 66, moves: [{ axis: [272, 35], duration: 500 }, { axis: [422, 61], duration: 500 }, { axis: [572, 35], duration: 500 }, { axis: [422, 15], duration: 500 }] },
        { ledRing: [196, 220], gobo: false, beam: 216, laser: 74, moves: [{ axis: [230, 35], duration: 480 }, { axis: [380, 61], duration: 480 }, { axis: [530, 35], duration: 480 }, { axis: [380, 15], duration: 480 }] },
        { ledRing: [172, 196], gobo: true, beam: 208, laser: 70, moves: [{ axis: [318, 35], duration: 520 }, { axis: [468, 61], duration: 520 }, { axis: [618, 35], duration: 520 }, { axis: [468, 15], duration: 520 }] },
      ],
    },
  },

  'energetic+upbeat': {
    luminous: { head: 250, mini: 255, par: 208 },
    strobing: { threshold: 0.18, paceWeight: 0.40, energyWeight: 0.60, danceExp: 0.9 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 255, 0], duration: 200 }, { rgbw: [255, 0, 255], duration: 200 }, { rgbw: [0, 255, 255], duration: 200 }] },
        { colors: [{ rgbw: [255, 100, 0], duration: 180 }, { rgbw: [255, 255, 0], duration: 180 }, { rgbw: [255, 0, 255], duration: 180 }, { rgbw: [0, 255, 255], duration: 180 }] },
        { colors: [{ rgbw: [0, 255, 255], duration: 220 }, { rgbw: [255, 100, 0], duration: 220 }, { rgbw: [255, 255, 0], duration: 220 }] },
      ],
      head: [
        { moves: [{ axis: [48, 54], duration: 450, easing: easeInExpo }, { axis: [462, 89], duration: 450, easing: easeInExpo }], colors: [48, 128], ledRing: [208, 236], gobo: 96 },
        { moves: [{ axis: [38, 54], duration: 430, easing: easeInExpo }, { axis: [254, 87], duration: 430, easing: easeInExpo }, { axis: [452, 75], duration: 430, easing: easeInExpo }], colors: [128, 48], ledRing: [222, 244], gobo: 112 },
        { moves: [{ axis: [243, 75], duration: 470, easing: easeInExpo }, { axis: [52, 63], duration: 470, easing: easeInExpo }, { axis: [454, 93], duration: 470, easing: easeInExpo }], colors: [48, 128], ledRing: [198, 226], gobo: 80 },
      ],
      mini: [
        { ledRing: [206, 228], gobo: true, beam: 222, laser: 78, moves: [{ axis: [264, 30], duration: 450 }, { axis: [414, 56], duration: 450 }, { axis: [564, 30], duration: 450 }, { axis: [414, 10], duration: 450 }] },
        { ledRing: [220, 238], gobo: true, beam: 234, laser: 86, moves: [{ axis: [222, 30], duration: 430 }, { axis: [372, 56], duration: 430 }, { axis: [522, 30], duration: 430 }, { axis: [372, 10], duration: 430 }] },
        { ledRing: [196, 218], gobo: false, beam: 212, laser: 72, moves: [{ axis: [312, 30], duration: 470 }, { axis: [462, 56], duration: 470 }, { axis: [612, 30], duration: 470 }, { axis: [462, 10], duration: 470 }] },
      ],
    },
  },

  'metal+epic': {
    luminous: { head: 255, mini: 255, par: 215 },
    strobing: { threshold: 0.12, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 255, 255], duration: 120 }, { rgbw: [255, 0, 0], duration: 120 }, { rgbw: [200, 200, 200], duration: 120 }, { rgbw: [255, 50, 0], duration: 120 }] },
        { colors: [{ rgbw: [255, 0, 0], duration: 100 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [200, 200, 200], duration: 120 }, { rgbw: [255, 50, 0], duration: 100 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 100 }, { rgbw: [255, 50, 0], duration: 100 }, { rgbw: [255, 0, 0], duration: 120 }, { rgbw: [200, 200, 200], duration: 100 }] },
      ],
      head: [
        { moves: [{ axis: [48, 52], duration: 280, easing: easeInExpo }, { axis: [462, 90], duration: 280, easing: easeInExpo }], colors: [0, 16], ledRing: [185, 210], gobo: 32 },
        { moves: [{ axis: [38, 54], duration: 280, easing: easeInExpo }, { axis: [455, 86], duration: 280, easing: easeInExpo }, { axis: [228, 108], duration: 280, easing: easeInExpo }], colors: [16, 0], ledRing: [200, 178], gobo: 16 },
        { moves: [{ axis: [245, 58], duration: 280, easing: easeInExpo }, { axis: [55, 90], duration: 280, easing: easeInExpo }, { axis: [462, 72], duration: 280, easing: easeInExpo }], colors: [0, 16], ledRing: [192, 215], gobo: 48 },
      ],
      mini: [
        { ledRing: [185, 205], gobo: true, beam: 232, laser: 82, moves: [{ axis: [255, 30], duration: 320 }, { axis: [405, 58], duration: 320 }, { axis: [555, 30], duration: 320 }, { axis: [405, 12], duration: 320 }] },
        { ledRing: [198, 218], gobo: true, beam: 220, laser: 75, moves: [{ axis: [210, 30], duration: 300 }, { axis: [360, 58], duration: 300 }, { axis: [510, 30], duration: 300 }, { axis: [360, 12], duration: 300 }] },
        { ledRing: [172, 192], gobo: false, beam: 212, laser: 68, moves: [{ axis: [300, 30], duration: 320 }, { axis: [450, 58], duration: 320 }, { axis: [600, 30], duration: 320 }, { axis: [450, 12], duration: 320 }] },
      ],
    },
  },

  'hardrock+epic': {
    luminous: { head: 255, mini: 255, par: 212 },
    strobing: { threshold: 0.13, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 0], duration: 130 }, { rgbw: [255, 80, 0], duration: 130 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [180, 0, 0], duration: 130 }] },
        { colors: [{ rgbw: [255, 80, 0], duration: 120 }, { rgbw: [255, 0, 0], duration: 120 }, { rgbw: [180, 0, 0], duration: 120 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [255, 0, 0], duration: 120 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [255, 80, 0], duration: 130 }, { rgbw: [180, 0, 0], duration: 120 }] },
      ],
      head: [
        { moves: [{ axis: [50, 54], duration: 300, easing: easeInExpo }, { axis: [458, 88], duration: 300, easing: easeInExpo }], colors: [16, 32], ledRing: [178, 202], gobo: 16 },
        { moves: [{ axis: [40, 56], duration: 300, easing: easeInExpo }, { axis: [448, 84], duration: 300, easing: easeInExpo }, { axis: [232, 110], duration: 300, easing: easeInExpo }], colors: [32, 16], ledRing: [192, 172], gobo: 32 },
        { moves: [{ axis: [242, 60], duration: 300, easing: easeInExpo }, { axis: [52, 88], duration: 300, easing: easeInExpo }, { axis: [458, 74], duration: 300, easing: easeInExpo }], colors: [16, 32], ledRing: [185, 208], gobo: 16 },
      ],
      mini: [
        { ledRing: [178, 198], gobo: true, beam: 228, laser: 80, moves: [{ axis: [255, 32], duration: 340 }, { axis: [405, 60], duration: 340 }, { axis: [555, 32], duration: 340 }, { axis: [405, 14], duration: 340 }] },
        { ledRing: [192, 212], gobo: true, beam: 215, laser: 72, moves: [{ axis: [210, 32], duration: 320 }, { axis: [360, 60], duration: 320 }, { axis: [510, 32], duration: 320 }, { axis: [360, 14], duration: 320 }] },
        { ledRing: [165, 185], gobo: false, beam: 205, laser: 65, moves: [{ axis: [300, 32], duration: 340 }, { axis: [450, 60], duration: 340 }, { axis: [600, 32], duration: 340 }, { axis: [450, 14], duration: 340 }] },
      ],
    },
  },

  'house+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.13, paceWeight: 0.43, energyWeight: 0.57, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 255, 255], duration: 140 }, { rgbw: [255, 0, 255], duration: 140 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [0, 200, 255], duration: 140 }] },
        { colors: [{ rgbw: [255, 0, 255], duration: 130 }, { rgbw: [0, 255, 255], duration: 130 }, { rgbw: [0, 200, 255], duration: 140 }, { rgbw: [255, 255, 255], duration: 80 }] },
        { colors: [{ rgbw: [0, 200, 255], duration: 140 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [0, 255, 255], duration: 140 }, { rgbw: [255, 0, 255], duration: 140 }] },
      ],
      head: [
        { moves: [{ axis: [52, 54], duration: 320, easing: easeInExpo }, { axis: [460, 86], duration: 320, easing: easeInExpo }], colors: [80, 128], ledRing: [188, 212], gobo: 32 },
        { moves: [{ axis: [42, 56], duration: 320, easing: easeInExpo }, { axis: [450, 82], duration: 320, easing: easeInExpo }, { axis: [235, 108], duration: 320, easing: easeInExpo }], colors: [128, 80], ledRing: [202, 182], gobo: 16 },
        { moves: [{ axis: [248, 60], duration: 320, easing: easeInExpo }, { axis: [54, 88], duration: 320, easing: easeInExpo }, { axis: [460, 72], duration: 320, easing: easeInExpo }], colors: [80, 128], ledRing: [195, 218], gobo: 48 },
      ],
      mini: [
        { ledRing: [182, 202], gobo: true, beam: 225, laser: 78, moves: [{ axis: [255, 32], duration: 360 }, { axis: [405, 60], duration: 360 }, { axis: [555, 32], duration: 360 }, { axis: [405, 14], duration: 360 }] },
        { ledRing: [195, 215], gobo: true, beam: 212, laser: 70, moves: [{ axis: [210, 32], duration: 340 }, { axis: [360, 60], duration: 340 }, { axis: [510, 32], duration: 340 }, { axis: [360, 14], duration: 340 }] },
        { ledRing: [170, 188], gobo: false, beam: 202, laser: 65, moves: [{ axis: [300, 32], duration: 360 }, { axis: [450, 60], duration: 360 }, { axis: [600, 32], duration: 360 }, { axis: [450, 14], duration: 360 }] },
      ],
    },
  },

  'chillout+epic': {
    luminous: { head: 255, mini: 255, par: 212 },
    strobing: { threshold: 0.14, paceWeight: 0.42, energyWeight: 0.58, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [0, 100, 255], duration: 150 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [0, 200, 200], duration: 150 }, { rgbw: [50, 150, 255], duration: 150 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 80 }, { rgbw: [0, 100, 255], duration: 150 }, { rgbw: [50, 150, 255], duration: 150 }, { rgbw: [0, 200, 200], duration: 150 }] },
        { colors: [{ rgbw: [0, 200, 200], duration: 160 }, { rgbw: [50, 150, 255], duration: 160 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [0, 100, 255], duration: 160 }] },
      ],
      head: [
        { moves: [{ axis: [54, 56], duration: 350, easing: easeInExpo }, { axis: [462, 88], duration: 350, easing: easeInExpo }], colors: [96, 80], ledRing: [172, 195], gobo: 16 },
        { moves: [{ axis: [44, 58], duration: 350, easing: easeInExpo }, { axis: [452, 84], duration: 350, easing: easeInExpo }, { axis: [238, 110], duration: 350, easing: easeInExpo }], colors: [80, 96], ledRing: [185, 165], gobo: 32 },
        { moves: [{ axis: [250, 62], duration: 350, easing: easeInExpo }, { axis: [56, 90], duration: 350, easing: easeInExpo }, { axis: [462, 74], duration: 350, easing: easeInExpo }], colors: [96, 80], ledRing: [178, 202], gobo: 0 },
      ],
      mini: [
        { ledRing: [165, 185], gobo: true, beam: 220, laser: 75, moves: [{ axis: [255, 32], duration: 380 }, { axis: [405, 60], duration: 380 }, { axis: [555, 32], duration: 380 }, { axis: [405, 14], duration: 380 }] },
        { ledRing: [178, 198], gobo: true, beam: 208, laser: 68, moves: [{ axis: [210, 32], duration: 360 }, { axis: [360, 60], duration: 360 }, { axis: [510, 32], duration: 360 }, { axis: [360, 14], duration: 360 }] },
        { ledRing: [155, 172], gobo: false, beam: 198, laser: 62, moves: [{ axis: [300, 32], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 32], duration: 380 }, { axis: [450, 14], duration: 380 }] },
      ],
    },
  },

  'newage+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.14, paceWeight: 0.41, energyWeight: 0.59, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 220, 255], duration: 160 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [150, 200, 255], duration: 160 }, { rgbw: [220, 230, 255], duration: 160 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 100 }, { rgbw: [150, 200, 255], duration: 170 }, { rgbw: [220, 230, 255], duration: 170 }, { rgbw: [200, 220, 255], duration: 170 }] },
        { colors: [{ rgbw: [220, 230, 255], duration: 160 }, { rgbw: [200, 220, 255], duration: 160 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [150, 200, 255], duration: 160 }] },
      ],
      head: [
        { moves: [{ axis: [56, 58], duration: 380, easing: easeInExpo }, { axis: [464, 90], duration: 380, easing: easeInExpo }], colors: [0, 96], ledRing: [162, 185], gobo: 16 },
        { moves: [{ axis: [46, 60], duration: 380, easing: easeInExpo }, { axis: [454, 86], duration: 380, easing: easeInExpo }, { axis: [240, 112], duration: 380, easing: easeInExpo }], colors: [96, 0], ledRing: [175, 155], gobo: 0 },
        { moves: [{ axis: [252, 64], duration: 380, easing: easeInExpo }, { axis: [58, 92], duration: 380, easing: easeInExpo }, { axis: [464, 76], duration: 380, easing: easeInExpo }], colors: [0, 96], ledRing: [168, 192], gobo: 32 },
      ],
      mini: [
        { ledRing: [158, 178], gobo: true, beam: 215, laser: 72, moves: [{ axis: [255, 32], duration: 400 }, { axis: [405, 60], duration: 400 }, { axis: [555, 32], duration: 400 }, { axis: [405, 14], duration: 400 }] },
        { ledRing: [172, 192], gobo: true, beam: 202, laser: 65, moves: [{ axis: [210, 32], duration: 380 }, { axis: [360, 60], duration: 380 }, { axis: [510, 32], duration: 380 }, { axis: [360, 14], duration: 380 }] },
        { ledRing: [148, 165], gobo: false, beam: 192, laser: 60, moves: [{ axis: [300, 32], duration: 400 }, { axis: [450, 60], duration: 400 }, { axis: [600, 32], duration: 400 }, { axis: [450, 14], duration: 400 }] },
      ],
    },
  },

  'energetic+epic': {
    luminous: { head: 255, mini: 255, par: 215 },
    strobing: { threshold: 0.12, paceWeight: 0.44, energyWeight: 0.56, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 255, 0], duration: 110 }, { rgbw: [255, 255, 255], duration: 90 }, { rgbw: [255, 0, 255], duration: 110 }, { rgbw: [255, 200, 0], duration: 110 }] },
        { colors: [{ rgbw: [255, 0, 255], duration: 100 }, { rgbw: [255, 255, 0], duration: 110 }, { rgbw: [255, 255, 255], duration: 80 }, { rgbw: [255, 200, 0], duration: 110 }] },
        { colors: [{ rgbw: [255, 200, 0], duration: 110 }, { rgbw: [255, 0, 255], duration: 110 }, { rgbw: [255, 255, 0], duration: 100 }, { rgbw: [255, 255, 255], duration: 80 }] },
      ],
      head: [
        { moves: [{ axis: [46, 52], duration: 280, easing: easeInExpo }, { axis: [460, 88], duration: 280, easing: easeInExpo }], colors: [48, 0], ledRing: [195, 220], gobo: 48 },
        { moves: [{ axis: [36, 54], duration: 280, easing: easeInExpo }, { axis: [452, 84], duration: 280, easing: easeInExpo }, { axis: [230, 108], duration: 280, easing: easeInExpo }], colors: [0, 48], ledRing: [210, 190], gobo: 32 },
        { moves: [{ axis: [246, 58], duration: 280, easing: easeInExpo }, { axis: [50, 88], duration: 280, easing: easeInExpo }, { axis: [460, 72], duration: 280, easing: easeInExpo }], colors: [48, 0], ledRing: [202, 225], gobo: 64 },
      ],
      mini: [
        { ledRing: [192, 212], gobo: true, beam: 235, laser: 88, moves: [{ axis: [255, 28], duration: 320 }, { axis: [405, 56], duration: 320 }, { axis: [555, 28], duration: 320 }, { axis: [405, 10], duration: 320 }] },
        { ledRing: [205, 225], gobo: true, beam: 222, laser: 80, moves: [{ axis: [210, 28], duration: 300 }, { axis: [360, 56], duration: 300 }, { axis: [510, 28], duration: 300 }, { axis: [360, 10], duration: 300 }] },
        { ledRing: [178, 198], gobo: false, beam: 212, laser: 72, moves: [{ axis: [300, 28], duration: 320 }, { axis: [450, 56], duration: 320 }, { axis: [600, 28], duration: 320 }, { axis: [450, 10], duration: 320 }] },
      ],
    },
  },

  'classical+epic': {
    luminous: { head: 255, mini: 255, par: 212 },
    strobing: { threshold: 0.13, paceWeight: 0.41, energyWeight: 0.59, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 180, 0], duration: 150 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [200, 160, 20], duration: 150 }, { rgbw: [255, 240, 180], duration: 150 }] },
        { colors: [{ rgbw: [255, 255, 255], duration: 100 }, { rgbw: [220, 180, 0], duration: 160 }, { rgbw: [255, 240, 180], duration: 160 }, { rgbw: [200, 160, 20], duration: 160 }] },
        { colors: [{ rgbw: [200, 160, 20], duration: 150 }, { rgbw: [255, 240, 180], duration: 150 }, { rgbw: [255, 255, 255], duration: 100 }, { rgbw: [220, 180, 0], duration: 150 }] },
      ],
      head: [
        { moves: [{ axis: [54, 56], duration: 350, easing: easeInExpo }, { axis: [460, 88], duration: 350, easing: easeInExpo }], colors: [48, 0], ledRing: [168, 192], gobo: 16 },
        { moves: [{ axis: [44, 58], duration: 350, easing: easeInExpo }, { axis: [452, 84], duration: 350, easing: easeInExpo }, { axis: [236, 108], duration: 350, easing: easeInExpo }], colors: [0, 48], ledRing: [182, 162], gobo: 32 },
        { moves: [{ axis: [248, 62], duration: 350, easing: easeInExpo }, { axis: [56, 90], duration: 350, easing: easeInExpo }, { axis: [460, 74], duration: 350, easing: easeInExpo }], colors: [48, 0], ledRing: [175, 198], gobo: 0 },
      ],
      mini: [
        { ledRing: [162, 182], gobo: true, beam: 218, laser: 74, moves: [{ axis: [255, 32], duration: 380 }, { axis: [405, 60], duration: 380 }, { axis: [555, 32], duration: 380 }, { axis: [405, 14], duration: 380 }] },
        { ledRing: [175, 195], gobo: true, beam: 205, laser: 67, moves: [{ axis: [210, 32], duration: 360 }, { axis: [360, 60], duration: 360 }, { axis: [510, 32], duration: 360 }, { axis: [360, 14], duration: 360 }] },
        { ledRing: [152, 170], gobo: false, beam: 195, laser: 62, moves: [{ axis: [300, 32], duration: 380 }, { axis: [450, 60], duration: 380 }, { axis: [600, 32], duration: 380 }, { axis: [450, 14], duration: 380 }] },
      ],
    },
  },

  'dance+epic': {
    luminous: { head: 255, mini: 255, par: 210 },
    strobing: { threshold: 0.12, paceWeight: 0.43, energyWeight: 0.57, danceExp: 0.7 },
    variants: {
      par: [
        { colors: [{ rgbw: [255, 0, 200], duration: 130 }, { rgbw: [0, 255, 255], duration: 130 }, { rgbw: [255, 220, 0], duration: 130 }, { rgbw: [200, 0, 255], duration: 130 }] },
        { colors: [{ rgbw: [0, 255, 255], duration: 120 }, { rgbw: [255, 0, 200], duration: 130 }, { rgbw: [200, 0, 255], duration: 130 }, { rgbw: [255, 220, 0], duration: 120 }] },
        { colors: [{ rgbw: [255, 220, 0], duration: 130 }, { rgbw: [200, 0, 255], duration: 130 }, { rgbw: [255, 0, 200], duration: 120 }, { rgbw: [0, 255, 255], duration: 130 }] },
      ],
      head: [
        { moves: [{ axis: [50, 54], duration: 300, easing: easeInExpo }, { axis: [460, 88], duration: 300, easing: easeInExpo }], colors: [128, 80], ledRing: [188, 212], gobo: 32 },
        { moves: [{ axis: [40, 56], duration: 300, easing: easeInExpo }, { axis: [452, 84], duration: 300, easing: easeInExpo }, { axis: [233, 108], duration: 300, easing: easeInExpo }], colors: [80, 128], ledRing: [202, 182], gobo: 16 },
        { moves: [{ axis: [246, 60], duration: 300, easing: easeInExpo }, { axis: [52, 88], duration: 300, easing: easeInExpo }, { axis: [460, 72], duration: 300, easing: easeInExpo }], colors: [128, 80], ledRing: [195, 218], gobo: 48 },
      ],
      mini: [
        { ledRing: [182, 202], gobo: true, beam: 225, laser: 78, moves: [{ axis: [255, 32], duration: 340 }, { axis: [405, 60], duration: 340 }, { axis: [555, 32], duration: 340 }, { axis: [405, 14], duration: 340 }] },
        { ledRing: [195, 215], gobo: true, beam: 212, laser: 70, moves: [{ axis: [210, 32], duration: 320 }, { axis: [360, 60], duration: 320 }, { axis: [510, 32], duration: 320 }, { axis: [360, 14], duration: 320 }] },
        { ledRing: [170, 188], gobo: false, beam: 202, laser: 65, moves: [{ axis: [300, 32], duration: 340 }, { axis: [450, 60], duration: 340 }, { axis: [600, 32], duration: 340 }, { axis: [450, 14], duration: 340 }] },
      ],
    },
  },

  'rock+romantic': {
    luminous: { head: 185, mini: 165, par: 125 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 40, 60], duration: 1000 }, { rgbw: [180, 80, 20], duration: 1000 }, { rgbw: [220, 60, 80], duration: 1000 }, { rgbw: [160, 30, 50], duration: 1000 }] },
        { colors: [{ rgbw: [180, 80, 20], duration: 1200 }, { rgbw: [220, 60, 80], duration: 1200 }, { rgbw: [160, 30, 50], duration: 1200 }] },
        { colors: [{ rgbw: [220, 60, 80], duration: 1100 }, { rgbw: [160, 30, 50], duration: 1100 }, { rgbw: [200, 40, 60], duration: 1100 }, { rgbw: [180, 80, 20], duration: 1100 }] },
      ],
      head: [
        { moves: [{ axis: [180, 88], duration: 2200, easing: easeInOutSine }, { axis: [360, 100], duration: 2200, easing: easeInOutSine }], colors: [16, 128], ledRing: [100, 118], gobo: 0 },
        { moves: [{ axis: [160, 92], duration: 2200, easing: easeInOutSine }, { axis: [340, 104], duration: 2200, easing: easeInOutSine }, { axis: [260, 96], duration: 2200, easing: easeInOutSine }], colors: [128, 16], ledRing: [112, 98], gobo: 0 },
        { moves: [{ axis: [200, 86], duration: 2200, easing: easeInOutSine }, { axis: [380, 98], duration: 2200, easing: easeInOutSine }], colors: [16, 128], ledRing: [105, 122], gobo: 0 },
      ],
      mini: [
        { ledRing: [92, 108], gobo: false, beam: 158, laser: 46, starfield: true, moves: [{ axis: [255, 70], duration: 2000 }, { axis: [405, 90], duration: 2000 }, { axis: [270, 70], duration: 2000 }] },
        { ledRing: [100, 115], gobo: false, beam: 165, laser: 50, starfield: true, moves: [{ axis: [240, 75], duration: 2200 }, { axis: [390, 92], duration: 2200 }, { axis: [255, 75], duration: 2200 }] },
        { ledRing: [85, 100], gobo: false, beam: 152, laser: 44, starfield: true, moves: [{ axis: [270, 68], duration: 2000 }, { axis: [420, 88], duration: 2000 }, { axis: [285, 68], duration: 2000 }] },
      ],
    },
  },

  'pop+romantic': {
    luminous: { head: 180, mini: 158, par: 118 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 80, 120], duration: 900 }, { rgbw: [200, 100, 180], duration: 900 }, { rgbw: [240, 120, 100], duration: 900 }, { rgbw: [180, 60, 140], duration: 900 }] },
        { colors: [{ rgbw: [200, 100, 180], duration: 1100 }, { rgbw: [240, 120, 100], duration: 1100 }, { rgbw: [180, 60, 140], duration: 1100 }] },
        { colors: [{ rgbw: [240, 120, 100], duration: 1000 }, { rgbw: [180, 60, 140], duration: 1000 }, { rgbw: [220, 80, 120], duration: 1000 }, { rgbw: [200, 100, 180], duration: 1000 }] },
      ],
      head: [
        { moves: [{ axis: [185, 90], duration: 2000, easing: easeInOutSine }, { axis: [355, 102], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [105, 122], gobo: 0 },
        { moves: [{ axis: [165, 94], duration: 2000, easing: easeInOutSine }, { axis: [345, 106], duration: 2000, easing: easeInOutSine }, { axis: [262, 98], duration: 2000, easing: easeInOutSine }], colors: [112, 128], ledRing: [118, 105], gobo: 0 },
        { moves: [{ axis: [205, 88], duration: 2000, easing: easeInOutSine }, { axis: [375, 100], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [110, 128], gobo: 0 },
      ],
      mini: [
        { ledRing: [95, 112], gobo: false, beam: 155, laser: 44, starfield: true, moves: [{ axis: [255, 72], duration: 1800 }, { axis: [405, 92], duration: 1800 }, { axis: [270, 72], duration: 1800 }] },
        { ledRing: [105, 120], gobo: false, beam: 162, laser: 48, starfield: true, moves: [{ axis: [240, 76], duration: 2000 }, { axis: [390, 94], duration: 2000 }, { axis: [255, 76], duration: 2000 }] },
        { ledRing: [88, 105], gobo: false, beam: 148, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 1800 }, { axis: [420, 90], duration: 1800 }, { axis: [285, 70], duration: 1800 }] },
      ],
    },
  },

  'electronic+romantic': {
    luminous: { head: 178, mini: 155, par: 115 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 0, 150], duration: 1000 }, { rgbw: [120, 0, 180], duration: 1000 }, { rgbw: [200, 20, 160], duration: 1000 }, { rgbw: [140, 10, 200], duration: 1000 }] },
        { colors: [{ rgbw: [120, 0, 180], duration: 1200 }, { rgbw: [200, 20, 160], duration: 1200 }, { rgbw: [140, 10, 200], duration: 1200 }] },
        { colors: [{ rgbw: [200, 20, 160], duration: 1100 }, { rgbw: [140, 10, 200], duration: 1100 }, { rgbw: [180, 0, 150], duration: 1100 }, { rgbw: [120, 0, 180], duration: 1100 }] },
      ],
      head: [
        { moves: [{ axis: [182, 88], duration: 2200, easing: easeInOutSine }, { axis: [358, 100], duration: 2200, easing: easeInOutSine }], colors: [112, 128], ledRing: [98, 115], gobo: 0 },
        { moves: [{ axis: [162, 92], duration: 2200, easing: easeInOutSine }, { axis: [348, 104], duration: 2200, easing: easeInOutSine }, { axis: [258, 96], duration: 2200, easing: easeInOutSine }], colors: [128, 112], ledRing: [110, 96], gobo: 0 },
        { moves: [{ axis: [202, 86], duration: 2200, easing: easeInOutSine }, { axis: [378, 98], duration: 2200, easing: easeInOutSine }], colors: [112, 128], ledRing: [102, 120], gobo: 0 },
      ],
      mini: [
        { ledRing: [90, 106], gobo: false, beam: 152, laser: 45, starfield: true, moves: [{ axis: [255, 72], duration: 2000 }, { axis: [405, 92], duration: 2000 }, { axis: [270, 72], duration: 2000 }] },
        { ledRing: [100, 118], gobo: false, beam: 160, laser: 50, starfield: true, moves: [{ axis: [240, 76], duration: 2200 }, { axis: [390, 94], duration: 2200 }, { axis: [255, 76], duration: 2200 }] },
        { ledRing: [85, 100], gobo: false, beam: 145, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 2000 }, { axis: [420, 90], duration: 2000 }, { axis: [285, 70], duration: 2000 }] },
      ],
    },
  },

  'hiphop+romantic': {
    luminous: { head: 182, mini: 160, par: 120 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 60, 80], duration: 950 }, { rgbw: [180, 100, 40], duration: 950 }, { rgbw: [220, 80, 100], duration: 950 }, { rgbw: [160, 80, 30], duration: 950 }] },
        { colors: [{ rgbw: [180, 100, 40], duration: 1100 }, { rgbw: [220, 80, 100], duration: 1100 }, { rgbw: [160, 80, 30], duration: 1100 }] },
        { colors: [{ rgbw: [220, 80, 100], duration: 1000 }, { rgbw: [160, 80, 30], duration: 1000 }, { rgbw: [200, 60, 80], duration: 1000 }, { rgbw: [180, 100, 40], duration: 1000 }] },
      ],
      head: [
        { moves: [{ axis: [183, 90], duration: 2000, easing: easeInOutSine }, { axis: [357, 102], duration: 2000, easing: easeInOutSine }], colors: [128, 32], ledRing: [100, 118], gobo: 0 },
        { moves: [{ axis: [163, 94], duration: 2000, easing: easeInOutSine }, { axis: [347, 106], duration: 2000, easing: easeInOutSine }, { axis: [260, 98], duration: 2000, easing: easeInOutSine }], colors: [32, 128], ledRing: [112, 100], gobo: 0 },
        { moves: [{ axis: [203, 88], duration: 2000, easing: easeInOutSine }, { axis: [377, 100], duration: 2000, easing: easeInOutSine }], colors: [128, 32], ledRing: [106, 122], gobo: 0 },
      ],
      mini: [
        { ledRing: [93, 110], gobo: false, beam: 156, laser: 45, starfield: true, moves: [{ axis: [255, 72], duration: 1800 }, { axis: [405, 92], duration: 1800 }, { axis: [270, 72], duration: 1800 }] },
        { ledRing: [102, 118], gobo: false, beam: 163, laser: 49, starfield: true, moves: [{ axis: [240, 76], duration: 2000 }, { axis: [390, 94], duration: 2000 }, { axis: [255, 76], duration: 2000 }] },
        { ledRing: [86, 102], gobo: false, beam: 150, laser: 43, starfield: true, moves: [{ axis: [270, 70], duration: 1800 }, { axis: [420, 90], duration: 1800 }, { axis: [285, 70], duration: 1800 }] },
      ],
    },
  },

  'jazz+romantic': {
    luminous: { head: 188, mini: 162, par: 122 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 120, 20], duration: 1200 }, { rgbw: [180, 80, 10], duration: 1200 }, { rgbw: [220, 140, 30], duration: 1200 }, { rgbw: [160, 90, 15], duration: 1200 }] },
        { colors: [{ rgbw: [180, 80, 10], duration: 1400 }, { rgbw: [220, 140, 30], duration: 1400 }, { rgbw: [160, 90, 15], duration: 1400 }] },
        { colors: [{ rgbw: [220, 140, 30], duration: 1300 }, { rgbw: [160, 90, 15], duration: 1300 }, { rgbw: [200, 120, 20], duration: 1300 }, { rgbw: [180, 80, 10], duration: 1300 }] },
      ],
      head: [
        { moves: [{ axis: [188, 88], duration: 2500, easing: easeInOutSine }, { axis: [362, 100], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [102, 120], gobo: 0 },
        { moves: [{ axis: [168, 92], duration: 2500, easing: easeInOutSine }, { axis: [352, 104], duration: 2500, easing: easeInOutSine }, { axis: [262, 96], duration: 2500, easing: easeInOutSine }], colors: [48, 32], ledRing: [115, 100], gobo: 0 },
        { moves: [{ axis: [208, 86], duration: 2500, easing: easeInOutSine }, { axis: [382, 98], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [108, 126], gobo: 0 },
      ],
      mini: [
        { ledRing: [96, 112], gobo: false, beam: 158, laser: 46, starfield: true, moves: [{ axis: [255, 72], duration: 2200 }, { axis: [405, 92], duration: 2200 }, { axis: [270, 72], duration: 2200 }] },
        { ledRing: [105, 122], gobo: false, beam: 165, laser: 50, starfield: true, moves: [{ axis: [240, 76], duration: 2500 }, { axis: [390, 94], duration: 2500 }, { axis: [255, 76], duration: 2500 }] },
        { ledRing: [88, 105], gobo: false, beam: 150, laser: 43, starfield: true, moves: [{ axis: [270, 70], duration: 2200 }, { axis: [420, 90], duration: 2200 }, { axis: [285, 70], duration: 2200 }] },
      ],
    },
  },

  'rnb+romantic': {
    luminous: { head: 185, mini: 162, par: 122 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 60, 100], duration: 1000 }, { rgbw: [200, 80, 60], duration: 1000 }, { rgbw: [240, 80, 120], duration: 1000 }, { rgbw: [180, 50, 80], duration: 1000 }] },
        { colors: [{ rgbw: [200, 80, 60], duration: 1200 }, { rgbw: [240, 80, 120], duration: 1200 }, { rgbw: [180, 50, 80], duration: 1200 }] },
        { colors: [{ rgbw: [240, 80, 120], duration: 1100 }, { rgbw: [180, 50, 80], duration: 1100 }, { rgbw: [220, 60, 100], duration: 1100 }, { rgbw: [200, 80, 60], duration: 1100 }] },
      ],
      head: [
        { moves: [{ axis: [184, 90], duration: 2200, easing: easeInOutSine }, { axis: [358, 102], duration: 2200, easing: easeInOutSine }], colors: [128, 16], ledRing: [100, 118], gobo: 0 },
        { moves: [{ axis: [164, 94], duration: 2200, easing: easeInOutSine }, { axis: [348, 106], duration: 2200, easing: easeInOutSine }, { axis: [259, 98], duration: 2200, easing: easeInOutSine }], colors: [16, 128], ledRing: [112, 100], gobo: 0 },
        { moves: [{ axis: [204, 88], duration: 2200, easing: easeInOutSine }, { axis: [378, 100], duration: 2200, easing: easeInOutSine }], colors: [128, 16], ledRing: [105, 122], gobo: 0 },
      ],
      mini: [
        { ledRing: [92, 108], gobo: false, beam: 156, laser: 46, starfield: true, moves: [{ axis: [255, 72], duration: 2000 }, { axis: [405, 92], duration: 2000 }, { axis: [270, 72], duration: 2000 }] },
        { ledRing: [102, 118], gobo: false, beam: 163, laser: 50, starfield: true, moves: [{ axis: [240, 76], duration: 2200 }, { axis: [390, 94], duration: 2200 }, { axis: [255, 76], duration: 2200 }] },
        { ledRing: [86, 102], gobo: false, beam: 150, laser: 43, starfield: true, moves: [{ axis: [270, 70], duration: 2000 }, { axis: [420, 90], duration: 2000 }, { axis: [285, 70], duration: 2000 }] },
      ],
    },
  },

  'folk+romantic': {
    luminous: { head: 182, mini: 158, par: 118 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 140, 40], duration: 1200 }, { rgbw: [180, 120, 30], duration: 1200 }, { rgbw: [220, 150, 60], duration: 1200 }, { rgbw: [160, 100, 20], duration: 1200 }] },
        { colors: [{ rgbw: [180, 120, 30], duration: 1400 }, { rgbw: [220, 150, 60], duration: 1400 }, { rgbw: [160, 100, 20], duration: 1400 }] },
        { colors: [{ rgbw: [220, 150, 60], duration: 1300 }, { rgbw: [160, 100, 20], duration: 1300 }, { rgbw: [200, 140, 40], duration: 1300 }, { rgbw: [180, 120, 30], duration: 1300 }] },
      ],
      head: [
        { moves: [{ axis: [186, 88], duration: 2500, easing: easeInOutSine }, { axis: [360, 100], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [100, 118], gobo: 0 },
        { moves: [{ axis: [166, 92], duration: 2500, easing: easeInOutSine }, { axis: [350, 104], duration: 2500, easing: easeInOutSine }, { axis: [260, 96], duration: 2500, easing: easeInOutSine }], colors: [48, 32], ledRing: [112, 100], gobo: 0 },
        { moves: [{ axis: [206, 86], duration: 2500, easing: easeInOutSine }, { axis: [380, 98], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [106, 124], gobo: 0 },
      ],
      mini: [
        { ledRing: [94, 110], gobo: false, beam: 155, laser: 44, starfield: true, moves: [{ axis: [255, 72], duration: 2200 }, { axis: [405, 92], duration: 2200 }, { axis: [270, 72], duration: 2200 }] },
        { ledRing: [104, 120], gobo: false, beam: 162, laser: 48, starfield: true, moves: [{ axis: [240, 76], duration: 2500 }, { axis: [390, 94], duration: 2500 }, { axis: [255, 76], duration: 2500 }] },
        { ledRing: [86, 102], gobo: false, beam: 148, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 2200 }, { axis: [420, 90], duration: 2200 }, { axis: [285, 70], duration: 2200 }] },
      ],
    },
  },

  'ambient+romantic': {
    luminous: { head: 175, mini: 152, par: 112 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [140, 60, 160], duration: 1400 }, { rgbw: [120, 80, 140], duration: 1400 }, { rgbw: [160, 80, 180], duration: 1400 }, { rgbw: [100, 60, 120], duration: 1400 }] },
        { colors: [{ rgbw: [120, 80, 140], duration: 1600 }, { rgbw: [160, 80, 180], duration: 1600 }, { rgbw: [100, 60, 120], duration: 1600 }] },
        { colors: [{ rgbw: [160, 80, 180], duration: 1500 }, { rgbw: [100, 60, 120], duration: 1500 }, { rgbw: [140, 60, 160], duration: 1500 }, { rgbw: [120, 80, 140], duration: 1500 }] },
      ],
      head: [
        { moves: [{ axis: [190, 90], duration: 3000, easing: easeInOutSine }, { axis: [362, 102], duration: 3000, easing: easeInOutSine }], colors: [112, 96], ledRing: [95, 112], gobo: 0 },
        { moves: [{ axis: [170, 94], duration: 3000, easing: easeInOutSine }, { axis: [352, 106], duration: 3000, easing: easeInOutSine }, { axis: [264, 98], duration: 3000, easing: easeInOutSine }], colors: [96, 112], ledRing: [108, 94], gobo: 0 },
        { moves: [{ axis: [210, 88], duration: 3000, easing: easeInOutSine }, { axis: [382, 100], duration: 3000, easing: easeInOutSine }], colors: [112, 96], ledRing: [100, 118], gobo: 0 },
      ],
      mini: [
        { ledRing: [88, 105], gobo: false, beam: 150, laser: 42, starfield: true, moves: [{ axis: [255, 74], duration: 2600 }, { axis: [405, 94], duration: 2600 }, { axis: [270, 74], duration: 2600 }] },
        { ledRing: [98, 115], gobo: false, beam: 158, laser: 46, starfield: true, moves: [{ axis: [240, 78], duration: 3000 }, { axis: [390, 96], duration: 3000 }, { axis: [255, 78], duration: 3000 }] },
        { ledRing: [82, 98], gobo: false, beam: 144, laser: 40, starfield: true, moves: [{ axis: [270, 72], duration: 2600 }, { axis: [420, 92], duration: 2600 }, { axis: [285, 72], duration: 2600 }] },
      ],
    },
  },

  'classical+romantic': {
    luminous: { head: 192, mini: 168, par: 128 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 180, 100], duration: 1400 }, { rgbw: [200, 160, 80], duration: 1400 }, { rgbw: [240, 200, 120], duration: 1400 }, { rgbw: [180, 140, 60], duration: 1400 }] },
        { colors: [{ rgbw: [200, 160, 80], duration: 1600 }, { rgbw: [240, 200, 120], duration: 1600 }, { rgbw: [180, 140, 60], duration: 1600 }] },
        { colors: [{ rgbw: [240, 200, 120], duration: 1500 }, { rgbw: [180, 140, 60], duration: 1500 }, { rgbw: [220, 180, 100], duration: 1500 }, { rgbw: [200, 160, 80], duration: 1500 }] },
      ],
      head: [
        { moves: [{ axis: [192, 88], duration: 2800, easing: easeInOutSine }, { axis: [364, 100], duration: 2800, easing: easeInOutSine }], colors: [48, 0], ledRing: [105, 124], gobo: 0 },
        { moves: [{ axis: [172, 92], duration: 2800, easing: easeInOutSine }, { axis: [354, 104], duration: 2800, easing: easeInOutSine }, { axis: [266, 96], duration: 2800, easing: easeInOutSine }], colors: [0, 48], ledRing: [118, 105], gobo: 0 },
        { moves: [{ axis: [212, 86], duration: 2800, easing: easeInOutSine }, { axis: [384, 98], duration: 2800, easing: easeInOutSine }], colors: [48, 0], ledRing: [110, 128], gobo: 0 },
      ],
      mini: [
        { ledRing: [100, 118], gobo: false, beam: 162, laser: 48, starfield: true, moves: [{ axis: [255, 72], duration: 2500 }, { axis: [405, 92], duration: 2500 }, { axis: [270, 72], duration: 2500 }] },
        { ledRing: [110, 128], gobo: false, beam: 170, laser: 52, starfield: true, moves: [{ axis: [240, 76], duration: 2800 }, { axis: [390, 94], duration: 2800 }, { axis: [255, 76], duration: 2800 }] },
        { ledRing: [92, 110], gobo: false, beam: 155, laser: 45, starfield: true, moves: [{ axis: [270, 70], duration: 2500 }, { axis: [420, 90], duration: 2500 }, { axis: [285, 70], duration: 2500 }] },
      ],
    },
  },

  'country+romantic': {
    luminous: { head: 182, mini: 158, par: 118 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [200, 120, 40], duration: 1200 }, { rgbw: [180, 100, 30], duration: 1200 }, { rgbw: [220, 140, 50], duration: 1200 }, { rgbw: [160, 90, 25], duration: 1200 }] },
        { colors: [{ rgbw: [180, 100, 30], duration: 1400 }, { rgbw: [220, 140, 50], duration: 1400 }, { rgbw: [160, 90, 25], duration: 1400 }] },
        { colors: [{ rgbw: [220, 140, 50], duration: 1300 }, { rgbw: [160, 90, 25], duration: 1300 }, { rgbw: [200, 120, 40], duration: 1300 }, { rgbw: [180, 100, 30], duration: 1300 }] },
      ],
      head: [
        { moves: [{ axis: [186, 88], duration: 2500, easing: easeInOutSine }, { axis: [360, 100], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [100, 118], gobo: 0 },
        { moves: [{ axis: [166, 92], duration: 2500, easing: easeInOutSine }, { axis: [350, 104], duration: 2500, easing: easeInOutSine }, { axis: [260, 96], duration: 2500, easing: easeInOutSine }], colors: [48, 32], ledRing: [112, 100], gobo: 0 },
        { moves: [{ axis: [206, 86], duration: 2500, easing: easeInOutSine }, { axis: [380, 98], duration: 2500, easing: easeInOutSine }], colors: [32, 48], ledRing: [106, 124], gobo: 0 },
      ],
      mini: [
        { ledRing: [94, 110], gobo: false, beam: 156, laser: 44, starfield: true, moves: [{ axis: [255, 72], duration: 2200 }, { axis: [405, 92], duration: 2200 }, { axis: [270, 72], duration: 2200 }] },
        { ledRing: [104, 120], gobo: false, beam: 163, laser: 48, starfield: true, moves: [{ axis: [240, 76], duration: 2500 }, { axis: [390, 94], duration: 2500 }, { axis: [255, 76], duration: 2500 }] },
        { ledRing: [86, 102], gobo: false, beam: 150, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 2200 }, { axis: [420, 90], duration: 2200 }, { axis: [285, 70], duration: 2200 }] },
      ],
    },
  },

  'dance+romantic': {
    luminous: { head: 180, mini: 158, par: 118 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [220, 60, 140], duration: 950 }, { rgbw: [200, 80, 160], duration: 950 }, { rgbw: [240, 80, 180], duration: 950 }, { rgbw: [180, 50, 120], duration: 950 }] },
        { colors: [{ rgbw: [200, 80, 160], duration: 1100 }, { rgbw: [240, 80, 180], duration: 1100 }, { rgbw: [180, 50, 120], duration: 1100 }] },
        { colors: [{ rgbw: [240, 80, 180], duration: 1000 }, { rgbw: [180, 50, 120], duration: 1000 }, { rgbw: [220, 60, 140], duration: 1000 }, { rgbw: [200, 80, 160], duration: 1000 }] },
      ],
      head: [
        { moves: [{ axis: [185, 90], duration: 2000, easing: easeInOutSine }, { axis: [357, 102], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [105, 122], gobo: 0 },
        { moves: [{ axis: [165, 94], duration: 2000, easing: easeInOutSine }, { axis: [347, 106], duration: 2000, easing: easeInOutSine }, { axis: [261, 98], duration: 2000, easing: easeInOutSine }], colors: [112, 128], ledRing: [118, 105], gobo: 0 },
        { moves: [{ axis: [205, 88], duration: 2000, easing: easeInOutSine }, { axis: [377, 100], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [110, 128], gobo: 0 },
      ],
      mini: [
        { ledRing: [95, 112], gobo: false, beam: 155, laser: 44, starfield: true, moves: [{ axis: [255, 72], duration: 1800 }, { axis: [405, 92], duration: 1800 }, { axis: [270, 72], duration: 1800 }] },
        { ledRing: [105, 122], gobo: false, beam: 162, laser: 48, starfield: true, moves: [{ axis: [240, 76], duration: 2000 }, { axis: [390, 94], duration: 2000 }, { axis: [255, 76], duration: 2000 }] },
        { ledRing: [88, 105], gobo: false, beam: 148, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 1800 }, { axis: [420, 90], duration: 1800 }, { axis: [285, 70], duration: 1800 }] },
      ],
    },
  },

  'house+romantic': {
    luminous: { head: 178, mini: 155, par: 115 },
    strobing: { threshold: 0.55, paceWeight: 0.2, energyWeight: 0.8, danceExp: 2.5 },
    variants: {
      par: [
        { colors: [{ rgbw: [180, 0, 140], duration: 950 }, { rgbw: [160, 20, 160], duration: 950 }, { rgbw: [200, 10, 180], duration: 950 }, { rgbw: [140, 0, 120], duration: 950 }] },
        { colors: [{ rgbw: [160, 20, 160], duration: 1100 }, { rgbw: [200, 10, 180], duration: 1100 }, { rgbw: [140, 0, 120], duration: 1100 }] },
        { colors: [{ rgbw: [200, 10, 180], duration: 1000 }, { rgbw: [140, 0, 120], duration: 1000 }, { rgbw: [180, 0, 140], duration: 1000 }, { rgbw: [160, 20, 160], duration: 1000 }] },
      ],
      head: [
        { moves: [{ axis: [182, 90], duration: 2000, easing: easeInOutSine }, { axis: [356, 102], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [102, 120], gobo: 0 },
        { moves: [{ axis: [162, 94], duration: 2000, easing: easeInOutSine }, { axis: [346, 106], duration: 2000, easing: easeInOutSine }, { axis: [258, 98], duration: 2000, easing: easeInOutSine }], colors: [112, 128], ledRing: [115, 102], gobo: 0 },
        { moves: [{ axis: [202, 88], duration: 2000, easing: easeInOutSine }, { axis: [376, 100], duration: 2000, easing: easeInOutSine }], colors: [128, 112], ledRing: [108, 126], gobo: 0 },
      ],
      mini: [
        { ledRing: [92, 108], gobo: false, beam: 152, laser: 44, starfield: true, moves: [{ axis: [255, 72], duration: 1800 }, { axis: [405, 92], duration: 1800 }, { axis: [270, 72], duration: 1800 }] },
        { ledRing: [102, 118], gobo: false, beam: 160, laser: 48, starfield: true, moves: [{ axis: [240, 76], duration: 2000 }, { axis: [390, 94], duration: 2000 }, { axis: [255, 76], duration: 2000 }] },
        { ledRing: [85, 100], gobo: false, beam: 146, laser: 42, starfield: true, moves: [{ axis: [270, 70], duration: 1800 }, { axis: [420, 90], duration: 1800 }, { axis: [285, 70], duration: 1800 }] },
      ],
    },
  },

  'rock+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [60, 20, 20], duration: 1800 }, { rgbw: [80, 30, 30], duration: 1800 }, { rgbw: [40, 15, 15], duration: 1800 }, { rgbw: [100, 40, 40], duration: 1800 }] },
        { colors: [{ rgbw: [80, 30, 30], duration: 1800 }, { rgbw: [40, 15, 15], duration: 1800 }, { rgbw: [100, 40, 40], duration: 1800 }, { rgbw: [60, 20, 20], duration: 1800 }] },
        { colors: [{ rgbw: [100, 40, 40], duration: 1800 }, { rgbw: [60, 20, 20], duration: 1800 }, { rgbw: [80, 30, 30], duration: 1800 }, { rgbw: [40, 15, 15], duration: 1800 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [280, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [16, 0], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [200, 95], duration: 3200, easing: easeInOutSine }, { axis: [320, 105], duration: 3200, easing: easeInOutSine }, { axis: [240, 85], duration: 3200, easing: easeInOutSine }], colors: [0, 16], ledRing: [75, 90], gobo: 0 },
        { moves: [{ axis: [180, 88], duration: 2800, easing: easeInOutSine }, { axis: [300, 98], duration: 2800, easing: easeInOutSine }, { axis: [360, 92], duration: 2800, easing: easeInOutSine }], colors: [16, 0], ledRing: [85, 100], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 38, starfield: true, moves: [{ axis: [255, 90], duration: 2500 }, { axis: [320, 100], duration: 2500 }, { axis: [200, 85], duration: 2500 }] },
        { ledRing: [70, 85], gobo: false, beam: 145, laser: 42, starfield: true, moves: [{ axis: [270, 95], duration: 2800 }, { axis: [340, 105], duration: 2800 }, { axis: [220, 88], duration: 2800 }] },
        { ledRing: [82, 96], gobo: false, beam: 135, laser: 36, starfield: true, moves: [{ axis: [240, 88], duration: 2600 }, { axis: [310, 98], duration: 2600 }, { axis: [190, 82], duration: 2600 }] },
      ],
    },
  },

  'pop+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [120, 60, 140], duration: 2000 }, { rgbw: [100, 80, 160], duration: 2000 }, { rgbw: [140, 60, 120], duration: 2000 }, { rgbw: [80, 50, 100], duration: 2000 }] },
        { colors: [{ rgbw: [100, 80, 160], duration: 2000 }, { rgbw: [140, 60, 120], duration: 2000 }, { rgbw: [80, 50, 100], duration: 2000 }, { rgbw: [120, 60, 140], duration: 2000 }] },
        { colors: [{ rgbw: [140, 60, 120], duration: 2000 }, { rgbw: [80, 50, 100], duration: 2000 }, { rgbw: [120, 60, 140], duration: 2000 }, { rgbw: [100, 80, 160], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [150, 92], duration: 3000, easing: easeInOutSine }, { axis: [270, 102], duration: 3000, easing: easeInOutSine }, { axis: [390, 90], duration: 3000, easing: easeInOutSine }], colors: [112, 128], ledRing: [82, 97], gobo: 0 },
        { moves: [{ axis: [190, 96], duration: 3200, easing: easeInOutSine }, { axis: [310, 106], duration: 3200, easing: easeInOutSine }, { axis: [250, 88], duration: 3200, easing: easeInOutSine }], colors: [128, 112], ledRing: [76, 91], gobo: 0 },
        { moves: [{ axis: [170, 90], duration: 2800, easing: easeInOutSine }, { axis: [290, 100], duration: 2800, easing: easeInOutSine }, { axis: [370, 94], duration: 2800, easing: easeInOutSine }], colors: [112, 128], ledRing: [86, 101], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 142, laser: 40, starfield: true, moves: [{ axis: [255, 92], duration: 2600 }, { axis: [325, 102], duration: 2600 }, { axis: [205, 87], duration: 2600 }] },
        { ledRing: [72, 87], gobo: false, beam: 148, laser: 44, starfield: true, moves: [{ axis: [272, 97], duration: 2900 }, { axis: [345, 107], duration: 2900 }, { axis: [222, 90], duration: 2900 }] },
        { ledRing: [84, 98], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [242, 90], duration: 2700 }, { axis: [312, 100], duration: 2700 }, { axis: [192, 84], duration: 2700 }] },
      ],
    },
  },

  'electronic+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [10, 60, 100], duration: 2000 }, { rgbw: [20, 80, 120], duration: 2000 }, { rgbw: [5, 50, 90], duration: 2000 }, { rgbw: [15, 70, 110], duration: 2000 }] },
        { colors: [{ rgbw: [20, 80, 120], duration: 2000 }, { rgbw: [5, 50, 90], duration: 2000 }, { rgbw: [15, 70, 110], duration: 2000 }, { rgbw: [10, 60, 100], duration: 2000 }] },
        { colors: [{ rgbw: [5, 50, 90], duration: 2000 }, { rgbw: [15, 70, 110], duration: 2000 }, { rgbw: [10, 60, 100], duration: 2000 }, { rgbw: [20, 80, 120], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [170, 90], duration: 3000, easing: easeInOutSine }, { axis: [280, 100], duration: 3000, easing: easeInOutSine }, { axis: [370, 88], duration: 3000, easing: easeInOutSine }], colors: [96, 80], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [200, 94], duration: 3200, easing: easeInOutSine }, { axis: [310, 104], duration: 3200, easing: easeInOutSine }, { axis: [250, 86], duration: 3200, easing: easeInOutSine }], colors: [80, 96], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [180, 88], duration: 2800, easing: easeInOutSine }, { axis: [295, 98], duration: 2800, easing: easeInOutSine }, { axis: [355, 92], duration: 2800, easing: easeInOutSine }], colors: [96, 80], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 38, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [320, 100], duration: 2600 }, { axis: [200, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 42, starfield: true, moves: [{ axis: [270, 95], duration: 2900 }, { axis: [338, 105], duration: 2900 }, { axis: [218, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 36, starfield: true, moves: [{ axis: [242, 88], duration: 2700 }, { axis: [308, 98], duration: 2700 }, { axis: [190, 82], duration: 2700 }] },
      ],
    },
  },

  'hiphop+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [50, 20, 100], duration: 1800 }, { rgbw: [70, 30, 120], duration: 1800 }, { rgbw: [40, 15, 80], duration: 1800 }, { rgbw: [60, 25, 110], duration: 1800 }] },
        { colors: [{ rgbw: [70, 30, 120], duration: 1800 }, { rgbw: [40, 15, 80], duration: 1800 }, { rgbw: [60, 25, 110], duration: 1800 }, { rgbw: [50, 20, 100], duration: 1800 }] },
        { colors: [{ rgbw: [40, 15, 80], duration: 1800 }, { rgbw: [60, 25, 110], duration: 1800 }, { rgbw: [50, 20, 100], duration: 1800 }, { rgbw: [70, 30, 120], duration: 1800 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [275, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [112, 96], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [195, 94], duration: 3200, easing: easeInOutSine }, { axis: [308, 104], duration: 3200, easing: easeInOutSine }, { axis: [248, 86], duration: 3200, easing: easeInOutSine }], colors: [96, 112], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [175, 88], duration: 2800, easing: easeInOutSine }, { axis: [292, 98], duration: 2800, easing: easeInOutSine }, { axis: [358, 92], duration: 2800, easing: easeInOutSine }], colors: [112, 96], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 38, starfield: true, moves: [{ axis: [255, 90], duration: 2500 }, { axis: [318, 100], duration: 2500 }, { axis: [198, 85], duration: 2500 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 42, starfield: true, moves: [{ axis: [270, 95], duration: 2800 }, { axis: [335, 105], duration: 2800 }, { axis: [215, 88], duration: 2800 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 36, starfield: true, moves: [{ axis: [240, 88], duration: 2600 }, { axis: [305, 98], duration: 2600 }, { axis: [188, 82], duration: 2600 }] },
      ],
    },
  },

  'jazz+calm': {
    luminous: { head: 140, mini: 130, par: 90 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 70, 10], duration: 2200 }, { rgbw: [80, 55, 8], duration: 2200 }, { rgbw: [120, 80, 15], duration: 2200 }, { rgbw: [70, 50, 5], duration: 2200 }] },
        { colors: [{ rgbw: [80, 55, 8], duration: 2200 }, { rgbw: [120, 80, 15], duration: 2200 }, { rgbw: [70, 50, 5], duration: 2200 }, { rgbw: [100, 70, 10], duration: 2200 }] },
        { colors: [{ rgbw: [120, 80, 15], duration: 2200 }, { rgbw: [70, 50, 5], duration: 2200 }, { rgbw: [100, 70, 10], duration: 2200 }, { rgbw: [80, 55, 8], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [180, 92], duration: 3200, easing: easeInOutSine }, { axis: [290, 102], duration: 3200, easing: easeInOutSine }, { axis: [360, 90], duration: 3200, easing: easeInOutSine }], colors: [32, 48], ledRing: [82, 97], gobo: 0 },
        { moves: [{ axis: [205, 96], duration: 3500, easing: easeInOutSine }, { axis: [315, 106], duration: 3500, easing: easeInOutSine }, { axis: [255, 88], duration: 3500, easing: easeInOutSine }], colors: [48, 32], ledRing: [76, 91], gobo: 0 },
        { moves: [{ axis: [185, 90], duration: 3000, easing: easeInOutSine }, { axis: [298, 100], duration: 3000, easing: easeInOutSine }, { axis: [348, 94], duration: 3000, easing: easeInOutSine }], colors: [32, 48], ledRing: [86, 101], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [322, 102], duration: 2800 }, { axis: [202, 87], duration: 2800 }] },
        { ledRing: [72, 87], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3100 }, { axis: [340, 107], duration: 3100 }, { axis: [220, 90], duration: 3100 }] },
        { ledRing: [84, 98], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 2900 }, { axis: [308, 100], duration: 2900 }, { axis: [190, 84], duration: 2900 }] },
      ],
    },
  },

  'rnb+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 20, 40], duration: 2000 }, { rgbw: [100, 30, 50], duration: 2000 }, { rgbw: [60, 15, 30], duration: 2000 }, { rgbw: [90, 25, 45], duration: 2000 }] },
        { colors: [{ rgbw: [100, 30, 50], duration: 2000 }, { rgbw: [60, 15, 30], duration: 2000 }, { rgbw: [90, 25, 45], duration: 2000 }, { rgbw: [80, 20, 40], duration: 2000 }] },
        { colors: [{ rgbw: [60, 15, 30], duration: 2000 }, { rgbw: [90, 25, 45], duration: 2000 }, { rgbw: [80, 20, 40], duration: 2000 }, { rgbw: [100, 30, 50], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [272, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [16, 128], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [195, 94], duration: 3200, easing: easeInOutSine }, { axis: [305, 104], duration: 3200, easing: easeInOutSine }, { axis: [245, 86], duration: 3200, easing: easeInOutSine }], colors: [128, 16], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [175, 88], duration: 2800, easing: easeInOutSine }, { axis: [288, 98], duration: 2800, easing: easeInOutSine }, { axis: [358, 92], duration: 2800, easing: easeInOutSine }], colors: [16, 128], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [320, 100], duration: 2600 }, { axis: [200, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 44, starfield: true, moves: [{ axis: [270, 95], duration: 2900 }, { axis: [336, 105], duration: 2900 }, { axis: [216, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [240, 88], duration: 2700 }, { axis: [305, 98], duration: 2700 }, { axis: [188, 82], duration: 2700 }] },
      ],
    },
  },

  'folk+calm': {
    luminous: { head: 140, mini: 130, par: 90 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 60, 20], duration: 2200 }, { rgbw: [50, 70, 15], duration: 2200 }, { rgbw: [35, 55, 18], duration: 2200 }, { rgbw: [60, 75, 22], duration: 2200 }] },
        { colors: [{ rgbw: [50, 70, 15], duration: 2200 }, { rgbw: [35, 55, 18], duration: 2200 }, { rgbw: [60, 75, 22], duration: 2200 }, { rgbw: [40, 60, 20], duration: 2200 }] },
        { colors: [{ rgbw: [35, 55, 18], duration: 2200 }, { rgbw: [60, 75, 22], duration: 2200 }, { rgbw: [40, 60, 20], duration: 2200 }, { rgbw: [50, 70, 15], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [180, 92], duration: 3200, easing: easeInOutSine }, { axis: [288, 102], duration: 3200, easing: easeInOutSine }, { axis: [360, 90], duration: 3200, easing: easeInOutSine }], colors: [64, 32], ledRing: [82, 97], gobo: 0 },
        { moves: [{ axis: [205, 96], duration: 3500, easing: easeInOutSine }, { axis: [312, 106], duration: 3500, easing: easeInOutSine }, { axis: [252, 88], duration: 3500, easing: easeInOutSine }], colors: [32, 64], ledRing: [76, 91], gobo: 0 },
        { moves: [{ axis: [185, 90], duration: 3000, easing: easeInOutSine }, { axis: [296, 100], duration: 3000, easing: easeInOutSine }, { axis: [348, 94], duration: 3000, easing: easeInOutSine }], colors: [64, 32], ledRing: [86, 101], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [320, 102], duration: 2800 }, { axis: [200, 87], duration: 2800 }] },
        { ledRing: [72, 87], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3100 }, { axis: [338, 107], duration: 3100 }, { axis: [218, 90], duration: 3100 }] },
        { ledRing: [84, 98], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 2900 }, { axis: [306, 100], duration: 2900 }, { axis: [188, 84], duration: 2900 }] },
      ],
    },
  },

  'ambient+calm': {
    luminous: { head: 110, mini: 100, par: 65 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [20, 40, 80], duration: 2500 }, { rgbw: [30, 50, 90], duration: 2500 }, { rgbw: [15, 35, 70], duration: 2500 }, { rgbw: [25, 45, 85], duration: 2500 }] },
        { colors: [{ rgbw: [30, 50, 90], duration: 2500 }, { rgbw: [15, 35, 70], duration: 2500 }, { rgbw: [25, 45, 85], duration: 2500 }, { rgbw: [20, 40, 80], duration: 2500 }] },
        { colors: [{ rgbw: [15, 35, 70], duration: 2500 }, { rgbw: [25, 45, 85], duration: 2500 }, { rgbw: [20, 40, 80], duration: 2500 }, { rgbw: [30, 50, 90], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3500, easing: easeInOutSine }, { axis: [280, 102], duration: 3500, easing: easeInOutSine }, { axis: [370, 90], duration: 3500, easing: easeInOutSine }], colors: [96, 0], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [200, 96], duration: 3800, easing: easeInOutSine }, { axis: [308, 106], duration: 3800, easing: easeInOutSine }, { axis: [248, 88], duration: 3800, easing: easeInOutSine }], colors: [0, 96], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [182, 90], duration: 3200, easing: easeInOutSine }, { axis: [292, 100], duration: 3200, easing: easeInOutSine }, { axis: [352, 94], duration: 3200, easing: easeInOutSine }], colors: [96, 0], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [74, 88], gobo: false, beam: 132, laser: 36, starfield: true, moves: [{ axis: [255, 92], duration: 3000 }, { axis: [318, 102], duration: 3000 }, { axis: [198, 87], duration: 3000 }] },
        { ledRing: [68, 82], gobo: false, beam: 138, laser: 40, starfield: true, moves: [{ axis: [270, 97], duration: 3300 }, { axis: [334, 107], duration: 3300 }, { axis: [214, 90], duration: 3300 }] },
        { ledRing: [78, 92], gobo: false, beam: 130, laser: 34, starfield: true, moves: [{ axis: [240, 90], duration: 3100 }, { axis: [302, 100], duration: 3100 }, { axis: [186, 84], duration: 3100 }] },
      ],
    },
  },

  'classical+calm': {
    luminous: { head: 140, mini: 130, par: 90 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 90, 50], duration: 2500 }, { rgbw: [120, 100, 60], duration: 2500 }, { rgbw: [80, 70, 40], duration: 2500 }, { rgbw: [110, 95, 55], duration: 2500 }] },
        { colors: [{ rgbw: [120, 100, 60], duration: 2500 }, { rgbw: [80, 70, 40], duration: 2500 }, { rgbw: [110, 95, 55], duration: 2500 }, { rgbw: [100, 90, 50], duration: 2500 }] },
        { colors: [{ rgbw: [80, 70, 40], duration: 2500 }, { rgbw: [110, 95, 55], duration: 2500 }, { rgbw: [100, 90, 50], duration: 2500 }, { rgbw: [120, 100, 60], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [180, 92], duration: 3500, easing: easeInOutSine }, { axis: [290, 102], duration: 3500, easing: easeInOutSine }, { axis: [360, 90], duration: 3500, easing: easeInOutSine }], colors: [48, 0], ledRing: [82, 97], gobo: 0 },
        { moves: [{ axis: [208, 96], duration: 3800, easing: easeInOutSine }, { axis: [315, 106], duration: 3800, easing: easeInOutSine }, { axis: [255, 88], duration: 3800, easing: easeInOutSine }], colors: [0, 48], ledRing: [76, 91], gobo: 0 },
        { moves: [{ axis: [188, 90], duration: 3200, easing: easeInOutSine }, { axis: [298, 100], duration: 3200, easing: easeInOutSine }, { axis: [348, 94], duration: 3200, easing: easeInOutSine }], colors: [48, 0], ledRing: [86, 101], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 3000 }, { axis: [320, 102], duration: 3000 }, { axis: [200, 87], duration: 3000 }] },
        { ledRing: [72, 87], gobo: false, beam: 142, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3300 }, { axis: [338, 107], duration: 3300 }, { axis: [218, 90], duration: 3300 }] },
        { ledRing: [84, 98], gobo: false, beam: 132, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 3100 }, { axis: [306, 100], duration: 3100 }, { axis: [188, 84], duration: 3100 }] },
      ],
    },
  },

  'country+calm': {
    luminous: { head: 140, mini: 130, par: 90 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [90, 60, 15], duration: 2200 }, { rgbw: [110, 70, 20], duration: 2200 }, { rgbw: [70, 50, 10], duration: 2200 }, { rgbw: [100, 65, 18], duration: 2200 }] },
        { colors: [{ rgbw: [110, 70, 20], duration: 2200 }, { rgbw: [70, 50, 10], duration: 2200 }, { rgbw: [100, 65, 18], duration: 2200 }, { rgbw: [90, 60, 15], duration: 2200 }] },
        { colors: [{ rgbw: [70, 50, 10], duration: 2200 }, { rgbw: [100, 65, 18], duration: 2200 }, { rgbw: [90, 60, 15], duration: 2200 }, { rgbw: [110, 70, 20], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3200, easing: easeInOutSine }, { axis: [280, 102], duration: 3200, easing: easeInOutSine }, { axis: [370, 90], duration: 3200, easing: easeInOutSine }], colors: [32, 48], ledRing: [82, 97], gobo: 0 },
        { moves: [{ axis: [200, 96], duration: 3500, easing: easeInOutSine }, { axis: [308, 106], duration: 3500, easing: easeInOutSine }, { axis: [250, 88], duration: 3500, easing: easeInOutSine }], colors: [48, 32], ledRing: [76, 91], gobo: 0 },
        { moves: [{ axis: [182, 90], duration: 3000, easing: easeInOutSine }, { axis: [294, 100], duration: 3000, easing: easeInOutSine }, { axis: [352, 94], duration: 3000, easing: easeInOutSine }], colors: [32, 48], ledRing: [86, 101], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [320, 102], duration: 2800 }, { axis: [200, 87], duration: 2800 }] },
        { ledRing: [72, 87], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3100 }, { axis: [336, 107], duration: 3100 }, { axis: [218, 90], duration: 3100 }] },
        { ledRing: [84, 98], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 2900 }, { axis: [304, 100], duration: 2900 }, { axis: [188, 84], duration: 2900 }] },
      ],
    },
  },

  'latin+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [100, 50, 10], duration: 2000 }, { rgbw: [120, 60, 15], duration: 2000 }, { rgbw: [80, 40, 8], duration: 2000 }, { rgbw: [110, 55, 12], duration: 2000 }] },
        { colors: [{ rgbw: [120, 60, 15], duration: 2000 }, { rgbw: [80, 40, 8], duration: 2000 }, { rgbw: [110, 55, 12], duration: 2000 }, { rgbw: [100, 50, 10], duration: 2000 }] },
        { colors: [{ rgbw: [80, 40, 8], duration: 2000 }, { rgbw: [110, 55, 12], duration: 2000 }, { rgbw: [100, 50, 10], duration: 2000 }, { rgbw: [120, 60, 15], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [272, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [32, 16], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [192, 94], duration: 3200, easing: easeInOutSine }, { axis: [302, 104], duration: 3200, easing: easeInOutSine }, { axis: [244, 86], duration: 3200, easing: easeInOutSine }], colors: [16, 32], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [174, 88], duration: 2800, easing: easeInOutSine }, { axis: [286, 98], duration: 2800, easing: easeInOutSine }, { axis: [356, 92], duration: 2800, easing: easeInOutSine }], colors: [32, 16], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [318, 100], duration: 2600 }, { axis: [198, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 44, starfield: true, moves: [{ axis: [268, 95], duration: 2900 }, { axis: [334, 105], duration: 2900 }, { axis: [214, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [238, 88], duration: 2700 }, { axis: [302, 98], duration: 2700 }, { axis: [186, 82], duration: 2700 }] },
      ],
    },
  },

  'dance+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 100, 160], duration: 2000 }, { rgbw: [50, 120, 180], duration: 2000 }, { rgbw: [30, 80, 140], duration: 2000 }, { rgbw: [45, 110, 170], duration: 2000 }] },
        { colors: [{ rgbw: [50, 120, 180], duration: 2000 }, { rgbw: [30, 80, 140], duration: 2000 }, { rgbw: [45, 110, 170], duration: 2000 }, { rgbw: [40, 100, 160], duration: 2000 }] },
        { colors: [{ rgbw: [30, 80, 140], duration: 2000 }, { rgbw: [45, 110, 170], duration: 2000 }, { rgbw: [40, 100, 160], duration: 2000 }, { rgbw: [50, 120, 180], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [170, 90], duration: 3000, easing: easeInOutSine }, { axis: [280, 100], duration: 3000, easing: easeInOutSine }, { axis: [370, 88], duration: 3000, easing: easeInOutSine }], colors: [80, 96], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [198, 94], duration: 3200, easing: easeInOutSine }, { axis: [308, 104], duration: 3200, easing: easeInOutSine }, { axis: [248, 86], duration: 3200, easing: easeInOutSine }], colors: [96, 80], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [178, 88], duration: 2800, easing: easeInOutSine }, { axis: [292, 98], duration: 2800, easing: easeInOutSine }, { axis: [354, 92], duration: 2800, easing: easeInOutSine }], colors: [80, 96], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 38, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [320, 100], duration: 2600 }, { axis: [200, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 42, starfield: true, moves: [{ axis: [270, 95], duration: 2900 }, { axis: [336, 105], duration: 2900 }, { axis: [216, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 36, starfield: true, moves: [{ axis: [240, 88], duration: 2700 }, { axis: [304, 98], duration: 2700 }, { axis: [188, 82], duration: 2700 }] },
      ],
    },
  },

  'blues+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [20, 20, 80], duration: 2200 }, { rgbw: [30, 30, 100], duration: 2200 }, { rgbw: [15, 15, 60], duration: 2200 }, { rgbw: [25, 25, 90], duration: 2200 }] },
        { colors: [{ rgbw: [30, 30, 100], duration: 2200 }, { rgbw: [15, 15, 60], duration: 2200 }, { rgbw: [25, 25, 90], duration: 2200 }, { rgbw: [20, 20, 80], duration: 2200 }] },
        { colors: [{ rgbw: [15, 15, 60], duration: 2200 }, { rgbw: [25, 25, 90], duration: 2200 }, { rgbw: [20, 20, 80], duration: 2200 }, { rgbw: [30, 30, 100], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [180, 92], duration: 3200, easing: easeInOutSine }, { axis: [290, 102], duration: 3200, easing: easeInOutSine }, { axis: [360, 90], duration: 3200, easing: easeInOutSine }], colors: [96, 0], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [208, 96], duration: 3500, easing: easeInOutSine }, { axis: [316, 106], duration: 3500, easing: easeInOutSine }, { axis: [255, 88], duration: 3500, easing: easeInOutSine }], colors: [0, 96], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [188, 90], duration: 3000, easing: easeInOutSine }, { axis: [298, 100], duration: 3000, easing: easeInOutSine }, { axis: [348, 94], duration: 3000, easing: easeInOutSine }], colors: [96, 0], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [320, 102], duration: 2800 }, { axis: [200, 87], duration: 2800 }] },
        { ledRing: [72, 87], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3100 }, { axis: [336, 107], duration: 3100 }, { axis: [218, 90], duration: 3100 }] },
        { ledRing: [84, 98], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 2900 }, { axis: [304, 100], duration: 2900 }, { axis: [188, 84], duration: 2900 }] },
      ],
    },
  },

  'reggae+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [20, 80, 20], duration: 2200 }, { rgbw: [30, 90, 25], duration: 2200 }, { rgbw: [15, 70, 15], duration: 2200 }, { rgbw: [25, 85, 20], duration: 2200 }] },
        { colors: [{ rgbw: [30, 90, 25], duration: 2200 }, { rgbw: [15, 70, 15], duration: 2200 }, { rgbw: [25, 85, 20], duration: 2200 }, { rgbw: [20, 80, 20], duration: 2200 }] },
        { colors: [{ rgbw: [15, 70, 15], duration: 2200 }, { rgbw: [25, 85, 20], duration: 2200 }, { rgbw: [20, 80, 20], duration: 2200 }, { rgbw: [30, 90, 25], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3200, easing: easeInOutSine }, { axis: [280, 102], duration: 3200, easing: easeInOutSine }, { axis: [370, 90], duration: 3200, easing: easeInOutSine }], colors: [64, 32], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [198, 96], duration: 3500, easing: easeInOutSine }, { axis: [308, 106], duration: 3500, easing: easeInOutSine }, { axis: [250, 88], duration: 3500, easing: easeInOutSine }], colors: [32, 64], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [180, 90], duration: 3000, easing: easeInOutSine }, { axis: [292, 100], duration: 3000, easing: easeInOutSine }, { axis: [350, 94], duration: 3000, easing: easeInOutSine }], colors: [64, 32], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [80, 94], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [318, 102], duration: 2800 }, { axis: [198, 87], duration: 2800 }] },
        { ledRing: [72, 87], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [270, 97], duration: 3100 }, { axis: [334, 107], duration: 3100 }, { axis: [216, 90], duration: 3100 }] },
        { ledRing: [84, 98], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [240, 90], duration: 2900 }, { axis: [302, 100], duration: 2900 }, { axis: [186, 84], duration: 2900 }] },
      ],
    },
  },

  'funk+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [90, 60, 0], duration: 2000 }, { rgbw: [110, 70, 5], duration: 2000 }, { rgbw: [70, 50, 0], duration: 2000 }, { rgbw: [100, 65, 3], duration: 2000 }] },
        { colors: [{ rgbw: [110, 70, 5], duration: 2000 }, { rgbw: [70, 50, 0], duration: 2000 }, { rgbw: [100, 65, 3], duration: 2000 }, { rgbw: [90, 60, 0], duration: 2000 }] },
        { colors: [{ rgbw: [70, 50, 0], duration: 2000 }, { rgbw: [100, 65, 3], duration: 2000 }, { rgbw: [90, 60, 0], duration: 2000 }, { rgbw: [110, 70, 5], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [272, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [32, 48], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [192, 94], duration: 3200, easing: easeInOutSine }, { axis: [302, 104], duration: 3200, easing: easeInOutSine }, { axis: [244, 86], duration: 3200, easing: easeInOutSine }], colors: [48, 32], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [174, 88], duration: 2800, easing: easeInOutSine }, { axis: [286, 98], duration: 2800, easing: easeInOutSine }, { axis: [356, 92], duration: 2800, easing: easeInOutSine }], colors: [32, 48], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [318, 100], duration: 2600 }, { axis: [198, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 44, starfield: true, moves: [{ axis: [268, 95], duration: 2900 }, { axis: [332, 105], duration: 2900 }, { axis: [212, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [238, 88], duration: 2700 }, { axis: [300, 98], duration: 2700 }, { axis: [184, 82], duration: 2700 }] },
      ],
    },
  },

  'house+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [10, 10, 80], duration: 2000 }, { rgbw: [15, 15, 100], duration: 2000 }, { rgbw: [8, 8, 60], duration: 2000 }, { rgbw: [12, 12, 90], duration: 2000 }] },
        { colors: [{ rgbw: [15, 15, 100], duration: 2000 }, { rgbw: [8, 8, 60], duration: 2000 }, { rgbw: [12, 12, 90], duration: 2000 }, { rgbw: [10, 10, 80], duration: 2000 }] },
        { colors: [{ rgbw: [8, 8, 60], duration: 2000 }, { rgbw: [12, 12, 90], duration: 2000 }, { rgbw: [10, 10, 80], duration: 2000 }, { rgbw: [15, 15, 100], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [170, 90], duration: 3000, easing: easeInOutSine }, { axis: [280, 100], duration: 3000, easing: easeInOutSine }, { axis: [370, 88], duration: 3000, easing: easeInOutSine }], colors: [96, 112], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [198, 94], duration: 3200, easing: easeInOutSine }, { axis: [308, 104], duration: 3200, easing: easeInOutSine }, { axis: [248, 86], duration: 3200, easing: easeInOutSine }], colors: [112, 96], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [178, 88], duration: 2800, easing: easeInOutSine }, { axis: [292, 98], duration: 2800, easing: easeInOutSine }, { axis: [354, 92], duration: 2800, easing: easeInOutSine }], colors: [96, 112], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 90], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [318, 100], duration: 2600 }, { axis: [198, 85], duration: 2600 }] },
        { ledRing: [68, 83], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [270, 95], duration: 2900 }, { axis: [334, 105], duration: 2900 }, { axis: [214, 88], duration: 2900 }] },
        { ledRing: [80, 94], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [240, 88], duration: 2700 }, { axis: [302, 98], duration: 2700 }, { axis: [186, 82], duration: 2700 }] },
      ],
    },
  },

  'disco+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 20, 80], duration: 2000 }, { rgbw: [100, 30, 100], duration: 2000 }, { rgbw: [60, 15, 60], duration: 2000 }, { rgbw: [90, 25, 90], duration: 2000 }] },
        { colors: [{ rgbw: [100, 30, 100], duration: 2000 }, { rgbw: [60, 15, 60], duration: 2000 }, { rgbw: [90, 25, 90], duration: 2000 }, { rgbw: [80, 20, 80], duration: 2000 }] },
        { colors: [{ rgbw: [60, 15, 60], duration: 2000 }, { rgbw: [90, 25, 90], duration: 2000 }, { rgbw: [80, 20, 80], duration: 2000 }, { rgbw: [100, 30, 100], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [272, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [128, 112], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [192, 94], duration: 3200, easing: easeInOutSine }, { axis: [302, 104], duration: 3200, easing: easeInOutSine }, { axis: [244, 86], duration: 3200, easing: easeInOutSine }], colors: [112, 128], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [174, 88], duration: 2800, easing: easeInOutSine }, { axis: [286, 98], duration: 2800, easing: easeInOutSine }, { axis: [356, 92], duration: 2800, easing: easeInOutSine }], colors: [128, 112], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [318, 100], duration: 2600 }, { axis: [198, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 44, starfield: true, moves: [{ axis: [268, 95], duration: 2900 }, { axis: [332, 105], duration: 2900 }, { axis: [212, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [238, 88], duration: 2700 }, { axis: [300, 98], duration: 2700 }, { axis: [184, 82], duration: 2700 }] },
      ],
    },
  },

  'metal+calm': {
    luminous: { head: 110, mini: 110, par: 60 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [10, 10, 30], duration: 2500 }, { rgbw: [15, 15, 40], duration: 2500 }, { rgbw: [8, 8, 25], duration: 2500 }, { rgbw: [12, 12, 35], duration: 2500 }] },
        { colors: [{ rgbw: [15, 15, 40], duration: 2500 }, { rgbw: [8, 8, 25], duration: 2500 }, { rgbw: [12, 12, 35], duration: 2500 }, { rgbw: [10, 10, 30], duration: 2500 }] },
        { colors: [{ rgbw: [8, 8, 25], duration: 2500 }, { rgbw: [12, 12, 35], duration: 2500 }, { rgbw: [10, 10, 30], duration: 2500 }, { rgbw: [15, 15, 40], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [180, 92], duration: 3500, easing: easeInOutSine }, { axis: [290, 102], duration: 3500, easing: easeInOutSine }, { axis: [370, 90], duration: 3500, easing: easeInOutSine }], colors: [96, 0], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [208, 96], duration: 3800, easing: easeInOutSine }, { axis: [316, 106], duration: 3800, easing: easeInOutSine }, { axis: [256, 88], duration: 3800, easing: easeInOutSine }], colors: [0, 96], ledRing: [68, 82], gobo: 0 },
        { moves: [{ axis: [188, 90], duration: 3200, easing: easeInOutSine }, { axis: [298, 100], duration: 3200, easing: easeInOutSine }, { axis: [350, 94], duration: 3200, easing: easeInOutSine }], colors: [96, 0], ledRing: [76, 91], gobo: 0 },
      ],
      mini: [
        { ledRing: [72, 86], gobo: false, beam: 132, laser: 35, starfield: true, moves: [{ axis: [255, 92], duration: 3000 }, { axis: [318, 102], duration: 3000 }, { axis: [198, 87], duration: 3000 }] },
        { ledRing: [66, 80], gobo: false, beam: 138, laser: 40, starfield: true, moves: [{ axis: [270, 97], duration: 3300 }, { axis: [334, 107], duration: 3300 }, { axis: [214, 90], duration: 3300 }] },
        { ledRing: [76, 90], gobo: false, beam: 128, laser: 33, starfield: true, moves: [{ axis: [240, 90], duration: 3100 }, { axis: [302, 100], duration: 3100 }, { axis: [186, 84], duration: 3100 }] },
      ],
    },
  },

  'hardrock+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [50, 10, 10], duration: 2200 }, { rgbw: [70, 15, 15], duration: 2200 }, { rgbw: [40, 8, 8], duration: 2200 }, { rgbw: [60, 12, 12], duration: 2200 }] },
        { colors: [{ rgbw: [70, 15, 15], duration: 2200 }, { rgbw: [40, 8, 8], duration: 2200 }, { rgbw: [60, 12, 12], duration: 2200 }, { rgbw: [50, 10, 10], duration: 2200 }] },
        { colors: [{ rgbw: [40, 8, 8], duration: 2200 }, { rgbw: [60, 12, 12], duration: 2200 }, { rgbw: [50, 10, 10], duration: 2200 }, { rgbw: [70, 15, 15], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3200, easing: easeInOutSine }, { axis: [280, 102], duration: 3200, easing: easeInOutSine }, { axis: [370, 90], duration: 3200, easing: easeInOutSine }], colors: [16, 0], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [198, 96], duration: 3500, easing: easeInOutSine }, { axis: [308, 106], duration: 3500, easing: easeInOutSine }, { axis: [250, 88], duration: 3500, easing: easeInOutSine }], colors: [0, 16], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [180, 90], duration: 3000, easing: easeInOutSine }, { axis: [292, 100], duration: 3000, easing: easeInOutSine }, { axis: [352, 94], duration: 3000, easing: easeInOutSine }], colors: [16, 0], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 90], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [318, 102], duration: 2800 }, { axis: [198, 87], duration: 2800 }] },
        { ledRing: [68, 83], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [270, 97], duration: 3100 }, { axis: [334, 107], duration: 3100 }, { axis: [216, 90], duration: 3100 }] },
        { ledRing: [80, 94], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [240, 90], duration: 2900 }, { axis: [302, 100], duration: 2900 }, { axis: [186, 84], duration: 2900 }] },
      ],
    },
  },

  'chillout+calm': {
    luminous: { head: 120, mini: 110, par: 70 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [30, 60, 120], duration: 2500 }, { rgbw: [40, 70, 140], duration: 2500 }, { rgbw: [20, 50, 100], duration: 2500 }, { rgbw: [35, 65, 130], duration: 2500 }] },
        { colors: [{ rgbw: [40, 70, 140], duration: 2500 }, { rgbw: [20, 50, 100], duration: 2500 }, { rgbw: [35, 65, 130], duration: 2500 }, { rgbw: [30, 60, 120], duration: 2500 }] },
        { colors: [{ rgbw: [20, 50, 100], duration: 2500 }, { rgbw: [35, 65, 130], duration: 2500 }, { rgbw: [30, 60, 120], duration: 2500 }, { rgbw: [40, 70, 140], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [175, 92], duration: 3500, easing: easeInOutSine }, { axis: [285, 102], duration: 3500, easing: easeInOutSine }, { axis: [375, 90], duration: 3500, easing: easeInOutSine }], colors: [96, 80], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [202, 96], duration: 3800, easing: easeInOutSine }, { axis: [312, 106], duration: 3800, easing: easeInOutSine }, { axis: [252, 88], duration: 3800, easing: easeInOutSine }], colors: [80, 96], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [182, 90], duration: 3200, easing: easeInOutSine }, { axis: [295, 100], duration: 3200, easing: easeInOutSine }, { axis: [358, 94], duration: 3200, easing: easeInOutSine }], colors: [96, 80], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 3000 }, { axis: [320, 102], duration: 3000 }, { axis: [200, 87], duration: 3000 }] },
        { ledRing: [70, 85], gobo: false, beam: 142, laser: 42, starfield: true, moves: [{ axis: [272, 97], duration: 3300 }, { axis: [336, 107], duration: 3300 }, { axis: [218, 90], duration: 3300 }] },
        { ledRing: [82, 96], gobo: false, beam: 132, laser: 36, starfield: true, moves: [{ axis: [242, 90], duration: 3100 }, { axis: [306, 100], duration: 3100 }, { axis: [188, 84], duration: 3100 }] },
      ],
    },
  },

  'triphop+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [40, 10, 80], duration: 2200 }, { rgbw: [50, 15, 100], duration: 2200 }, { rgbw: [30, 8, 60], duration: 2200 }, { rgbw: [45, 12, 90], duration: 2200 }] },
        { colors: [{ rgbw: [50, 15, 100], duration: 2200 }, { rgbw: [30, 8, 60], duration: 2200 }, { rgbw: [45, 12, 90], duration: 2200 }, { rgbw: [40, 10, 80], duration: 2200 }] },
        { colors: [{ rgbw: [30, 8, 60], duration: 2200 }, { rgbw: [45, 12, 90], duration: 2200 }, { rgbw: [40, 10, 80], duration: 2200 }, { rgbw: [50, 15, 100], duration: 2200 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3200, easing: easeInOutSine }, { axis: [280, 102], duration: 3200, easing: easeInOutSine }, { axis: [370, 90], duration: 3200, easing: easeInOutSine }], colors: [112, 96], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [198, 96], duration: 3500, easing: easeInOutSine }, { axis: [308, 106], duration: 3500, easing: easeInOutSine }, { axis: [250, 88], duration: 3500, easing: easeInOutSine }], colors: [96, 112], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [180, 90], duration: 3000, easing: easeInOutSine }, { axis: [292, 100], duration: 3000, easing: easeInOutSine }, { axis: [352, 94], duration: 3000, easing: easeInOutSine }], colors: [112, 96], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 90], gobo: false, beam: 138, laser: 38, starfield: true, moves: [{ axis: [255, 92], duration: 2800 }, { axis: [318, 102], duration: 2800 }, { axis: [198, 87], duration: 2800 }] },
        { ledRing: [68, 83], gobo: false, beam: 144, laser: 42, starfield: true, moves: [{ axis: [270, 97], duration: 3100 }, { axis: [334, 107], duration: 3100 }, { axis: [216, 90], duration: 3100 }] },
        { ledRing: [80, 94], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [240, 90], duration: 2900 }, { axis: [302, 100], duration: 2900 }, { axis: [186, 84], duration: 2900 }] },
      ],
    },
  },

  'newage+calm': {
    luminous: { head: 115, mini: 105, par: 70 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [60, 80, 120], duration: 2500 }, { rgbw: [70, 90, 140], duration: 2500 }, { rgbw: [50, 70, 100], duration: 2500 }, { rgbw: [65, 85, 130], duration: 2500 }] },
        { colors: [{ rgbw: [70, 90, 140], duration: 2500 }, { rgbw: [50, 70, 100], duration: 2500 }, { rgbw: [65, 85, 130], duration: 2500 }, { rgbw: [60, 80, 120], duration: 2500 }] },
        { colors: [{ rgbw: [50, 70, 100], duration: 2500 }, { rgbw: [65, 85, 130], duration: 2500 }, { rgbw: [60, 80, 120], duration: 2500 }, { rgbw: [70, 90, 140], duration: 2500 }] },
      ],
      head: [
        { moves: [{ axis: [178, 92], duration: 3800, easing: easeInOutSine }, { axis: [288, 102], duration: 3800, easing: easeInOutSine }, { axis: [368, 90], duration: 3800, easing: easeInOutSine }], colors: [0, 96], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [205, 96], duration: 4000, easing: easeInOutSine }, { axis: [312, 106], duration: 4000, easing: easeInOutSine }, { axis: [252, 88], duration: 4000, easing: easeInOutSine }], colors: [96, 0], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [185, 90], duration: 3500, easing: easeInOutSine }, { axis: [295, 100], duration: 3500, easing: easeInOutSine }, { axis: [355, 94], duration: 3500, easing: easeInOutSine }], colors: [0, 96], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 90], gobo: false, beam: 134, laser: 36, starfield: true, moves: [{ axis: [255, 92], duration: 3200 }, { axis: [318, 102], duration: 3200 }, { axis: [198, 87], duration: 3200 }] },
        { ledRing: [68, 83], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [270, 97], duration: 3500 }, { axis: [334, 107], duration: 3500 }, { axis: [214, 90], duration: 3500 }] },
        { ledRing: [80, 94], gobo: false, beam: 130, laser: 34, starfield: true, moves: [{ axis: [240, 90], duration: 3300 }, { axis: [302, 100], duration: 3300 }, { axis: [186, 84], duration: 3300 }] },
      ],
    },
  },

  'psychedelic+calm': {
    luminous: { head: 130, mini: 120, par: 80 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [60, 10, 100], duration: 2300 }, { rgbw: [80, 20, 120], duration: 2300 }, { rgbw: [50, 8, 80], duration: 2300 }, { rgbw: [70, 15, 110], duration: 2300 }] },
        { colors: [{ rgbw: [80, 20, 120], duration: 2300 }, { rgbw: [50, 8, 80], duration: 2300 }, { rgbw: [70, 15, 110], duration: 2300 }, { rgbw: [60, 10, 100], duration: 2300 }] },
        { colors: [{ rgbw: [50, 8, 80], duration: 2300 }, { rgbw: [70, 15, 110], duration: 2300 }, { rgbw: [60, 10, 100], duration: 2300 }, { rgbw: [80, 20, 120], duration: 2300 }] },
      ],
      head: [
        { moves: [{ axis: [170, 92], duration: 3300, easing: easeInOutSine }, { axis: [280, 102], duration: 3300, easing: easeInOutSine }, { axis: [370, 90], duration: 3300, easing: easeInOutSine }], colors: [112, 80], ledRing: [78, 93], gobo: 0 },
        { moves: [{ axis: [198, 96], duration: 3600, easing: easeInOutSine }, { axis: [308, 106], duration: 3600, easing: easeInOutSine }, { axis: [250, 88], duration: 3600, easing: easeInOutSine }], colors: [80, 112], ledRing: [72, 87], gobo: 0 },
        { moves: [{ axis: [180, 90], duration: 3100, easing: easeInOutSine }, { axis: [292, 100], duration: 3100, easing: easeInOutSine }, { axis: [353, 94], duration: 3100, easing: easeInOutSine }], colors: [112, 80], ledRing: [82, 97], gobo: 0 },
      ],
      mini: [
        { ledRing: [76, 90], gobo: false, beam: 138, laser: 40, starfield: true, moves: [{ axis: [255, 92], duration: 2900 }, { axis: [318, 102], duration: 2900 }, { axis: [198, 87], duration: 2900 }] },
        { ledRing: [68, 83], gobo: false, beam: 144, laser: 44, starfield: true, moves: [{ axis: [270, 97], duration: 3200 }, { axis: [334, 107], duration: 3200 }, { axis: [214, 90], duration: 3200 }] },
        { ledRing: [80, 94], gobo: false, beam: 134, laser: 38, starfield: true, moves: [{ axis: [240, 90], duration: 3000 }, { axis: [302, 100], duration: 3000 }, { axis: [186, 84], duration: 3000 }] },
      ],
    },
  },

  'energetic+calm': {
    luminous: { head: 135, mini: 125, par: 85 },
    strobing: { threshold: 0.9, paceWeight: 0.2, energyWeight: 0.8, danceExp: 3.0 },
    variants: {
      par: [
        { colors: [{ rgbw: [80, 40, 10], duration: 2000 }, { rgbw: [100, 50, 15], duration: 2000 }, { rgbw: [60, 30, 8], duration: 2000 }, { rgbw: [90, 45, 12], duration: 2000 }] },
        { colors: [{ rgbw: [100, 50, 15], duration: 2000 }, { rgbw: [60, 30, 8], duration: 2000 }, { rgbw: [90, 45, 12], duration: 2000 }, { rgbw: [80, 40, 10], duration: 2000 }] },
        { colors: [{ rgbw: [60, 30, 8], duration: 2000 }, { rgbw: [90, 45, 12], duration: 2000 }, { rgbw: [80, 40, 10], duration: 2000 }, { rgbw: [100, 50, 15], duration: 2000 }] },
      ],
      head: [
        { moves: [{ axis: [160, 90], duration: 3000, easing: easeInOutSine }, { axis: [272, 100], duration: 3000, easing: easeInOutSine }, { axis: [380, 88], duration: 3000, easing: easeInOutSine }], colors: [32, 16], ledRing: [80, 95], gobo: 0 },
        { moves: [{ axis: [192, 94], duration: 3200, easing: easeInOutSine }, { axis: [302, 104], duration: 3200, easing: easeInOutSine }, { axis: [244, 86], duration: 3200, easing: easeInOutSine }], colors: [16, 32], ledRing: [74, 89], gobo: 0 },
        { moves: [{ axis: [174, 88], duration: 2800, easing: easeInOutSine }, { axis: [286, 98], duration: 2800, easing: easeInOutSine }, { axis: [356, 92], duration: 2800, easing: easeInOutSine }], colors: [32, 16], ledRing: [84, 99], gobo: 0 },
      ],
      mini: [
        { ledRing: [78, 92], gobo: false, beam: 140, laser: 40, starfield: true, moves: [{ axis: [255, 90], duration: 2600 }, { axis: [318, 100], duration: 2600 }, { axis: [198, 85], duration: 2600 }] },
        { ledRing: [70, 85], gobo: false, beam: 146, laser: 44, starfield: true, moves: [{ axis: [268, 95], duration: 2900 }, { axis: [332, 105], duration: 2900 }, { axis: [212, 88], duration: 2900 }] },
        { ledRing: [82, 96], gobo: false, beam: 136, laser: 38, starfield: true, moves: [{ axis: [238, 88], duration: 2700 }, { axis: [300, 98], duration: 2700 }, { axis: [184, 82], duration: 2700 }] },
      ],
    },
  },

  idle: {
    luminous: {
      head: 190,
      mini: 230,
      par: 165
    },
    strobing: { threshold: 0.99, energyWeight: 0.6 },
    variants: {
      head: [
        {
          colors: [112],
          gobo: 0,
          ledRing: [70],
          moves: [
            { axis: [0, 90], duration: 100 }
          ]
        }
      ],
      mini: [
        {
          beam: 255,
          laser: 0,
          ledRing: [40],
          moves: [{ axis: [255, 90], duration: 100 }]
        }
      ],
      par: [
        {
          colors: [
            { rgbw: [255, 0, 0], duration: 500 },
            { rgbw: [0, 255, 0], duration: 500 },
            { rgbw: [0, 0, 255], duration: 500 },
          ]
        }
      ]
    }
  }
}


