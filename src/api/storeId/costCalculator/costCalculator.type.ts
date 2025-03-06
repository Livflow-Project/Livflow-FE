export type CostCalculatorListItem = {
  recipe_id: string; // UUID
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: string;
  is_favorites: boolean;
};

export type RecipeIngredient = {
  ingredient_id: string; // UUID
  required_amount: number;
};

export type CostCalculatorDetail = {
  recipe_id: string; // UUID
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: string;
  is_favorites: boolean;
  ingredients?: RecipeIngredient[];
  total_ingredient_cost?: number;
  production_quantity?: number;
};

export type CostCalculatorRequest = Omit<CostCalculatorDetail, 'recipe_id'>;
