export type IngredientsResponse = {
  all_ingredient: number;
  all_ingredient_cost: number;
  ingredients: IngredientsDetailResponse[];
};

export type IngredientsDetailResponse = {
  ingredient_id: string; // UUID
  ingredient_name: string;
  ingredient_cost: number;
  capacity: number;
  unit: 'ml' | 'mg' | 'ea';
  unit_cost: number;
  shop?: string;
  ingredient_detail?: string;
};

export type IngredientsRequest = Omit<
  IngredientsDetailResponse,
  'ingredient_id' | 'unit_cost'
>;
