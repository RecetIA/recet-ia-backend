import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Recipe } from 'src/data/schemas/recipe.schema';
import { User } from 'src/data/schemas/user.schema';
import {
  AddToFavoriteDto,
  GenerateRecipeDto,
  GenerateRecipeImageDto,
} from './dto';

import {
  AddToFavorite,
  GenerateRecipe,
  GenerateRecipeImage,
  GetFavorites,
  GetRecipe,
  GetSavedRecipes,
} from './use-cases';

import { GptService } from 'src/services/gpt/gpt.service';
import { FileUploadService } from 'src/services/file-upload/file-upload.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    private readonly gptService: GptService,
    private readonly fileService: FileUploadService,
  ) {}

  async generateRecipe(generateRecipeDto: GenerateRecipeDto) {
    return await new GenerateRecipe(this.recipeModel, this.gptService).execute(
      generateRecipeDto,
    );
  }

  async generateRecipeImage(generateRecipeImageDto: GenerateRecipeImageDto) {
    return await new GenerateRecipeImage(
      this.recipeModel,
      this.gptService,
      this.fileService,
    ).execute(generateRecipeImageDto);
  }

  async getFavorites(userId: string) {
    return await new GetFavorites(this.userModel, this.recipeModel).execute(
      userId,
    );
  }

  async addToFavorite(addToFavoriteDto: AddToFavoriteDto) {
    return await new AddToFavorite(this.userModel, this.recipeModel).execute(
      addToFavoriteDto,
    );
  }

  async getSavedRecipes(userId: string) {
    return await new GetSavedRecipes(this.userModel, this.recipeModel).execute(
      userId,
    );
  }

  async getRecipe(id: string) {
    return await new GetRecipe(this.recipeModel).execute(id);
  }
}
