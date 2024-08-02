import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Recipe, RecipeSchema } from 'src/data/schemas/recipe.schema';
import { User, UserSchema } from 'src/data/schemas/user.schema';

import { RecipeService } from './recipe.service';
import { GptService } from 'src/services/gpt/gpt.service';

import { RecipeController } from './recipe.controller';

import {
  FileUploadOptions,
  FileUploadService,
} from 'src/services/file-upload/file-upload.service';

import { envs } from 'src/config/envs';

const fileUploadOptions: FileUploadOptions = {
  cloudName: envs.CLOUDINARY_CLOUD_NAME,
  apiKey: envs.CLOUDINARY_API_KEY,
  apiSecret: envs.CLOUDINARY_API_SECRET,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    GptService,
    {
      provide: 'FileUploadOptions',
      useValue: fileUploadOptions,
    },
    FileUploadService,
  ],
})
export class RecipeModule {}
