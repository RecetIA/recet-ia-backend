import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';

import { User } from 'src/data/schemas/user.schema';
import { Recipe } from 'src/data/schemas/recipe.schema';
import { AddToFavoriteDto } from '../dto';

import { MongoAdapter } from 'src/config/adapters';
import { MessageResponse } from 'src/interfaces/response.interface';

interface AddToFavoriteUseCase {
  execute: (dto: AddToFavoriteDto) => Promise<MessageResponse>;
}

export class AddToFavorite implements AddToFavoriteUseCase {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
  ) {}

  async execute(dto: AddToFavoriteDto): Promise<MessageResponse> {
    const user = await this.userModel.findById(dto.user.id).exec();
    if (!user) throw new NotFoundException('User not found');

    const recipe = await this.recipeModel.findById(dto.recipeId).exec();
    if (!recipe) throw new NotFoundException('Recipe not found');

    const recipeId = MongoAdapter.toMongoID(dto.recipeId);

    const isFavorite = user.favoriteRecipes.some(
      (favorite) => favorite.toString() === dto.recipeId,
    );
    if (isFavorite) {
      user.favoriteRecipes = user.favoriteRecipes.filter(
        (favorite) => favorite.toString() !== dto.recipeId,
      );

      await Promise.all([
        user.save(),
        this.recipeModel.updateOne({ _id: recipeId }, { isFavorite: false }),
      ]);

      return {
        message: 'Receta eliminada de favoritos',
        error: false,
      };
    }

    user.favoriteRecipes = [...user.favoriteRecipes, recipeId];

    await Promise.all([
      user.save(),
      this.recipeModel.updateOne({ _id: recipeId }, { isFavorite: true }),
    ]);

    return {
      message: 'Receta añadida a favoritos',
      error: false,
    };
  }
}
