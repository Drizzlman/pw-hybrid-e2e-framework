import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z
    .string()
    .url({ message: 'BASE_URL must be a valid http(s) URL' })
    .default('https://www.automationexercise.com'),
  API_BASE_URL: z
    .string()
    .url({ message: 'API_BASE_URL must be a valid http(s) URL' })
    .default('https://automationexercise.com'),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(env: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return parsed.data;
}
