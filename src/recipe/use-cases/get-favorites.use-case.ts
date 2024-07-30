import { HandlerResponse } from "@netlify/functions";

import { UserService, RecipeService } from "../../../services";
import { HEADERS } from "../../../config/utils";

interface GetFavoritesUseCase {
  execute(userId: string): Promise<HandlerResponse>;
}

export class GetFavorites implements GetFavoritesUseCase {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly recipeService: RecipeService = new RecipeService()
  ) {}

  async execute(userId: string): Promise<HandlerResponse> {
    const user = await this.userService.findById(userId);
    if (!user)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Usuario no encontrado",
          error: true,
        }),
        headers: HEADERS.json,
      };
    
    const favoriteRecipes = await Promise.all(
      user.favoriteRecipes.map((recipeId) =>
        this.recipeService.findById(recipeId.toString())
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(favoriteRecipes),
      headers: HEADERS.json,
    };
  }
}