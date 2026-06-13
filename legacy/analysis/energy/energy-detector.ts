import { Worker } from 'worker_threads';
import path from 'path';
import { TypedEmitter } from 'tiny-typed-emitter';

type EnergyDetectorEvents = {
  energy: (level: number) => any;
  kick: () => any;
};

type WorkerMsg =
  | { type: 'ready' }
  | { type: 'energy'; level: number }
  | { type: 'kick' };

export class EnergyDetector extends TypedEmitter<EnergyDetectorEvents> {
  #worker: Worker | null = null;
  #ready = false;
  #destroyed = false;
  #restartTimer: ReturnType<typeof setTimeout> | null = null;
  readonly #sampleRate: number;

  constructor(sampleRate = 44100) {
    super();
    this.#sampleRate = sampleRate;
    this.#spawn();
  }

  process(buffer: Buffer): void {
    if (!this.#ready || !this.#worker) return;
    const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    this.#worker.postMessage({ type: 'audio', buffer: ab }, [ab as ArrayBuffer]);
  }

  destroy(): void {
    this.#destroyed = true;
    if (this.#restartTimer) clearTimeout(this.#restartTimer);
    this.#ready = false;
    this.#worker?.terminate();
    this.#worker = null;
  }

  #spawn(): void {
    const workerFile = path.join(__dirname, 'energy-worker.js');
    this.#worker = new Worker(workerFile, {
      workerData: { sampleRate: this.#sampleRate },
    });

    this.#worker.on('message', (msg: WorkerMsg) => {
      switch (msg.type) {
        case 'ready':
          this.#ready = true;
          console.log('[EnergyDetector] worker ready');
          break;
        case 'energy':
          this.emit('energy', msg.level);
          break;
        case 'kick':
          this.emit('kick');
          break;
      }
    });

    this.#worker.on('error', err => console.error('[EnergyDetector] worker error:', err));

    this.#worker.on('exit', code => {
      if (this.#destroyed) return;
      this.#ready = false;
      this.#worker = null;
      if (this.#restartTimer) return;
      console.warn(`[EnergyDetector] worker exited (code ${code}), restarting in 1000ms`);
      this.#restartTimer = setTimeout(() => {
        this.#restartTimer = null;
        this.#spawn();
      }, 1000);
    });
  }
}
