declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZER_HOST?: string;
      ANALYZER_PORT?: string;
    }
  }
}

export {};