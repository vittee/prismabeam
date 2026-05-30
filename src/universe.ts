import { Fixture, FixturePrivate } from './fixtures/fixture';
import { DMXTransport } from './transport/types';

export class Universe {
  readonly #transport: DMXTransport;
  #nextAddress = 1;

  constructor(transport: DMXTransport) {
    this.#transport = transport;
  }

  /**
   * Add a fixture to this universe.
   * address priority: explicit arg > fixture.address > auto-assign after previous fixture
   */
  add(fixture: Fixture): this {
    const addr = fixture.address ?? this.#nextAddress;
    this.#nextAddress = addr + fixture.channelCount;

    fixture.address = addr;

    (fixture as unknown as FixturePrivate).bind((channelIndex, value) => {
      this.#transport.set(addr + channelIndex, value);
    });

    return this;
  }
}
