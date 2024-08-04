import { InjectModel } from '@nestjs/mongoose';
import { InternalServerErrorException } from '@nestjs/common';

import { Model } from 'mongoose';

import { Recipe } from 'src/data/schemas/recipe.schema';

import { GenerateRecipeImageDto } from '../dto';
import { GptService } from 'src/services/gpt/gpt.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

import { ImageResponse } from 'src/interfaces/response.interface';

interface GenerateRecipeImageUseCase {
  execute: (dto: GenerateRecipeImageDto) => Promise<ImageResponse>;
}

export class GenerateRecipeImage implements GenerateRecipeImageUseCase {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    private readonly gptService: GptService,
    private readonly fileService: FileUploadService,
  ) {}

  async execute(dto: GenerateRecipeImageDto): Promise<ImageResponse> {
    try {
      const recipeImage = await this.gptService.generateImage(dto.prompt);

      const uploadResponse = await this.fileService.uploadFile(
        recipeImage.data[0].url!,
        'recetia',
      );

      await this.recipeModel.updateOne(
        { _id: dto.recipeId, creator: dto.user.id },
        { img: uploadResponse.secure_url },
        {
          new: true,
        },
      );

      return {
        urlImage: uploadResponse.secure_url,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
