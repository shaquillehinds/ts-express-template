declare namespace NodeJS {
  interface ProcessEnv {
    SECRET: string;
    MONGO_URI: string;
    PORT: string | number;
  }
}
