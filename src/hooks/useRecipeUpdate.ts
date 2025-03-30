import {
  CostCalculatorDetail,
  CostCalculatorRequest,
} from '@/api/storeId/costCalculator/costCalculator.type';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

import { getChangedFields } from '@/utils/formUtils';
import { isArraysEqual } from '@fullcalendar/core/internal';
import { toast } from 'react-toastify';
import { useInventoryItemMutation } from '@/api/storeId/inventory/inventory.hooks';
import { useUpdateRecipeMutation } from '@/api/storeId/costCalculator/costCalculator.hooks';

export const useRecipeUpdate = (storeId: string) => {
  const updateRecipeMutation = useUpdateRecipeMutation(storeId);

  const InventoryItemMutation = useInventoryItemMutation(storeId);

  // 롤백 함수
  const rollbackRecipe = async (
    originalRecipeData: CostCalculatorDetail,
    changedFields: Partial<CostCalculatorRequest>
  ) => {
    try {
      // 변경된 필드만 원래 값으로 복원
      const rollbackData = {} as CostCalculatorRequest;

      // changedFields에 있는 키만 원래 값으로 복원
      Object.keys(changedFields).forEach((key) => {
        const typedKey = key as keyof CostCalculatorRequest;
        (rollbackData as any)[typedKey] =
          originalRecipeData[typedKey as keyof CostCalculatorDetail];
      });

      // 변경된 필드가 있을 때만 롤백 요청
      if (Object.keys(rollbackData).length > 0) {
        await updateRecipeMutation.mutateAsync({
          recipeId: originalRecipeData.recipe_id,
          data: rollbackData,
        });
      }
    } catch (error) {
      console.error('메뉴 롤백 실패:', error);
    }
  };

  const updateRecipe = async (
    recipeData: CostCalculatorDetail,
    recipeDataToSave: CostCalculatorRequest,
    ingredientsUsage: { [key: string]: number },
    originalUsage: { [key: string]: number }
  ) => {
    try {
      // 1. 변경된 필드만 추출
      const originalRecipeRequest: CostCalculatorRequest = {
        recipe_name: recipeData.recipe_name,
        recipe_cost: recipeData.recipe_cost,
        recipe_img: recipeData.recipe_img,
        is_favorites: recipeData.is_favorites,
        ingredients:
          recipeData.ingredients?.map((ing) => ({
            ingredient_id: ing.ingredient_id,
            required_amount: ing.required_amount,
          })) || [],
        production_quantity: recipeData.production_quantity,
      };

      // 배열 필드 특별 처리
      let changedFields = getChangedFields(
        recipeDataToSave,
        originalRecipeRequest
      );

      // 변경 후: undefined 값을 빈 문자열로 변환하는 코드
      changedFields = Object.entries(changedFields).reduce(
        (acc, [key, value]) => {
          if (value === undefined) {
            // undefined 값을 빈 문자열로 변환
            acc[key] = '';
          } else {
            // 모든 다른 값을 포함 (빈 문자열 포함)
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      // ingredients 배열이 실제로 변경되었는지 확인
      if (
        'ingredients' in changedFields &&
        isArraysEqual(
          originalRecipeRequest.ingredients,
          recipeDataToSave.ingredients
        )
      ) {
        delete changedFields.ingredients;
      }

      // 재고 변경 사항 확인
      const inventoryChanges = Object.entries(ingredientsUsage).filter(
        ([itemId, amount]) => {
          const originalAmount = originalUsage[itemId] || 0;
          return amount !== originalAmount;
        }
      );

      if (
        Object.keys(changedFields).length === 0 &&
        inventoryChanges.length === 0
      ) {
        toast.dismiss();
        showSuccessToast('변경된 내용이 없습니다');
        return true;
      }

      // 2. 변경된 필드가 있을 때만 레시피 수정 시도
      if (Object.keys(changedFields).length > 0) {
        console.log('PUT 요청 보내기 직전:', changedFields);
        await updateRecipeMutation.mutateAsync({
          recipeId: recipeData.recipe_id,
          data: changedFields as CostCalculatorRequest,
        });
        toast.dismiss();
        showSuccessToast('메뉴가 수정 되었습니다.');
      }

      try {
        // 3. 재고 조정 (변경된 항목만)
        const updatePromises = inventoryChanges.map(([itemId, amount]) => {
          const originalAmount = originalUsage[itemId] || 0;
          const diffAmount = amount - originalAmount; // 차이값 계산

          return InventoryItemMutation.mutateAsync({
            ingredientId: itemId,
            data: { used_stock: diffAmount },
          });
        });

        // 재고 업데이트가 있는 경우에만 처리
        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
          toast.dismiss();
          showSuccessToast('메뉴가 수정 되었습니다.');
        }

        return true;
      } catch (inventoryError) {
        console.error('재고 사용 오류:', inventoryError);

        // 레시피 롤백 시도 (변경사항이 있었을 경우만)
        if (Object.keys(changedFields).length > 0) {
          await rollbackRecipe(recipeData, changedFields);
        }

        throw inventoryError;
      }
    } catch (recipeError) {
      toast.dismiss();
      showErrorToast('메뉴 수정에 실패했습니다.');
      console.error('메뉴 수정 오류:', recipeError);
      throw recipeError;
    }
  };

  return {
    updateRecipe,
    isUpdating: updateRecipeMutation.isPending,
  };
};
