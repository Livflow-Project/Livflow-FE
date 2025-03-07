export type InventoryItem = {
  ingredient_id: string;
  ingredient_name: string;
  original_stock: number;
  remaining_stock: number;
  unit: 'ml' | 'g' | 'ea';
  unit_cost: number;
};

export type UseInventoryItemRequest = {
  used_stock: number;
};
