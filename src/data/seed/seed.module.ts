import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeedService } from './seed.service';

import { Recipe, RecipeSchema } from '../schemas/recipe.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGO_URL),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
