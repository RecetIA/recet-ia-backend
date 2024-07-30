import { HandlerResponse } from "@netlify/functions";

import { UserService, RecipeService } from "../../../services";
import { HEADERS } from "../../../config/utils";

interface GetSavedRecipesUseCase {
  execute(userId: string): Promise<HandlerResponse>;
}

export class GetSavedRecipes implements GetSavedRecipesUseCase {
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

    const savedRecipes = await this.recipeService.findMany(
      {
        creator: userId,
      },
      {
        creator: 0,
        createdAt: 0,
        updatedAt: 0,
        observations: 0,
        recipe: { nutritional: 0 },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(savedRecipes),
      headers: HEADERS.json,
    };
  }
}
