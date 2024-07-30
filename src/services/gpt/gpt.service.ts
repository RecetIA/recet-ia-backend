import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import OpenAI from 'openai';
import { z } from 'zod';

@Injectable()
export class GptService {
  private readonly openaiAPI = new OpenAI({ apiKey: envs.OPENAI_API_KEY });

  async generateJSON(prompt: string, schema: z.ZodObject<any>) {
    const result = await generateObject({
      model: openai('gpt-4o'),
      schema,
      prompt,
    });
    return result;
  }

  async generateImage(prompt: string) {
    const result = await this.openaiAPI.images.generate({
      prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });
    return result;
  }
}
