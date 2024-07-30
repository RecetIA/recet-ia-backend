import { HandlerResponse } from "@netlify/functions";

import { GenerateRecipeImageDto } from "../dtos";
import {
  FileUploadService,
  GptService,
  RecipeService,
} from "../../../services";

import { envs } from "../../../config/envs";
import { HEADERS } from "../../../config/utils";

interface GenerateRecipeImageUseCase {
  execute: (dto: GenerateRecipeImageDto) => Promise<HandlerResponse>;
}

export class GenerateRecipeImage implements GenerateRecipeImageUseCase {
  constructor(
    private readonly gptService: GptService,
    private readonly recipeService: RecipeService = new RecipeService(),
    private readonly fileService: FileUploadService = new FileUploadService({
      cloudName: envs.CLOUDINARY_CLOUD_NAME,
      apiKey: envs.CLOUDINARY_API_KEY,
      apiSecret: envs.CLOUDINARY_API_SECRET,
    })
  ) {}

  async execute(dto: GenerateRecipeImageDto): Promise<HandlerResponse> {
    
    try {
      const recipeImage = await this.gptService.generateImage(dto.prompt);

      const uploadResponse = await this.fileService.uploadFile(
        recipeImage.data[0].url!,
        "recetia"
      );

      const recipe = await this.recipeService.updateRecipe(
        { creator: dto.creator },
        { img: uploadResponse.secure_url }
      );

      return {
        statusCode: 200,
        body: JSON.stringify(recipe),
        headers: HEADERS.json,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Internal Server Error",
          error: true,
        }),
        headers: HEADERS.json,
      };
    }
  }
}
