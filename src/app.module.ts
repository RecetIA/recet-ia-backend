import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(envs.MONGO_URL),
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
