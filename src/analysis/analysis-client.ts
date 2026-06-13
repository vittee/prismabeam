import net from 'net';
import notepack from 'notepack.io';
import { TypedEmitter } from 'tiny-typed-emitter';

export type ActivationTag = { name: string; score: number };

type AnalysisClientEvents = {
  ready: () => any;
  bpm: (value: number) => any;
  danceability: (value: number) => any;
  energy: (level: number) => any;
  kick: () => any;
  extracted: (tags: ActivationTag[]) => any;
  mood: (tags: ActivationTag[]) => any;
};

type AnalysisMsg =
  | { type: 'bpm'; value: number }
  | { type: 'danceability'; value: number }
  | { type: 'energy'; level: number }
  | { type: 'kick' }
  | { type: 'extracted'; tags: ActivationTag[] }
  | { type: 'mood'; tags: ActivationTag[] };

export class AnalysisClient extends TypedEmitter<AnalysisClientEvents> {
  #host: string;
  #port: number;
  #socket: net.Socket | null = null;
  #destroyed = false;
  #reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  readonly #reconnectDelayMs = 2000;
  #buf = Buffer.alloc(0);

  constructor(host = '127.0.0.1', port = 7442) {
    super();
    this.#host = host;
    this.#port = port;
    this.#connect();
  }

  destroy(): void {
    this.#destroyed = true;
    if (this.#reconnectTimer) {
      clearTimeout(this.#reconnectTimer);
      this.#reconnectTimer = null;
    }
    this.#socket?.destroy();
    this.#socket = null;
  }

  #connect(): void {
    const sock = new net.Socket();
    this.#socket = sock;

    sock.on('connect', () => {
      sock.setNoDelay(true);
      console.log(`[analysis] connected to analysis service ${this.#host}:${this.#port}`);
      this.#buf = Buffer.alloc(0);
      this.emit('ready');
    });

    sock.on('data', (chunk: Buffer) => {
      this.#buf = Buffer.concat([this.#buf, chunk]);
      this.#drain();
    });

    sock.on('error', (err) => {
      console.error('[analysis] socket error:', err.message);
    });

    sock.on('close', () => {
      if (this.#destroyed) return;
      this.#socket = null;
      if (this.#reconnectTimer) return;
      console.warn(`[analysis] disconnected, reconnecting in ${this.#reconnectDelayMs}ms`);
      this.#reconnectTimer = setTimeout(() => {
        this.#reconnectTimer = null;
        this.#connect();
      }, this.#reconnectDelayMs);
    });

    sock.connect(this.#port, this.#host);
  }

  #drain(): void {
    while (this.#buf.length >= 4) {
      const msgLen = this.#buf.readUInt32BE(0);
      if (this.#buf.length < 4 + msgLen) break;
      const payload = this.#buf.subarray(4, 4 + msgLen);
      this.#buf = this.#buf.subarray(4 + msgLen);
      this.#handle(payload);
    }
  }

  #handle(payload: Buffer): void {
    let msg: AnalysisMsg;
    try {
      msg = notepack.decode(payload) as AnalysisMsg;
    } catch {
      return;
    }

    switch (msg.type) {
      case 'bpm':
        this.emit('bpm', msg.value);
        break;
      case 'danceability':
        this.emit('danceability', msg.value);
        break;
      case 'energy':
        this.emit('energy', msg.level);
        break;
      case 'kick':
        this.emit('kick');
        break;
      case 'extracted':
        this.emit('extracted', msg.tags);
        break;
      case 'mood':
        this.emit('mood', msg.tags);
        break;
    }
  }
}
