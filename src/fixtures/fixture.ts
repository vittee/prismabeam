import { clamp } from 'lodash';
import type { Universe } from '../universe';
import { FixtureDefinition } from './types';


export type OnChange = (channelIndex: number, value: number) => void;

export interface FixturePrivate {
  bind(onChange: OnChange): void;
}

export class Fixture {
  readonly #channelMap = new Map<string, number>();

  readonly #values: number[];
  #onChange?: OnChange;

  constructor(private readonly definition: FixtureDefinition, public address?: number) {
    for (const [index, { id }] of definition.channels.entries()) {
      this.#channelMap.set(id, index);
    }

    this.#values = new Array(definition.channels.length).fill(0);
  }

  get channelCount(): number {
    return this.definition.channels.length;
  }

  findChannelDesc(channelId: string) {
    return this.definition.channels.find(ch => ch.id === channelId);
  }

  into(universe: Universe) {
    universe.add(this);

    if (this.#onChange) {
      for (const [idx, value] of this.#values.entries()) {
        this.#onChange(idx, value);
      }
    }

    return this;
  }

  set(channelId: string, value: number): this {
    const idx = this.#channelMap.get(channelId);

    if (idx === undefined) {
      return this;
    }

    this.#values[idx] = clamp(value ?? 0, 0, 255);
    this.#onChange?.(idx, this.#values[idx]);
    return this;
  }

  get(channelId: string): number | undefined {
    const idx = this.#channelMap.get(channelId);
    return (idx !== undefined) ? this.#values[idx] : undefined;
  }

  /** @internal called by Universe.add() */
  private bind(onChange: OnChange): void {
    this.#onChange = onChange;

    for (const [v, i] of this.#values.entries()) {
      onChange(i, v);
    }
  }
}

