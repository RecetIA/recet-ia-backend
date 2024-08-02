import { RecipeResponse } from './recipe.interface';

export interface UserResponse {
  name: string;
  emailValidated: boolean;
  email: string;
  img: null;
  role: string[];
  favoriteRecipes: RecipeResponse[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User {
  user: UserResponse;
}
