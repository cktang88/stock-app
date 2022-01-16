/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALPHAVANTAGE_KEY: string;
  readonly VITE_ALPHAVANTAGE_KEY2: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
