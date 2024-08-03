import { Request } from 'express';
import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';

import { RecipeService } from './recipe.service';
import {
  AddToFavoriteDto,
  GenerateRecipeDto,
  GenerateRecipeImageDto,
} from './dto';

import { UserResponse } from 'src/interfaces/user.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('generate-recipe')
  generateRecipe(@Body() generateRecipeDto: GenerateRecipeDto) {
    return this.recipeService.generateRecipe(generateRecipeDto);
  }

  @Post('generate-recipe-image')
  generateRecipeImage(@Body() generateRecipeImageDto: GenerateRecipeImageDto) {
    return this.recipeService.generateRecipeImage(generateRecipeImageDto);
  }

  @Get('favorites')
  getFavorites(@Req() req: Request) {
    const user = req.body.user as UserResponse;
    return this.recipeService.getFavorites(user.id);
  }

  @Post('favorites')
  addToFavorite(@Body() addToFavoriteDto: AddToFavoriteDto) {
    return this.recipeService.addToFavorite(addToFavoriteDto);
  }

  @Get('saved')
  getSavedRecipes(@Req() req: Request) {
    const user = req.body.user as UserResponse;

    return this.recipeService.getSavedRecipes(user.id);
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }
}
