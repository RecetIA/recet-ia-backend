import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { Recipe } from 'src/data/schemas/recipe.schema';
import { User } from 'src/data/schemas/user.schema';

interface GetSavedRecipesUseCase {
  execute(userId: string): Promise<Recipe[]>;
}

export class GetSavedRecipes implements GetSavedRecipesUseCase {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
  ) {}

  async execute(userId: string): Promise<Recipe[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    const savedRecipes = await this.recipeModel
      .find(
        {
          creator: userId,
        },
        {
          creator: 0,
          createdAt: 0,
          updatedAt: 0,
          observations: 0,
          recipe: { nutritional: 0 },
        },
      )
      .exec();

    return savedRecipes;
  }
}
