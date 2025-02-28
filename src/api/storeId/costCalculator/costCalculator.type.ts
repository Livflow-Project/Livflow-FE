export type CostCalculatorListItem = {
  recipe_id: string; // UUID
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: string;
  is_favorites: boolean;
};

export type RecipeIngredient = {
  ingredient_id: string; // UUID
  ingredient_name: string;
  required_amount: number;
  unit: 'ml' | 'g' | 'ea';
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
  production_cost?: number;
};

export type CostCalculatorRequest = Omit<CostCalculatorDetail, 'recipe_id'>;
