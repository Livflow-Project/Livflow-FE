import { InventoryItem, UseInventoryItemRequest } from './inventory.type';
import { getInventoryItemsAPI, useInventoryItemAPI } from './inventoryAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const INVENTORY_QUERY_KEY = 'inventory';

export const useGetInventoryItems = (storeId: string) => {
  return useQuery<InventoryItem[]>({
    queryKey: [INVENTORY_QUERY_KEY, storeId],
    queryFn: () => getInventoryItemsAPI(storeId),
  });
};

export const useInventoryItemMutation = (storeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ingredientId,
      data,
    }: {
      ingredientId: string;
      data: UseInventoryItemRequest;
    }) => useInventoryItemAPI(storeId, ingredientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [INVENTORY_QUERY_KEY, storeId],
      });
    },
  });
};
