export type IngredientsDetailResponse = {
  ingredients_id: string; // UUID
  item_name: string;
  item_cost: number;
  capacity: number;
  unit: 'ml' | 'mg' | 'ea';
  shop: string;
  item_detail: string;
};

// id를 제외한 DayDetailTransaction 타입
export type IngredientsRequest = Omit<
  IngredientsDetailResponse,
  'ingredients_id'
>;
