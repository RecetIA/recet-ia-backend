import { HandlerResponse } from "@netlify/functions";

import { AddToFavoriteDto } from "../dtos";
import { RecipeService, UserService } from "../../../services";
import { MongoAdapter } from "../../../config/adapters";
import { HEADERS } from "../../../config/utils";

interface AddToFavoriteUseCase {
  execute: (dto: AddToFavoriteDto) => Promise<HandlerResponse>;
}

export class AddToFavorite implements AddToFavoriteUseCase {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly recipeService: RecipeService = new RecipeService(),
  ) {}

  async execute(dto: AddToFavoriteDto): Promise<HandlerResponse> {
    const user = await this.userService.findById(dto.creator);
    if (!user)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Usuario no encontrado",
          error: true,
        }),
        headers: HEADERS.json,
      };
    
    const recipe = await this.recipeService.findById(dto.recipeId);
    if (!recipe)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Receta no encontrada",
          error: true,
        }),
        headers: HEADERS.json,
      };
    
    const recipeId = MongoAdapter.toMongoID(dto.recipeId);

    const isFavorite = user.favoriteRecipes.some(favorite => favorite.toString() === dto.recipeId);
    console.log({isFavorite});
    if (isFavorite) {
      user.favoriteRecipes = user.favoriteRecipes.filter(favorite => favorite.toString() !== dto.recipeId);
      await Promise.all([
        this.userService.createUser(user),
        this.recipeService.updateRecipe(recipeId, { isFavorite: false }),
      ]);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Receta eliminada de favoritos",
          error: false,
        }),
        headers: HEADERS.json,
      };
    }
    
    
    user.favoriteRecipes.push(recipeId);

    await Promise.all([
      this.userService.createUser(user),
      this.recipeService.updateRecipe(recipeId, { isFavorite: true }),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Receta añadida a favoritos",
        error: false,
      }),
      headers: HEADERS.json,
    };
  }
}
