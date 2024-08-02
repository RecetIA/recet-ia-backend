import { IsString, IsMongoId } from 'class-validator';

export class GenerateRecipeImageDto {
  @IsString()
  prompt: string;

  @IsMongoId()
  creator: string;
}
