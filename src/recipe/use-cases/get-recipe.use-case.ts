import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MongoAdapter } from 'src/config/adapters';
import { Recipe } from 'src/data/schemas/recipe.schema';

interface GetRecipeUseCase {
  execute(recipeId: string): Promise<Recipe>;
}

export class GetRecipe implements GetRecipeUseCase {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async execute(recipeId: string): Promise<Recipe> {
    if (!MongoAdapter.isMongoID(recipeId)) {
      throw new BadRequestException('Invalid recipe ID');
    }

    const recipe = await this.recipeModel.findById(recipeId).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }
}
