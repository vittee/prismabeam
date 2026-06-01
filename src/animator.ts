import { clamp, random, sample, shuffle, toLower } from "lodash";
import { ActivationTag } from "./analysis/analysis-manager";
import { Animation } from "./fixtures/animation";
import { Fixture } from "./fixtures/fixture";
import { easeInExpo, easeInOutSine } from "./utils/easing";
import { ProfileConfigs } from "./profiles/configs";
import { Profile } from "./profiles/types";
import { GroupTagToProfileMap, TagsToProfileMap } from "./profiles/mapping";

export type AnimatorOptions = {
  movingHead: {
    main: Fixture;
    mini: Fixture
  };

  parLight: Fixture;
}

export class Animator {
  #movingHead: AnimatorOptions['movingHead'];
  #parLight: Fixture;

  #bpm = 60;
  #energy = 0.5;
  #dance = 0.5;

  #strobing = false;
  #strobingWeight = 0;

  #profileName = '';
  #profile = ProfileConfigs['idle'];
  #variants: Profile['variants'] = {
    par: [],
    head: [],
    mini: []
  }

  #lumiousAnim: Record<'main' | 'mini', Animation>;
  #flashAnim: Record<'main' | 'mini' | 'par', Animation>;
  #strobeAnim: Record<'main' | 'mini' | 'par', Animation>;

  #parColorAnim: Animation;
  #headMoveAnim: Record<'main' | 'mini', Animation>;

  constructor(opts: AnimatorOptions) {
    this.#movingHead = opts.movingHead;
    this.#parLight = opts.parLight;

    this.#lumiousAnim = {
      main: new Animation(this.#movingHead.main),
      mini: new Animation(this.#movingHead.mini)
    }

    this.#setupLuminousAnim();

    this.#flashAnim = {
      main: new Animation(this.#movingHead.main),
      mini: new Animation(this.#movingHead.mini),
      par: new Animation(this.#parLight)
    }

    this.#updateFlashAnims();

    this.#strobeAnim = {
      main: new Animation(this.#movingHead.main),
      mini: new Animation(this.#movingHead.mini),
      par: new Animation(this.#parLight)
    }

    this.#updateStrobeAnim();

    this.#parColorAnim = new Animation(this.#parLight);

    this.#headMoveAnim = {
      main: new Animation(this.#movingHead.main),
      mini: new Animation(this.#movingHead.mini)
    }

    this.bpm = 120;
    this.#applyProfile(ProfileConfigs['idle']);

    // start beating
    this.#heartbeat();
  }

  #setupLuminousAnim() {
    this.#lumiousAnim.main
      .add({
        to: [
          ['luminous', () => this.#profile.luminous.head * (1 + 0.5 * this.#energy)]
        ],
        duration: 200,
        easing: easeInOutSine
      })
      .delay(500)
      .start({ loop: true })

    this.#lumiousAnim.mini
      .add({
        to: [
          ['luminous', () => this.#profile.luminous.mini * (1 + 0.5 * this.#energy)]
        ],
        duration: 200,
        easing: easeInOutSine
      })
      .delay(500)
      .start({ loop: true })
  }

  #updateStrobeAnim() {
    const stepDuration = 25;
    const duration = this.#quantizeDuration(this.#beatInterval, 4 * this.#dance / 0.25);

    const noEase = () => 1;

    this.#strobeAnim.main.clear()
      .add({
        to: [
          ['strobe', () => this.#strobing ? 255 : 0],
        ],
        duration: stepDuration,
        easing: noEase
      })
      .delay(duration)
      .start({ loop: true })

    this.#strobeAnim.mini.clear()
      .add({ push: ['laser'] })
      .add({
        to: [
          ['strobe', () => this.#strobing && chance(1.5) ? 255 : 0],
          ['laser', () => this.#strobing && chance(1.8) ? 80 : 0]
        ],
        duration: stepDuration,
        easing: noEase
      })
      .delay(duration)
      .add({
        to: [
          ['laser', (v, anim) => anim.pop('laser') ?? v],
        ],
        duration: stepDuration,
        easing: noEase
      })
      .start({ loop: true })

    this.#strobeAnim.par
      .clear()
      .add({
        to: [
          ['speed', this.#strobing && chance(2) ? 255 : 0],
        ],
        duration: stepDuration,
        easing: noEase
      })
      .delay(duration)
      .start({ loop: true })
  }

  #makeFlashAnim(anim: Animation, channelId: string, factor: number) {
    const duration = clamp(this.#beatInterval / 2, 100, 200);

    anim.clear()
      .add({ push: [channelId] })
      .add({ to: [[channelId, (v) => v * factor * (1 + this.#dance)]], duration })
      .add({ to: [[channelId, (v, anim) => anim.pop(channelId) ?? v]], duration })
  }

  #updateParVariant() {
    const variant = this.#variants.par.shift();

    if (!variant) {
      return;
    }

    this.#variants.par.push(variant);

    const since = Date.now();

    // Trigger next move
    const nextMove = () => {
      const bars = this.#dance >= 0.75 ? 1
        : this.#dance >= 0.5 ? 2
          : 4

      const duration = bars * this.#barInterval;

      if (Date.now() >= (since + duration)) {
        setTimeout(() => this.#updateParVariant());
        return;
      }

      setTimeout(move);
    }

    const move = () => {
      this.#parColorAnim.clear()
        .off('end', nextMove)

      for (const { rgbw, duration } of variant.colors) {
        const [r, g, b, w = 0] = rgbw;

        this.#parColorAnim.add(({
          to: [
            ['red', r], ['green', g], ['blue', b],
            ['white', () => w * (0.6 + this.#energy) * (0.4 + this.#dance)]
          ],
          duration: this.#quantizeDuration(duration),
          easing: easeInOutSine
        }));
      }

      this.#parColorAnim
        .start()
        .once('end', nextMove)
    }

    move();
  }

  #updateHeadVariant() {
    const variant = this.#variants.head.shift();

    if (!variant) {
      return;
    }

    this.#variants.head.push(variant);

    const miniVariant = this.#variants.mini.shift();

    if (miniVariant) {
      this.#variants.mini.push(miniVariant);
    }

    const moves = shuffle(variant.moves);

    const since = Date.now();

    // Trigger next move
    const nextMove = () => {
      const bars = this.#dance >= 0.75 ? 1
        : this.#dance >= 0.5 ? 2
          : 4;

      const duration = bars * this.#barInterval;

      if (Date.now() >= (since + duration)) {
        setTimeout(() => this.#updateHeadVariant());
        return;
      }

      setTimeout(move);
    }

    // Move head into position
    const move = () => {
      this.#movingHead.main
        .set('gobo', variant.gobo)
        .set('color', sample(variant.colors) ?? random(128, 255))
        .set('led-ring', sample(variant.ledRing) ?? random(70, 255))

      if (miniVariant) {
        this.#movingHead.mini
          .set('beam', miniVariant.beam)
          .set('gobo', miniVariant.gobo ? miniVariant.beam * 0.3 : 0)
          // .set('laser', miniVariant.starfield ? miniVariant.laser : 0)
          .set('led-ring', sample(miniVariant.ledRing) ?? random(10, 230))
      }

      this.#headMoveAnim.main.clear();
      this.#headMoveAnim.mini.clear();

      for (const { axis, duration, easing } of moves) {
        // factors
        const [pan, tilt] = [[axis[0], 540], [axis[1], 180]].map(([deg, max]) => deg / max);

        const stepDuration = this.#quantizeDuration(duration * (1 - this.#pace) * (1 - this.#energy));
        const easingFn = this.#moveEasing(easing);

        this.#headMoveAnim.main.add({
          to: [
            ['pan', pan * 255],
            ['tilt', tilt * 255]
          ],
          duration: stepDuration,
          easing: easingFn
        });

        // Mirror the main head
        this.#headMoveAnim.mini.add({
          to: [
            ['pan', 255 - pan * 255],
            ['tilt', 255 - tilt * 255]
          ],
          duration: stepDuration * 2,
          easing: easeInOutSine
        });
      }

      this.#headMoveAnim.main
        .start()
        .once('end', nextMove);

      this.#headMoveAnim.mini
        .start()

    }

    move();
  }

  #updateVariants() {
    this.#updateParVariant();
    this.#updateHeadVariant();
  }

  #updateFlashAnims() {
    this.#makeFlashAnim(this.#flashAnim.par, 'master', 1.5);
    this.#makeFlashAnim(this.#flashAnim.main, 'luminous', 1.5);
    this.#makeFlashAnim(this.#flashAnim.mini, 'luminous', 1.5);
  }

  #speedChanged() {
    const speed = this.#speed;

    this.#movingHead.main
      .set('prism', 190 + 40 * speed)
      .set('led-speed', 180 + 50 * speed)

    this.#movingHead.mini
      .set('gobo-rotation', 15 * speed)
      .set('led-speed', 70 * speed)

    this.#updateStrobeAnim();
  }

  #quantizeDuration(duration: number, beat?: number) {
    const gridDuration = (beat || this.#beats) * this.#beatInterval;
    const grids = Math.round(duration / gridDuration);
    return Math.max(gridDuration, duration * grids);
  }

  #moveEasing(fallback?: (v: number) => number): (v: number) => number {
    if (this.#dance >= 0.75) return easeInExpo;
    if (this.#dance <= 0.3) return easeInOutSine;
    return fallback ?? easeInOutSine;
  }

  /**
   * How fast should we run? compared to 120 BPM
   *
   * pace 1 => Exactly at 120 BPM
   * pace < 1 => Slower
   * pace > 1 => Faster
   */
  get #pace() {
    return this.#bpm / 120;
  }

  get #speed() {
    return this.#pace * (1 + this.#dance);
  }

  /**
   * Interval between a beat
   */
  get #beatInterval() {
    return 60000 / this.#bpm;
  }

  get #barInterval() {
    return this.#beatInterval * 4;
  }

  /**
   * Rhythmic beats
   */
  get #beats() {
    const dance = this.#dance;
    return dance >= 0.75 ? 1
      : dance >= 0.5 ? 2
        : dance >= 0.3 ? 4
          : 8
  }

  get bpm() {
    return this.#bpm;
  }

  set bpm(value) {
    value = Math.trunc(0.7 * this.#bpm + 0.3 * value);
    if (value === this.bpm) {
      return;
    }

    this.#bpm = value;

    this.#speedChanged();

    this.#updateFlashAnims();

    this.#detectStrobing();
  }

  get energy() {
    return this.#energy;
  }

  set energy(value: number) {
    if (this.#energy === value) {
      return;
    }

    this.#energy = value;

    this.#detectStrobing();
  }

  get dancability() {
    return this.#dance;
  }

  set dancability(value: number) {
    if (this.#dance === value) {
      return;
    }

    this.#dance = value;
    this.#speedChanged();

    this.#detectStrobing();
  }

  #detectStrobing() {
    const pace = Math.min(this.#pace, 2) / 2; // normalize: 120bpm=0.5, 240bpm=1.0
    const weight = pace * this.#dance * this.#energy;

    // Fast attack, slow decay — decay scaled by pace so 120 BPM ≈ 4-beat tail
    const decayAlpha = 0.03 * this.#pace;
    const alpha = weight > this.#strobingWeight ? 0.8 : decayAlpha;
    this.#strobingWeight = alpha * weight + (1 - alpha) * this.#strobingWeight;

    this.#setStrobing(this.#strobingWeight >= 0.3);
  }

  #setStrobing(v: boolean) {
    if (this.#strobing === v) {
      return;
    }

    this.#strobing = v;
  }

  #heartbeat() {
    try {
      this.#doHeartbeatTasks();
    }
    finally {
      setTimeout(() => this.#heartbeat(), 1000 / 120); // 120 Hz
    }
  }

  #doHeartbeatTasks() {

  }

  kick() {
    for (const anim of Object.values(this.#flashAnim)) {
      anim.start({ preFinalize: true });
    }
  }

  updateTag(tag: ActivationTag) {
    const [groupName, subGroupName] = [tag.parentGenre, tag.name].map(toLower);
    const group = TagsToProfileMap[groupName] as Record<string, string>;
    const profileName = group?.[subGroupName] ?? GroupTagToProfileMap[groupName] ?? groupName;

    if (profileName === this.#profileName) {
      return;
    }

    console.log('Update Tag', profileName);
    this.#profileName = profileName;

    const profile = ProfileConfigs[profileName] ?? ProfileConfigs['default'];
    if (profile && profile !== this.#profile) {
      this.#applyProfile(profile);
    }
  }

  #applyProfile(profile: Profile) {
    console.log('Apply profile');
    this.#profile = profile;

    this.#variants = {
      par: shuffle(profile.variants.par),
      head: shuffle(profile.variants.head),
      mini: shuffle(profile.variants.mini)
    }

    const { luminous } = profile;

    this.#parLight.set('master', luminous.par);

    this.#updateVariants();
    this.#updateFlashAnims();
  }
}

function chance(n: number) {
  return Math.random() < 1/n
}