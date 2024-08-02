import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddToFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid recipe id' })
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid creator id' })
  creator: string;
}
