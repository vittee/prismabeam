import type { BpmDetectorType } from "./analysis/analysis-worker";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TAGGING_PORT?: string;
      AUDIO_PORT?: string;
      //
      BPM_DETECTOR?: BpmDetectorType;
    }
  }
}

export {};