import { showErrorToast, showSuccessToast } from '@/utils/toast';

import { CostCalculatorRequest } from '@/api/storeId/costCalculator/costCalculator.type';
import { useCreateRecipeMutation } from '@/api/storeId/costCalculator/costCalculator.hooks';
import { useInventoryItemMutation } from '@/api/storeId/inventory/inventory.hooks';

export const useRecipeCreate = (storeId: string) => {
  const createRecipeMutation = useCreateRecipeMutation(storeId);

  const InventoryItemMutation = useInventoryItemMutation(storeId);

  const createRecipe = async (
    recipeDataToSave: CostCalculatorRequest,
    usedIngredients: { ingredient_id: string; required_amount: number }[]
  ) => {
    try {
      // 1. 먼저 레시피 저장 시도
      const createRecipe =
        await createRecipeMutation.mutateAsync(recipeDataToSave);

      try {
        // 2. 레시피 저장 성공 후 재고 감소 처리
        const updatePromises = usedIngredients.map(
          ({ ingredient_id, required_amount }) =>
            InventoryItemMutation.mutateAsync({
              ingredientId: ingredient_id,
              data: { used_stock: required_amount },
            })
        );

        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
        }

        // 모든 작업이 성공적으로 완료되면 성공 토스트 표시
        showSuccessToast('메뉴가 추가 되었습니다');

        return createRecipe;
      } catch (inventoryError) {
        showErrorToast('재고 사용에 실패했습니다.');
        console.error('재고 사용 오류:', inventoryError);
        throw inventoryError;
      }
    } catch (recipeError) {
      showErrorToast('메뉴 저장에 실패했습니다.');
      console.error('메뉴 저장 오류:', recipeError);
      throw recipeError;
    }
  };

  return {
    createRecipe,
    isCreating: createRecipeMutation.isPending,
  };
};
