export type InventoryItem = {
  ingredient_id: string;
  ingredient_name: string;
  remaining_stock: number;
  unit: 'ml' | 'g' | 'ea';
};

export type UseInventoryItemRequest = {
  used_stock: number;
};
