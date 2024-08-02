import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
import { UserResponse } from 'src/interfaces/user.interface';

export class GenerateRecipeImageDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsMongoId()
  @IsNotEmpty()
  user: UserResponse;
}
