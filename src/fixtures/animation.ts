import { TypedEmitter } from 'tiny-typed-emitter';
import type { Fixture } from './fixture';

type ValueOrFn = number | ((value: number, animation: Animation) => number);

export type AnimationValue = [channelId: string, value: ValueOrFn];

type OriginalValue = [channelId: string, value: number];

type AnimationTo = {
  to: Array<AnimationValue>;
  duration: number;
  easing?: (v: number) => number;
}

type AnimationPush = {
  push: string[];
}

type AnimationAction = {
  action: (animation: Animation) => any;
}

type AnimationStep = AnimationTo | AnimationPush | AnimationAction;

type AnimationDetailMapping = {
  channelId: string;
  value: ValueOrFn;
  targetValue?: number;
}

type AnimationDetail = Omit<AnimationTo, 'to'> & {
  mappings: Array<AnimationDetailMapping>;
  from?: Array<OriginalValue>;
}

type WithStart<T> = T & { start: number };

type AnimationInternalStep = WithStart<AnimationDetail | AnimationPush | AnimationAction>;

type AnimationEvents = {
  end: (anim: Animation) => void;
}

type AnimationOptions = {
  loop?: number | boolean;
  preFinalize?: boolean;
}

const isDetail = (step: AnimationInternalStep): step is WithStart<AnimationDetail> => 'mappings' in step;

const isPush = (step: AnimationStep | AnimationDetail): step is AnimationPush => 'push' in step;

const isAction = (step: AnimationStep | AnimationDetail): step is AnimationAction => 'action' in step;

export class Animation extends TypedEmitter<AnimationEvents> {
  #options?: AnimationOptions;
  #steps: Array<AnimationInternalStep> = [];
  #startTime = 0;
  #currentStepIndex = 0;

  #totalDuration = 0;

  #running = false;
  #runCount = 0;

  #valueStacks = new Map<string, number[]>();

  constructor(private readonly fixture: Fixture) {
    super();
  }

  reset(startTime?: number) {
    this.#currentStepIndex = 0;
    this.#startTime = startTime ?? Date.now();
    this.#valueStacks.clear();

    for (const step of this.#steps) {
      if (isDetail(step)) {
        step.from = undefined;
        for (const mapping of step.mappings) {
          mapping.targetValue = undefined;
        }
      }
    }
  }

  #getChannelStack(channelId: string) {
    if (!this.#valueStacks.has(channelId)) {
      this.#valueStacks.set(channelId, []);
    }

    return this.#valueStacks.get(channelId)!;
  }

  push(channelId: string) {
    const value = this.fixture.get(channelId);

    if (value !== undefined) {
      this.#getChannelStack(channelId).push(value);
    }
  }

  pop(channelId: string) {
    return this.#getChannelStack(channelId).pop();
  }

  add(step: AnimationStep) {
    if (isPush(step) || isAction(step)) {
      this.#steps.push({
        ...step,
        start: this.#totalDuration
      });

      return this;
    }

    this.#steps.push({
      ...step,
      mappings: step.to.map<AnimationDetailMapping>(([channelId, value]) => ({
        channelId,
        value,
        targetValue: undefined
      })),
      start: this.#totalDuration
    });

    this.#totalDuration += step.duration;

    return this;
  }

  delay(duration: number) {
    this.add({
      to: [],
      duration
    });

    return this;
  }

  clear(finalize: boolean = true) {
    this.stop(finalize);
    this.#steps = [];
    this.#totalDuration = 0;
    this.reset();
    return this;
  }

  start(options?: AnimationOptions) {
    if (options?.preFinalize) {
      this.#finalize();
    }

    this.#options = options;
    this.reset();
    this.#runCount = 0;
    this.#running = true;
    this.#animate();
    return this;
  }

  stop(finalize: boolean = true) {
    if (!this.#running) {
      return;
    }

    if (finalize) {
      this.#finalize();
    }

    this.#running = false;
  }

  get running() {
    return this.#running;
  }

  #finalize(fromIndex: number = 0, toIndex: number = this.#steps.length - 1) {
    const finalValues = new Map<string, number>();

    for (let i = fromIndex; i <= toIndex; i++) {
      const step = this.#steps[i];

      if (!isDetail(step)) {
        continue;
      }

      for (const mapping of step.mappings) {
        if (mapping.targetValue === undefined) {
          mapping.targetValue = this.#resolve(mapping.channelId, mapping.value) ?? 0;
        }

        if (mapping.targetValue) {
          finalValues.set(mapping.channelId, mapping.targetValue);
        }

        mapping.targetValue = undefined;
      }
    }

    for (const final of finalValues) {
      this.fixture.set(...final);
    }
  }

  #resolve(channelId: string, v: ValueOrFn) {
    if (typeof v === 'number') {
      return v;
    }

    return v(this.fixture.get(channelId) ?? 0, this);
  }

  async #animate() {
    if (!this.#running) {
      return;
    }

    const now = Date.now();
    const elapsed = now - this.#startTime;

    const nextStepIndex = (() => {
      let result = this.#currentStepIndex;

      while (result < this.#steps.length) {
        const step = this.#steps[result];

        if (isPush(step)) {
          for (const pushId of step.push) {
            this.push(pushId);
          }

          result++;
          continue;
        }

        if (isAction(step)) {
          step.action(this);
          result++;
          continue;
        }

        if (elapsed < (step.start + step.duration)) {
          break;
        }

        result++;
      }

      return result;
    })();

    if (nextStepIndex > this.#currentStepIndex) {
      this.#finalize(this.#currentStepIndex, nextStepIndex - 1);
      this.#currentStepIndex = nextStepIndex;
    }

    for (let i = this.#currentStepIndex; i < this.#steps.length && i <= nextStepIndex; i++) {
      const step = this.#steps[i];

      if (step && isDetail(step)) {
        if (step.from === undefined) {
          step.from = step.mappings.map(({ channelId }) => [channelId, this.fixture.get(channelId) ?? 0])
        }

        const stepTime = elapsed - step.start;

        for (const [index, mapping] of step.mappings.entries()) {
          const [, fromValue] = step.from[index];

          if (mapping.targetValue === undefined) {
            mapping.targetValue = this.#resolve(mapping.channelId, mapping.value) ?? 0;
          }

          const progress = step.duration > 0 ? stepTime / step.duration : 1;
          const eased = step.easing ? step.easing(progress) : progress;

          const value = Math.round(fromValue + eased * (mapping.targetValue - fromValue));

          this.fixture.set(mapping.channelId, value);
        }
      }
    }

    if (elapsed > this.#totalDuration) {
      this.emit('end', this);

      const shouldLoop = (this.#options?.loop === true)
        ? true
        : (typeof this.#options?.loop === 'number')
          ? (++this.#runCount < this.#options.loop)
          : false;

      if (shouldLoop) {
        this.reset(this.#startTime + this.#totalDuration);
        setTimeout(() => this.#animate());
      }

      return;
    }

    setTimeout(() => this.#animate(), 1000 / 200);
  }
}