import { useInventoryItemMutation } from '@/api/storeId/inventory/inventory.hooks';

export const useInventoryManagement = (storeId: string) => {
  const InventoryItemMutation = useInventoryItemMutation(storeId);

  // 재고 사용량 업데이트
  const updateInventoryUsage = async (
    ingredientId: string,
    usedAmount: number
  ) => {
    return InventoryItemMutation.mutateAsync({
      ingredientId,
      data: { used_stock: usedAmount },
    });
  };

  // 재고 사용량 차이 업데이트 (수정 시)
  const updateInventoryDiff = async (
    ingredientId: string,
    newAmount: number,
    originalAmount: number
  ) => {
    const diffAmount = newAmount - originalAmount;
    if (diffAmount === 0) return null;

    return updateInventoryUsage(ingredientId, diffAmount);
  };

  // 여러 재고 항목 업데이트
  const updateMultipleInventoryItems = async (usageMap: {
    [ingredientId: string]: number;
  }) => {
    const updatePromises = Object.entries(usageMap).map(
      ([ingredientId, amount]) => updateInventoryUsage(ingredientId, amount)
    );

    return Promise.all(updatePromises);
  };

  return {
    updateInventoryUsage,
    updateInventoryDiff,
    updateMultipleInventoryItems,
    isPending: InventoryItemMutation.isPending,
  };
};
