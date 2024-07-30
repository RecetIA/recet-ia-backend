import { HandlerResponse } from "@netlify/functions";

import { UserService, RecipeService } from "../../../services";
import { MongoAdapter } from "../../../config/adapters";
import { HEADERS } from "../../../config/utils";

interface GetRecipeUseCase {
  execute(recipeId: string): Promise<HandlerResponse>;
}

export class GetRecipe implements GetRecipeUseCase {
  constructor(
    private readonly recipeService: RecipeService = new RecipeService()
  ) {}

  async execute(recipeId: string): Promise<HandlerResponse> {
    if (!MongoAdapter.isMongoID(recipeId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid recipe id",
        }),
        headers: HEADERS.json,
      };
    }

    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Recipe not found",
        }),
        headers: HEADERS.json,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(recipe),
      headers: HEADERS.json,
    };
  }
}
