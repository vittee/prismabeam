declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TAGGING_PORT: string;
      AUDIO_PORT: string;
    }
  }
}

export {};