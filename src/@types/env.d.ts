declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: NODE_ENV; // Never set this variable in .env file
    VERSION: string;
    SECRET: string;
    SERVICE_ACCOUNT_CREDENTIALS: string;
    MONGO_URI: string;
  }
}
