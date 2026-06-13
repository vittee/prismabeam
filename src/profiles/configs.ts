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
  'hard rock': {
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
  chill: {
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

  // Warm soft tones, slow motor. Dusty rose/peach/sage PAR at 3s. Gentle organic drifts.
  // No laser, no strobe. Acoustic-warm, unhurried — softer and slower than chill.
  mellow: {
    luminous: { head: 130, mini: 175, par: 115 },
    strobing: { threshold: 0.88, paceWeight: 0.12, energyWeight: 0.88, danceExp: 2.0 },
    variants: {
      par: [
        {
          colors: [
            { rgbw: [200, 130, 100], duration: 3000 },
            { rgbw: [160, 180, 120], duration: 3000 },
            { rgbw: [210, 150, 110], duration: 3000 },
          ]
        },
        {
          colors: [
            { rgbw: [180, 120, 80], duration: 3500 },
            { rgbw: [200, 160, 130], duration: 3500 },
            { rgbw: [150, 180, 110], duration: 3500 },
          ]
        },
        {
          colors: [
            { rgbw: [220, 150, 120], duration: 3500 },
            { rgbw: [170, 200, 140], duration: 3500 },
            { rgbw: [200, 140, 100], duration: 3500 },
            { rgbw: [160, 190, 130], duration: 3500 },
          ]
        },
      ],
      head: [
        {
          moves: [
            { axis: [205, 82], duration: 5000, easing: easeInOutSine },
            { axis: [310, 70], duration: 5000, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [72, 82], gobo: 0,
        },
        {
          moves: [
            { axis: [175, 88], duration: 5500, easing: easeInOutSine },
            { axis: [315, 72], duration: 5500, easing: easeInOutSine },
            { axis: [250, 86], duration: 5500, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [78, 88], gobo: 0,
        },
        {
          moves: [
            { axis: [190, 80], duration: 6000, easing: easeInOutSine },
            { axis: [300, 68], duration: 6000, easing: easeInOutSine },
            { axis: [240, 84], duration: 6000, easing: easeInOutSine },
            { axis: [280, 74], duration: 6000, easing: easeInOutSine },
          ],
          colors: [64, 48], ledRing: [68, 78], gobo: 0,
        },
      ],
      mini: [
        { ledRing: [40, 50], gobo: true, beam: 90, laser: 22, starfield: true, moves: [
          { axis: [255, 60], duration: 5000 },
          { axis: [405, 75], duration: 5000 },
          { axis: [555, 60], duration: 5000 },
          { axis: [405, 50], duration: 5000 },
        ]},
        { ledRing: [30, 40], gobo: true, beam: 80, laser: 18, starfield: true, moves: [
          { axis: [210, 60], duration: 5000 },
          { axis: [360, 75], duration: 5000 },
          { axis: [510, 60], duration: 5000 },
          { axis: [360, 50], duration: 5000 },
        ]},
        { ledRing: [50, 60], gobo: true, beam: 100, laser: 25, starfield: true, moves: [
          { axis: [300, 60], duration: 5000 },
          { axis: [450, 75], duration: 5000 },
          { axis: [600, 60], duration: 5000 },
          { axis: [450, 50], duration: 5000 },
        ]},
      ],
    },
  },

  // Medium-bright warm whites and pastels, slow motor. Cream/peach/sky PAR at 2.5s. Relaxed sweeps.
  // Light gobo, no strobe. Pleasant, bright lounge feel — warmer and lighter than mellow.
  'easy listening': {
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
        { ledRing: [70, 80], gobo: true, beam: 120, laser: 35, moves: [
          { axis: [255, 35], duration: 3500 },
          { axis: [405, 60], duration: 3500 },
          { axis: [555, 35], duration: 3500 },
          { axis: [405, 15], duration: 3500 },
        ]},
        { ledRing: [60, 70], gobo: true, beam: 110, laser: 30, moves: [
          { axis: [210, 35], duration: 3500 },
          { axis: [360, 60], duration: 3500 },
          { axis: [510, 35], duration: 3500 },
          { axis: [360, 15], duration: 3500 },
        ]},
        { ledRing: [80, 90], gobo: true, beam: 130, laser: 40, moves: [
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
  'hip-hop': {
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
  'r&b': {
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
        { ledRing: [82, 90], gobo: true, beam: 140, laser: 55, moves: [
          { axis: [255, 35], duration: 1200 },
          { axis: [405, 60], duration: 1200 },
          { axis: [555, 35], duration: 1200 },
          { axis: [405, 15], duration: 1200 },
        ]},
        { ledRing: [50, 60], gobo: true, beam: 120, laser: 50, moves: [
          { axis: [210, 35], duration: 1200 },
          { axis: [360, 60], duration: 1200 },
          { axis: [510, 35], duration: 1200 },
          { axis: [360, 15], duration: 1200 },
        ]},
        { ledRing: [20, 30], gobo: true, beam: 110, laser: 45, moves: [
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
  'trip-hop': {
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
  'new age': {
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


