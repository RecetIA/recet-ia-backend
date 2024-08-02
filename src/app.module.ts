import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './data/seed/seed.module';

import { GptService } from './services/gpt/gpt.service';
import { FileUploadService } from './services/file-upload/file-upload.service';

import { envs } from './config/envs';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(envs.MONGO_URL),
    RecipeModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [],
  providers: [GptService, FileUploadService],
})
export class AppModule {}
