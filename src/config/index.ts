import 'dotenv/config';
import { loadEnv } from './env';

export const env = loadEnv();

export const config = {
  baseUrl: env.BASE_URL,
  apiBaseUrl: env.API_BASE_URL,
};

export type Config = typeof config;
