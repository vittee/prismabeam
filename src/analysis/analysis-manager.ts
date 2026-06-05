import { Worker } from 'worker_threads';
import path from 'path';
import { TypedEmitter } from 'tiny-typed-emitter';

export type ActivationTag = { parentGenre: string; name: string; score: number };
export type MoodScores = { acoustic: number; aggressive: number; happy: number; party: number; relaxed: number };

type AnalysisManagerEvents = {
  ready: () => any;
  bpm: (value: number) => any;
  danceability: (value: number) => any;
  extracted: (tags: ActivationTag[]) => any;
  mood: (scores: MoodScores) => any;
};

type WorkerMsg =
  | { type: 'ready' }
  | { type: 'bpm'; value: number }
  | { type: 'danceability'; value: number }
  | { type: 'extracted'; tags: ActivationTag[] }
  | { type: 'mood'; scores: MoodScores };

export class AnalysisManager extends TypedEmitter<AnalysisManagerEvents> {
  #worker: Worker | null = null;
  #ready = false;
  #destroyed = false;
  #restartTimer: ReturnType<typeof setTimeout> | null = null;
  readonly #modelPath: string;
  readonly #restartDelayMs = 1000;

  readonly #tempoCnnPath: string;
  readonly #moodModelDir: string;

  constructor(modelPath: string, tempoCnnPath: string, moodModelDir: string) {
    super();
    this.#modelPath = modelPath;
    this.#tempoCnnPath = tempoCnnPath;
    this.#moodModelDir = moodModelDir;
    this.#spawn();
  }

  processRhythm(buffer: Buffer): void {
    if (!this.#ready || !this.#worker) return;
    const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    this.#worker.postMessage({ type: 'rhythm', buffer: ab }, [ab as ArrayBuffer]);
  }

  set energy(level: number) {
    if (!this.#ready || !this.#worker) return;
    this.#worker.postMessage({ type: 'energy', level });
  }

  processMl(buffer: Buffer): void {
    if (!this.#ready || !this.#worker) return;
    const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    this.#worker.postMessage({ type: 'ml', buffer: ab }, [ab as ArrayBuffer]);
  }

  destroy(): void {
    this.#destroyed = true;
    if (this.#restartTimer) {
      clearTimeout(this.#restartTimer);
    }
    this.#ready = false;
    this.#worker?.terminate();
    this.#worker = null;
  }

  #spawn(): void {
    const workerFile = path.join(__dirname, 'analysis-worker.js');
    this.#worker = new Worker(workerFile, {
      workerData: {
        modelPath: this.#modelPath,
        tempoCnnPath: this.#tempoCnnPath,
        moodModelDir: this.#moodModelDir
      }
    });

    this.#worker.on('message', (msg: WorkerMsg) => {
      switch (msg.type) {
        case 'ready':
          this.#ready = true;
          this.emit('ready');
          break;
        case 'bpm':
          this.emit('bpm', msg.value);
          break;
        case 'danceability':
          this.emit('danceability', msg.value);
          break;
        case 'extracted':
          this.emit('extracted', msg.tags);
          break;
        case 'mood':
          this.emit('mood', msg.scores);
          break;
      }
    });

    this.#worker.on('error', err => console.error('[AnalysisManager] worker error:', err));

    this.#worker.on('exit', code => {
      if (this.#destroyed) return;
      this.#ready = false;
      this.#worker = null;
      if (this.#restartTimer) return; // already scheduled
      console.warn(`[AnalysisManager] worker exited (code ${code}), restarting in ${this.#restartDelayMs}ms`);
      this.#restartTimer = setTimeout(() => {
        this.#restartTimer = null;
        this.#spawn();
      }, this.#restartDelayMs);
    });
  }
}
