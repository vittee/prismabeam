import { Profile } from "./types";
import { easeInExpo, easeInOutSine, easeInSine } from "../utils/easing";

export const ProfileConfigs: Record<string, Profile> = {
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
        {
          ledRing: [200, 210], gobo: true, beam: 200, laser: 65, starfield: true,
        },
        {
          ledRing: [220, 230], gobo: true, beam: 220, laser: 75, starfield: true,
        },
        {
          ledRing: [190, 210], gobo: false, beam: 180, laser: 60, starfield: true,
        },
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
          // Center-right (210°) → left (125°) → right (380°), tilt 56→76→90. Starts low-center, snaps low-left, slams high-right.
          moves: [
            { axis: [210, 56], duration: 400, easing: easeInExpo },
            { axis: [125, 76], duration: 400, easing: easeInExpo },
            { axis: [380, 90], duration: 400, easing: easeInExpo },
          ],
          colors: [16, 80], ledRing: [136, 154], gobo: 16,
        },
        {
          // Far-left (40°) → extreme-right (465°) → center (255°), tilt 63→78→56. ~425° pan excursion, returns center-low.
          moves: [
            { axis: [40, 63], duration: 400, easing: easeInExpo },
            { axis: [465, 78], duration: 400, easing: easeInExpo },
            { axis: [255, 56], duration: 400, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [112, 100], gobo: 48,
        },
      ],
      mini: [
        {
          ledRing: [180, 200], gobo: true, beam: 200, laser: 55, starfield: true,
        },
        {
          ledRing: [160, 180], gobo: true, beam: 220, laser: 70, starfield: true,
        },
        {
          ledRing: [210, 230], gobo: false, beam: 190, laser: 60, starfield: true,
        },
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
        {
          ledRing: [40, 30], gobo: true, beam: 170, laser: 80,
        },
        {
          ledRing: [50, 40], gobo: true, beam: 190, laser: 80,
        },
        {
          ledRing: [20, 10], gobo: false, beam: 150, laser: 80,
        },
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
        {
          ledRing: [90, 100], gobo: true, beam: 140, laser: 80,
        },
        {
          ledRing: [120, 130], gobo: true, beam: 120, laser: 80,
        },
        {
          ledRing: [60, 70], gobo: false, beam: 110, laser: 80,
        },
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
        {
          ledRing: [130, 140], gobo: true, beam: 150, laser: 80,
        },
        {
          ledRing: [110, 120], gobo: true, beam: 130, laser: 80,
        },
        {
          ledRing: [150, 140], gobo: false, beam: 120, laser: 80,
        },
      ],
    },
  },

  // Bright, punchy. Purple/green/dark PAR at 400ms with dark rest beat. Fast expo head snaps.
  // Gobo spinning, prism on. Trap/rap club energy.
  'hip hop': {
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
          // Far-left (85°) → far-right (425°) → center (235°), tilt 56→90→66. Wide ~340° snap, slams high-right, lands center-mid.
          moves: [
            { axis: [85, 56], duration: 500, easing: easeInExpo },
            { axis: [425, 90], duration: 500, easing: easeInExpo },
            { axis: [235, 66], duration: 500, easing: easeInExpo },
          ],
          colors: [16, 112], ledRing: [196, 214], gobo: 160,
        },
        {
          // Right (275°) → left (170°) → far-right (425°), tilt 56→100→66. Reverse direction snap: starts right-low, lifts left-high, fires far-right.
          moves: [
            { axis: [275, 56], duration: 500, easing: easeInExpo },
            { axis: [170, 100], duration: 500, easing: easeInExpo },
            { axis: [425, 66], duration: 500, easing: easeInExpo },
          ],
          colors: [64, 112], ledRing: [220, 190], gobo: 48,
        },
      ],
      mini: [
        {
          ledRing: [180, 170], gobo: true, beam: 200, laser: 45, starfield: true,
        },
        {
          ledRing: [200, 210], gobo: true, beam: 210, laser: 60, starfield: true,
        },
        {
          ledRing: [160, 180], gobo: false, beam: 180, laser: 50, starfield: true,
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
          // Left (170°) → center-right (295°) → center (235°) → right (350°), tilt 70→90→62→76. Slow dub drift with a descending-then-climbing tilt path.
          moves: [
            { axis: [170, 70], duration: 1800, easing: easeInOutSine },
            { axis: [295, 90], duration: 1800, easing: easeInOutSine },
            { axis: [235, 62], duration: 1800, easing: easeInOutSine },
            { axis: [350, 76], duration: 1800, easing: easeInOutSine },
          ],
          colors: [32, 80], ledRing: [82, 76], gobo: 32,
        },
      ],
      mini: [
        {
          ledRing: [70, 80], gobo: true, beam: 160, laser: 80,
        },
        {
          ledRing: [60, 50], gobo: true, beam: 140, laser: 80,
        },
        {
          ledRing: [30, 20], gobo: false, beam: 120, laser: 80,
        },
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
          ledRing: [190, 200], gobo: true, beam: 190, laser: 40, starfield: true,
        },
        {
          ledRing: [200, 220], gobo: true, beam: 200, laser: 55, starfield: true,
        },
        {
          ledRing: [40, 50], gobo: false, beam: 170, laser: 45, starfield: true,
        },
      ],
    },
  },

  // Medium brightness, medium-slow motor. Orange/magenta/gold PAR at 800ms. Smooth three-point head.
  // Light prism on some variants. Groove-driven, warm.
  'funk / soul': {
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
        {
          ledRing: [100, 90], gobo: true, beam: 180, laser: 80,
        },
        {
          ledRing: [110, 120], gobo: true, beam: 170, laser: 80,
        },
        {
          ledRing: [80, 70], gobo: false, beam: 150, laser: 80,
        },
      ],
    },
  },

  // Dim earthy tones, very slow motor. Warm amber/sage PAR with long 2.5s transitions.
  // No prism, minimal gobo. Acoustic, pastoral feel.
  'folk, world, & country': {
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
        {
          ledRing: [20, 30], gobo: true, beam: 130, laser: 80,
        },
        {
          ledRing: [10, 20], gobo: true, beam: 110, laser: 80,
        },
        {
          ledRing: [60, 50], gobo: false, beam: 100, laser: 80,
        },
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
        {
          ledRing: [50, 60], gobo: true, beam: 110, laser: 80,
        },
        {
          ledRing: [10, 20], gobo: true, beam: 90, laser: 80,
        },
        {
          ledRing: [30, 40], gobo: false, beam: 80, laser: 80,
        },
      ],
    },
  },

  // Medium bright warm theatrical tones, very slow motor. Warm peach/periwinkle PAR with white additive.
  // 4s slow head, minimal gobo, slight prism on one variant. Broadway/film score feel.
  'stage & screen': {
    luminous: { head: 200, mini: 230, par: 160 },
    strobing: { threshold: 0.7, paceWeight: 0.15, energyWeight: 0.85, danceExp: 1.8 },
    variants: {
      par: [
        // Warm peach→cool periwinkle PAR with white. Slight prism.
        {
          colors: [
            { rgbw: [255, 200, 150, 100], duration: 3000 },
            { rgbw: [200, 200, 255, 0], duration: 3000 },
          ]
        },
        // Peach→lavender→cream PAR. No prism, subtle gobo.
        {
          colors: [
            { rgbw: [255, 180, 120, 80], duration: 3000 },
            { rgbw: [180, 180, 255, 20], duration: 3000 },
            { rgbw: [255, 220, 180, 60], duration: 3000 },
          ]
        },
        // Amber spotlight→cool blue wash→warm white PAR.
        {
          colors: [
            { rgbw: [255, 160, 80, 120], duration: 3500 },
            { rgbw: [150, 170, 255, 10], duration: 3500 },
            { rgbw: [255, 230, 200, 80], duration: 3500 },
            { rgbw: [170, 190, 220, 30], duration: 3500 },
          ]
        },
      ],
      head: [
        {
          // Center (255°) ↔ right-center (275°), tilt 80→70. 20° pan nudge only — spotlight-like, barely moves. Theatrical focus.
          moves: [
            { axis: [255, 80], duration: 4000, easing: easeInOutSine },
            { axis: [275, 70], duration: 4000, easing: easeInOutSine },
          ],
          colors: [0, 80], ledRing: [100, 106], gobo: 0,
        },
        {
          // Left-center (210°) → right (320°) → center (255°), tilt 76→98→68. Slow theatrical reveal: starts even, rises right, dips low-center like a curtain fall.
          moves: [
            { axis: [210, 76], duration: 4000, easing: easeInOutSine },
            { axis: [320, 98], duration: 4000, easing: easeInOutSine },
            { axis: [255, 68], duration: 4000, easing: easeInOutSine },
          ],
          colors: [80, 64], ledRing: [88, 94], gobo: 16,
        },
        {
          // 220→305→245→275°, tilt 82→68→92→62. Four-point stage wander within an 85° window, tilt alternates high-low for a slow stage-cross feel.
          moves: [
            { axis: [220, 82], duration: 4500, easing: easeInOutSine },
            { axis: [305, 68], duration: 4500, easing: easeInOutSine },
            { axis: [245, 92], duration: 4500, easing: easeInOutSine },
            { axis: [275, 62], duration: 4500, easing: easeInOutSine },
          ],
          colors: [0, 96], ledRing: [106, 100], gobo: 0,
        },
      ],
      mini: [
        {
          ledRing: [90, 110], gobo: true, beam: 160, laser: 80,
        },
        {
          ledRing: [100, 120], gobo: true, beam: 140, laser: 80,
        },
        {
          ledRing: [60, 50], gobo: false, beam: 130, laser: 80,
        },
      ],
    },
  },

  // Max brightness, fast motor. Deep blue/cyan/white rapid 200ms cycling. Aggressive expo snaps.
  // Prism always on, fast gobo spin. 4-on-the-floor club energy distinct from general Electronic.
  'house / techno / trance': {
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
        {
          ledRing: [210, 230], gobo: true, beam: 210, laser: 75, starfield: true,
        },
        {
          ledRing: [220, 200], gobo: true, beam: 220, laser: 80, starfield: true,
        },
        {
          ledRing: [180, 190], gobo: false, beam: 200, laser: 70, starfield: true,
        },
      ],
    },
  },

  // Very dim, near-static. Dark charcoal/deep teal/black PAR at 6–8s. Barely-moving head.
  // No prism, no gobo. Meditative, dark, near-silence visual.
  'ambient / drone': {
    luminous: { head: 60, mini: 80, par: 40 },
    strobing: { threshold: 0.95, paceWeight: 0.1, energyWeight: 0.9, danceExp: 2.5 },
    variants: {
      par: [
        // Near-black→deep teal→black PAR.
        {
          colors: [
            { rgbw: [0, 20, 40], duration: 8000 },
            { rgbw: [0, 50, 60], duration: 8000 },
            { rgbw: [0, 10, 30], duration: 8000 },
          ]
        },
        // Deep indigo→near-black→slate PAR.
        {
          colors: [
            { rgbw: [20, 0, 60], duration: 8000 },
            { rgbw: [5, 5, 30], duration: 8000 },
            { rgbw: [10, 20, 50], duration: 8000 },
          ]
        },
      ],
      head: [
        {
          // Center (235°) ↔ center (265°), tilt 75→80. 30° drift over 12 seconds — barely visible, like a breath.
          moves: [
            { axis: [235, 75], duration: 12000, easing: easeInOutSine },
            { axis: [265, 80], duration: 12000, easing: easeInOutSine },
          ],
          colors: [112, 48], ledRing: [70, 76], gobo: 0,
        },
        {
          // 245→255→235°, tilt 80→70→85. Tiny 20° triangle over 45 seconds total — completely still to the casual observer.
          moves: [
            { axis: [245, 80], duration: 15000, easing: easeInOutSine },
            { axis: [255, 70], duration: 15000, easing: easeInOutSine },
            { axis: [235, 85], duration: 15000, easing: easeInOutSine },
          ],
          colors: [48, 112], ledRing: [0, 70], gobo: 0,
        },
      ],
      mini: [
        {
          ledRing: [0, 10], gobo: false, beam: 40, laser: 0,
        },
        {
          ledRing: [0, 10], gobo: false, beam: 30, laser: 0,
        },
      ],
    },
  },

  // Medium-bright warm, slow motor. Deep rose/mauve/amber PAR at 1.5s. Gentle two/three-point head.
  // Light prism on some variants. Smooth, sensual, late-night feel.
  'r&b / soul': {
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
          // Far-left (85°) → far-right (400°) → center (245°), tilt 60→80→65. Wide R&B spread, rises right, settles mid-low center.
          moves: [
            { axis: [85, 60], duration: 2000, easing: easeInOutSine },
            { axis: [400, 80], duration: 2000, easing: easeInOutSine },
            { axis: [245, 65], duration: 2000, easing: easeInOutSine },
          ],
          colors: [96, 16], ledRing: [166, 178], gobo: 16,
        },
      ],
      mini: [
        {
          ledRing: [80, 60], gobo: true, beam: 160, laser: 80,
        },
        {
          ledRing: [70, 80], gobo: true, beam: 150, laser: 80,
        },
        {
          ledRing: [110, 100], gobo: false, beam: 130, laser: 80,
        },
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
          // Extreme-left (30°) → extreme-right (495°) → center (255°), tilt 56→70→56. Three-point annihilation: slams across ~465°, drops tilt abruptly center.
          moves: [
            { axis: [30, 56], duration: 280, easing: easeInExpo },
            { axis: [495, 70], duration: 280, easing: easeInExpo },
            { axis: [255, 56], duration: 280, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [190, 154], gobo: 48,
        },
        {
          // Extreme-left (20°) → extreme-right (510°) → center (235°), tilt 60→56→58. Near-maximum 490° sweep, lands low-center — chaotic thrash pattern.
          moves: [
            { axis: [20, 60], duration: 300, easing: easeInExpo },
            { axis: [510, 56], duration: 300, easing: easeInExpo },
            { axis: [235, 58], duration: 300, easing: easeInExpo },
          ],
          colors: [16, 80], ledRing: [220, 250], gobo: 16,
        },
        {
          // Left (65°) → far-right (465°) → right-center (275°), tilt 64→56→76. Drops low on the slam-right, rebounds high-center. Most erratic Metal move.
          moves: [
            { axis: [65, 64], duration: 250, easing: easeInExpo },
            { axis: [465, 56], duration: 250, easing: easeInExpo },
            { axis: [275, 76], duration: 250, easing: easeInExpo },
          ],
          colors: [0, 16], ledRing: [238, 220], gobo: 64,
        },
      ],
      mini: [
        {
          ledRing: [160, 180], gobo: true, beam: 220, laser: 70, starfield: true,
        },
        {
          ledRing: [180, 200], gobo: true, beam: 230, laser: 80, starfield: true,
        },
        {
          ledRing: [210, 230], gobo: true, beam: 215, laser: 75, starfield: true,
        },
        {
          ledRing: [150, 160], gobo: false, beam: 200, laser: 65, starfield: true,
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
          // Left (160°) → right (305°) → center (220°) → far-right (340°), tilt 75→65→80→70. Four-point waltz, tilt rocks up-down-up-down like a bow on each beat.
          moves: [
            { axis: [160, 75], duration: 1400, easing: easeInOutSine },
            { axis: [305, 65], duration: 1400, easing: easeInOutSine },
            { axis: [220, 80], duration: 1400, easing: easeInOutSine },
            { axis: [340, 70], duration: 1400, easing: easeInOutSine },
          ],
          colors: [64, 80], ledRing: [94, 88], gobo: 16,
        },
      ],
      mini: [
        {
          ledRing: [82, 90], gobo: true, beam: 140, laser: 80,
        },
        {
          ledRing: [50, 60], gobo: true, beam: 120, laser: 80,
        },
        {
          ledRing: [20, 30], gobo: false, beam: 110, laser: 80,
        },
      ],
    },
  },

  // High brightness, fast motor. Hyper-saturated neon pastels — hot pink/mint/yellow/sky.
  // PAR cycles at 250-400ms. Playful expo/sine head mix. Prism on, fast gobo.
  'k-pop / j-pop': {
    luminous: { head: 240, mini: 255, par: 195 },
    strobing: { threshold: 0.18, paceWeight: 0.3, energyWeight: 0.7, danceExp: 0.9 },
    variants: {
      par: [
        // Hot pink→mint→yellow→sky PAR.
        {
          colors: [
            { rgbw: [255, 50, 200], duration: 300 },
            { rgbw: [50, 255, 180], duration: 300 },
            { rgbw: [255, 240, 0], duration: 300 },
            { rgbw: [0, 200, 255], duration: 300 },
          ]
        },
        // Coral→lime→lavender→gold PAR.
        {
          colors: [
            { rgbw: [255, 100, 100], duration: 350 },
            { rgbw: [100, 255, 100], duration: 350 },
            { rgbw: [200, 100, 255], duration: 350 },
            { rgbw: [255, 220, 50], duration: 350 },
          ]
        },
        // White→electric blue→neon pink→white PAR. Fast flash feel, prism max.
        {
          colors: [
            { rgbw: [255, 255, 255], duration: 200 },
            { rgbw: [0, 150, 255], duration: 300 },
            { rgbw: [255, 0, 200], duration: 300 },
            { rgbw: [255, 255, 255], duration: 150 },
          ]
        },
        // Pastel rainbow cycle — peach→sky→lilac→mint. Idol-show sweeping grace.
        {
          colors: [
            { rgbw: [255, 180, 150], duration: 400 },
            { rgbw: [150, 220, 255], duration: 400 },
            { rgbw: [220, 160, 255], duration: 400 },
            { rgbw: [150, 255, 200], duration: 400 },
          ]
        },
      ],
      head: [
        {
          // Left-center (160°) ↔ right-center (350°), tilt 65→80. Perky two-point bounce, chirpy idol-show snap.
          moves: [
            { axis: [160, 65], duration: 500, easing: easeInExpo },
            { axis: [350, 80], duration: 500, easing: easeInExpo },
          ],
          colors: [96, 64], ledRing: [202, 208], gobo: 80,
        },
        {
          // Left (105°) → right (380°) → center (235°), tilt 62→80→98. Playful three-step sweep, tilt climbs with each stop — ascending energy.
          moves: [
            { axis: [105, 62], duration: 450, easing: easeInOutSine },
            { axis: [380, 80], duration: 450, easing: easeInOutSine },
            { axis: [235, 98], duration: 450, easing: easeInOutSine },
          ],
          colors: [64, 96], ledRing: [226, 232], gobo: 64,
        },
        {
          // Far-left (85°) → far-right (425°) → center (245°), tilt 58→72→90. Hard snap across stage, tilt climbs on each step, peaks high-center.
          moves: [
            { axis: [85, 58], duration: 400, easing: easeInExpo },
            { axis: [425, 72], duration: 400, easing: easeInExpo },
            { axis: [245, 90], duration: 400, easing: easeInExpo },
          ],
          colors: [48, 96], ledRing: [184, 196], gobo: 160,
        },
        {
          // Left (140°) → right (330°) → center (220°), tilt 76→62→98. Sine-eased graceful arc, dips right then peaks high-center — sweeping stage bow.
          moves: [
            { axis: [140, 76], duration: 600, easing: easeInOutSine },
            { axis: [330, 62], duration: 600, easing: easeInOutSine },
            { axis: [220, 98], duration: 600, easing: easeInOutSine },
          ],
          colors: [96, 48], ledRing: [178, 202], gobo: 96,
        },
      ],
      mini: [
        {
          ledRing: [190, 210], gobo: true, beam: 200, laser: 60, starfield: true,
        },
        {
          ledRing: [220, 230], gobo: true, beam: 210, laser: 70, starfield: true,
        },
        {
          ledRing: [40, 50], gobo: true, beam: 185, laser: 55, starfield: true,
        },
        {
          ledRing: [200, 210], gobo: false, beam: 170, laser: 65, starfield: true,
        },
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
          // Far-left (100°) → far-right (420°) → center (255°), tilt 62→84→110. Full stage sweep, climbs to ceiling-high center.
          moves: [
            { axis: [100, 62], duration: 1600, easing: easeInOutSine },
            { axis: [420, 84], duration: 1600, easing: easeInOutSine },
            { axis: [255, 110], duration: 1600, easing: easeInOutSine },
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
        {
          ledRing: [210, 200], gobo: true, beam: 150, laser: 80,
        },
        {
          ledRing: [40, 50], gobo: true, beam: 170, laser: 80,
        },
        {
          ledRing: [220, 230], gobo: false, beam: 160, laser: 80,
        },
      ],
    },
  },

  idle: {
    luminous: {
      head: 20,
      mini: 20,
      par: 20
    },
    strobing: { threshold: 0.99 },
    variants: {
      head: [
        {
          colors: [112],
          gobo: 0,
          ledRing: [70],
          moves: []
        }
      ],
      mini: [
        {
          beam: 255,
          laser: 0,
          ledRing: [40]
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