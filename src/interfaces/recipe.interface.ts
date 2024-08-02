export interface RecipeResponse {
  observations: string;
  recipe: Recipe;
  img: string;
  isFavorite: boolean;
}

interface Recipe {
  matchRate: number;
  title: string;
  description: string;
  cookTimeInMins: number;
  calories: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  nutritional: Nutritional;
  observations: string;
}

interface Nutritional {
  summary: string;
  values: Value[];
}

interface Value {
  name: string;
  measure: Measure;
  quantity: number;
}

interface Ingredient {
  name: string;
  measure: Measure;
  quantity: number;
  isOptional: boolean;
}

interface Measure {
  full: string;
  short: string;
}
