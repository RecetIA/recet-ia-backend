import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Recipe, RecipeSchema } from 'src/data/schemas/recipe.schema';

import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
