import { clamp } from 'lodash';
import { TypedEmitter } from 'tiny-typed-emitter';

type Light = {
  luminosity: number;
  enabled: boolean;
}

type MovingHead = Light & {
  tiltOffset: number; // -1 = toward 0°, 0 = no offset, 1 = toward 180°
}

export type Params = {
  head: MovingHead;
  mini: MovingHead;
  par:  Light;
}

type ParamEvents = {
  luminosity(key: keyof Params, newValue: number): void;
  enabled(key: keyof Params, newValue: boolean): void;
  tiltOffset(key: Exclude<keyof Params, 'par'>, newValue: number): void;
};

export class ParamStore extends TypedEmitter<ParamEvents> {
  #params: Params =  {
    head: { luminosity: 1.0, enabled: true, tiltOffset: 0 },
    mini: { luminosity: 1.0, enabled: true, tiltOffset: 0 },
    par:  { luminosity: 1.0, enabled: true },
  }

  luminosity(key: keyof Params, newValue?: number) {
    const p = this.#params[key];
    if (newValue !== undefined) {
      newValue = clamp(newValue, 0, 1.5);

      if (newValue !== p.luminosity) {
        p.luminosity = newValue;
        this.emit('luminosity', key, newValue);
      }
    }

    return p.enabled ? p.luminosity : 0;
  }

  getLuminosity(key: keyof Params) {
    return this.#params[key].luminosity;
  }

  enabled(key: keyof Params, newValue?: boolean) {
    const p = this.#params[key];
    if (newValue !== undefined) {
      if (newValue !== p.enabled) {
        p.enabled = newValue;
        this.emit('enabled', key, newValue);
      }
    }

    return p.enabled;
  }

  tiltOffset(key: Exclude<keyof Params, 'par'>, newValue?: number) {
    const p = this.#params[key];
    if (newValue !== undefined) {
      if (newValue !== p.tiltOffset) {
        newValue = clamp(newValue, -1, 1);

        if (newValue !== p.tiltOffset) {
          p.tiltOffset = newValue;
          this.emit('tiltOffset', key, newValue);
        }
      }
    }

    return p.tiltOffset;
  }
}
