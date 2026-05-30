export type ParColor = {
  rgbw: [r: number, g: number, b: number, w?: number];
  duration: number;
}

export type ParVariant = {
  colors: ParColor[];
}

export type HeadMove = {
  axis: [pan: number, tilt: number];
  duration: number;
  easing?: (v: number) => number;
};

export type HeadVariant = {
  moves: HeadMove[];
  colors: number[];      // YUER color wheel values — one picked at random each cycle
  ledRing: number[];    // YUER LED ring animated patterns (70–250 = pat1–pat31; 0 = off) — one picked at random each cycle
  gobo: number;         // 0=open, 16-112=pat1-7, 128-255=running
}

export type MiniVariant = {
  beam: number;
  gobo?: boolean;
  laser: number;
  starfield?: boolean;
  ledRing: number[];
}

export type Profile = {
  luminous: Record<'head' | 'mini' | 'par', number>;
  variants: {
    par: ParVariant[];
    head: HeadVariant[];
    mini: MiniVariant[];
  }
}