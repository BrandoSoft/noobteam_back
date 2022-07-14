export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_USER: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}
