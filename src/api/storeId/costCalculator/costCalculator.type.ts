export type CostCalculatorListItem = {
  recipe_id: string;
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: File | string;
  is_favorites: boolean;
};

export type RecipeIngredient = {
  ingredient_id: string;
  required_amount: number;
};

export type CostCalculatorDetail = {
  recipe_id: string;
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: File | string;
  is_favorites: boolean;
  ingredients?: RecipeIngredient[];
  production_quantity?: number;
};

export type CostCalculatorRequest = Omit<CostCalculatorDetail, 'recipe_id'>;
