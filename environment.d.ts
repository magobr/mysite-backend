declare global {
    namespace NodeJS {
        interface ProcessEnv {
        APP_URL: string;
        DB_CONNECTION: string;
        AUTH_SECRET: string;
        }
    }
}

export {}