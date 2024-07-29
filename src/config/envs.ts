import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  MONGO_URL: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  JWT_SEED: z.string(),
});

export const envs = envSchema.parse(process.env);
