import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { Recipe } from 'src/data/schemas/recipe.schema';
import { User } from 'src/data/schemas/user.schema';

interface GetFavoritesUseCase {
  execute(userId: string): Promise<Recipe[]>;
}

export class GetFavorites implements GetFavoritesUseCase {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
  ) {}

  async execute(userId: string): Promise<Recipe[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    const favoriteRecipes = await Promise.all(
      user.favoriteRecipes.map((recipeId) =>
        this.recipeModel.findById(recipeId.toString()).exec(),
      ),
    );

    return favoriteRecipes;
  }
}
