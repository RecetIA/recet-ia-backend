import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { UserResponse } from 'src/interfaces/user.interface';

export class AddToFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid recipe id' })
  recipeId: string;

  user: UserResponse;
}
