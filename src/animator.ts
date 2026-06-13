import { clamp, random, sample, shuffle, toLower } from "lodash";
import { ActivationTag } from "./analysis/analysis-client";
import { Animation } from "./fixtures/animation";
import { Fixture } from "./fixtures/fixture";
import { easeInExpo, easeInOutSine } from "./utils/easing";
import { ProfileConfigs } from "./profiles/configs";
import { MiniVariant, Profile } from "./profiles/types";
import { GenreTagToProfileMap, ProfileMoodOverrideMap, MOOD_OVERRIDE_THRESHOLD, MOOD_WILDCARD_THRESHOLD } from "./profiles/mapping";
import { ParamStore } from "./params";

export type AnimatorOptions = {
  movingHead: {
    main: Fixture;
    mini: Fixture
  };

  parLight: Fixture;
  params: ParamStore;
}

export class Animator {
  #movingHead: AnimatorOptions['movingHead'];
  #parLight: Fixture;
  #params: ParamStore;

  #bpm = 60;
  #energy = 0.5;
  #dance = 0.5;

  #strobing = false;
  #strobingWeight = 0;
  #strobingMoodBoost = 1.0;
  #lastStrobingCheck = 0;

  #profileName = '';
  #profile = ProfileConfigs['idle'];

  #currentGenre = '';
  #currentMood = '';
  #currentMoodScore = 0;
  #variants: Profile['variants'] = {
    par: [],
    head: [],
    mini: []
  }

  #lumiousAnim: Record<'main' | 'mini' | 'par', Animation>;
  #flashAnim: Record<'main' | 'mini' | 'par', Animation>;
  #strobeAnim: Record<'main' | 'mini' | 'par', Animation>;

  #parColorAnim: Animation;
  #headMoveAnim: Record<'main' | 'mini', Animation>;

  #miniVariant?: MiniVariant;

  constructor(opts: AnimatorOptions) {
    this.#movingHead = opts.movingHead;
    this.#parLight = opts.parLight;
    this.#params = opts.params;

    this.#lumiousAnim = {
      main: new Animation(this.#movingHead.main),
      mini: new Animation(this.#movingHead.mini),
      par: new Animation(this.#parLight)
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
          ['luminous', () => this.#profile.luminous.head * (this.#params.luminosity('head') ** 2) * (1 + 0.5 * this.#energy)]
        ],
        duration: 200,
        easing: easeInOutSine
      })
      .delay(500)
      .start({ loop: true })

    this.#lumiousAnim.mini
      .add({
        to: [
          ['luminous', () => this.#profile.luminous.mini * (this.#params.luminosity('mini') ** 2) * (1 + 0.5 * this.#energy)]
        ],
        duration: 200,
        easing: easeInOutSine
      })
      .delay(500)
      .start({ loop: true })

    this.#lumiousAnim.par
      .add({
        to: [
          ['master', () => this.#profile.luminous.par * (this.#params.luminosity('par') ** 2)]
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
          ['strobe', () => this.#strobing && chance(1.5) ? 240 + (15 * this.#pace) : 0],
          ['laser',
            () => (
              (this.#miniVariant?.starfield ?? false) ||
              (this.#strobing && (this.#energy >= 0.7 || chance(1.8)))
                ? this.#miniVariant?.laser ?? 80
                : 0
            )
          ]
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
      .add({ to: [[channelId, (v) => v * factor * (0.6 + this.#dance)]], duration })
      .add({ to: [[channelId, (v, anim) => anim.pop(channelId) ?? v]], duration })
  }

  #updateParVariant() {
    const variant = this.#variants.par.shift();

    if (!variant) {
      return;
    }

    this.#variants.par.push(variant);

    this.#parColorAnim.removeAllListeners();

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
      this.#parColorAnim.clear(false)
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

    this.#headMoveAnim.main.removeAllListeners();

    const miniVariant = this.#variants.mini.shift();

    this.#miniVariant = miniVariant;

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
          .set('laser', miniVariant?.starfield ? miniVariant.laser : 0)
          .set('led-ring', sample(miniVariant.ledRing) ?? random(10, 230))
      }

      this.#headMoveAnim.main
        .clear()
        .off('end', nextMove)

      this.#headMoveAnim.mini.clear();

      const tiltOffset = { main: this.#params.tiltOffset('head') * 127, mini: this.#params.tiltOffset('mini') * 127 };

      for (const { axis, duration, easing } of moves) {
        const [pan, tilt] = [[axis[0], 540], [axis[1], 180]].map(([deg, max]) => deg / max);
        const stepDuration = this.#quantizeDuration(duration * (1 - this.#pace) * (1 - this.#energy));
        const easingFn = this.#moveEasing(easing);

        this.#headMoveAnim.main.add({
          to: [
            ['pan', pan * 255],
            ['tilt', clamp(tilt * 255 + tiltOffset.main, 0, 255)]
          ],
          duration: stepDuration,
          easing: easingFn
        });
      }

      if (miniVariant) {
        for (const { axis, duration, easing } of miniVariant.moves) {
          const [pan, tilt] = [[axis[0], 540], [axis[1], 180]].map(([deg, max]) => deg / max);
          const stepDuration = this.#quantizeDuration(duration * (1 - this.#pace) * (1 - this.#energy));
          const easingFn = this.#moveEasing(easing);

          this.#headMoveAnim.mini.add({
            to: [
              ['pan', pan * 255],
              ['tilt', clamp(tilt * 255 + tiltOffset.mini, 0, 255)]
            ],
            duration: stepDuration,
            easing: easingFn
          });
        }
      }

      this.#headMoveAnim.main
        .start()
        .once('end', nextMove);

      this.#headMoveAnim.mini
        .start({ loop: true })

    }

    move();
  }

  #updateVariants() {
    this.#updateParVariant();
    this.#updateHeadVariant();
  }

  #updateFlashAnims() {
    this.#makeFlashAnim(this.#flashAnim.par, 'master', 1.3);
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
  }

  get energy() {
    return this.#energy;
  }

  set energy(value: number) {
    if (this.#energy === value) {
      return;
    }

    this.#energy = value;
  }

  get danceability() {
    return this.#dance;
  }

  set danceability(value: number) {
    if (this.#dance === value) {
      return;
    }

    this.#dance = value;
    this.#speedChanged();
  }

  #detectStrobing() {
    const { paceWeight = 0.3, energyWeight = 0.7, danceExp = 1.0, threshold = 0.2 } = this.#profile.strobing ?? {};

    const pace = clamp((this.#bpm - 95) / (150 - 95), 0, 1) * 0.5 + 0.5; // 95bpm=0.5, 150bpm=1.0
    const energy2 = this.#bpm >= 105 ? this.#energy ** 3 : this.#energy * pace;
    const weight = (paceWeight * pace + energyWeight * energy2) * this.#dance ** danceExp * this.#strobingMoodBoost;

    // Fast attack on spikes, ~1-bar (4-beat) decay
    const alpha = weight > this.#strobingWeight ? Math.min(1, weight * 2) : 0.75;
    this.#strobingWeight = alpha * weight + (1 - alpha) * this.#strobingWeight;

    this.#strobing = this.#strobingWeight >= threshold;
  }

  #updateStrobingMoodBoost(mood: string, score: number) {
    const target = ({
      energetic: 1.5, action: 1.5, fast: 1.5, sport: 1.5,
      powerful: 1.3, epic: 1.3,
      dramatic: 1.2, heavy: 1.2,
      upbeat: 1.1, uplifting: 1.1,
      sad: 0.7, melancholic: 0.7, emotional: 0.7,
      calm: 0.5, relaxing: 0.5, soft: 0.5, slow: 0.5,
      meditative: 0.4, dream: 0.4, deep: 0.4, space: 0.4,
    } as Record<string, number>)[mood] ?? 1.0;

    // blend toward target weighted by mood score, slow EMA (~8s decay)
    const alpha = 0.05 * score;
    this.#strobingMoodBoost = alpha * target + (1 - alpha) * this.#strobingMoodBoost;
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
    const now = Date.now();
    if (now - this.#lastStrobingCheck >= this.#beatInterval) {
      this.#lastStrobingCheck = now;
      this.#detectStrobing();
    }
  }

  kick() {
    for (const anim of Object.values(this.#flashAnim)) {
      anim.start({ preFinalize: true });
    }
  }

  updateGenre(tags: ActivationTag[]) {
    // weighted vote: each tag votes for its mapped profile weighted by score
    const votes = new Map<string, number>();
    for (const tag of tags) {
      const profile = GenreTagToProfileMap[toLower(tag.name)];
      if (profile) votes.set(profile, (votes.get(profile) ?? 0) + tag.score);
    }
    if (!votes.size) return;
    const best = [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
    console.log('[genre]', [...votes.entries()].map(([p, s]) => `${p}:${s.toFixed(2)}`).join(' '));
    this.#currentGenre = best;
    this.#resolveProfile();
  }

  updateMood(tags: ActivationTag[]) {
    const votes = new Map<string, number>();
    for (const tag of tags) {
      const name = toLower(tag.name);
      votes.set(name, (votes.get(name) ?? 0) + tag.score);
    }
    if (!votes.size) return;
    const sorted = [...votes.entries()].sort((a, b) => b[1] - a[1]);
    const [bestMood, bestScore] = sorted[0];
    console.log('[mood]', sorted.map(([m, s]) => `${m}:${s.toFixed(2)}`).join(' '));
    this.#currentMood = bestMood;
    this.#currentMoodScore = bestScore;
    // modulate strobing for all top moods, weighted by score
    for (const [mood, score] of sorted) {
      this.#updateStrobingMoodBoost(mood, score);
    }
    this.#resolveProfile();
  }

  #resolveProfile() {
    const base = this.#currentGenre;
    const mood = this.#currentMood;
    const score = this.#currentMoodScore;

    let resolved = base || 'default';

    if (mood && score >= MOOD_OVERRIDE_THRESHOLD) {
      const specific = ProfileMoodOverrideMap[`${resolved}+${mood}`];
      if (specific) {
        resolved = specific;
      } else if (score >= MOOD_WILDCARD_THRESHOLD) {
        const wildcard = ProfileMoodOverrideMap[`*+${mood}`];
        if (wildcard) resolved = wildcard;
      }
    }

    this.#setProfile(resolved);
  }

  #setProfile(profileName: string) {
    if (profileName === this.#profileName) return;

    const profile = ProfileConfigs[profileName] ?? ProfileConfigs['default'];
    if (!profile || profile === this.#profile) return;

    console.log('[profile]', profileName);
    this.#profileName = profileName;
    this.#applyProfile(profile);
  }

  #applyProfile(profile: Profile) {
    this.#profile = profile;

    this.#variants = {
      par: shuffle(profile.variants.par),
      head: shuffle(profile.variants.head),
      mini: shuffle(profile.variants.mini)
    }

    this.#updateVariants();
    this.#updateFlashAnims();
  }
}

function chance(n: number) {
  return Math.random() < 1/n
}