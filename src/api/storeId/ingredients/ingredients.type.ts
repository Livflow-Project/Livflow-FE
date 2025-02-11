export type IngredientsResponse = {
  all_ingredient: number;
  all_ingredient_cost: number;
  ingredients: IngredientResponse[];
};

export type IngredientResponse = {
  ingredient_id: string; // UUID
  ingredient_name: string;
  ingredient_cost: number;
  capacity: number;
  unit: 'ml' | 'g' | 'ea';
  unit_cost: number;
  shop?: string;
  ingredient_detail?: string;
};

export type IngredientRequest = Omit<
  IngredientResponse,
  'ingredient_id' | 'unit_cost'
>;
