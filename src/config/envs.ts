import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  MONGO_URL: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  JWT_SEED: z.string(),

  SEND_EMAIL: z.enum(['true', 'false']).transform((v) => v === 'true'),
  MAILER_HOST: z.string(),
  MAILER_EMAIL: z.string(),
  MAILER_SECRET_KEY: z.string(),
  MAILER_PORT: z.coerce.number().positive(),
  MAILER_USER: z.string(),

  FRONTEND_URL: z.string(),
});

export const envs = envSchema.parse(process.env);
