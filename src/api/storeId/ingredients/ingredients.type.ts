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
  shop?: string;
  ingredient_detail?: string;
};

// id를 제외한 DayDetailTransaction 타입
export type IngredientsRequest = Omit<
  IngredientsDetailResponse,
  'ingredient_id'
>;
