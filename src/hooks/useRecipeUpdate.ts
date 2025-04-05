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

  const rollbackRecipe = async (
    originalRecipeData: CostCalculatorDetail,
    changedFields: Partial<CostCalculatorRequest>
  ) => {
    try {
      const rollbackData = {} as CostCalculatorRequest;

      Object.keys(changedFields).forEach((key) => {
        const typedKey = key as keyof CostCalculatorRequest;
        (rollbackData as any)[typedKey] =
          originalRecipeData[typedKey as keyof CostCalculatorDetail];
      });

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

      let changedFields = getChangedFields(
        recipeDataToSave,
        originalRecipeRequest
      );

      changedFields = Object.entries(changedFields).reduce(
        (acc, [key, value]) => {
          if (value === undefined) {
            acc[key] = '';
          } else {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      if (
        'ingredients' in changedFields &&
        isArraysEqual(
          originalRecipeRequest.ingredients,
          recipeDataToSave.ingredients
        )
      ) {
        delete changedFields.ingredients;
      }

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

      if (Object.keys(changedFields).length > 0) {
        await updateRecipeMutation.mutateAsync({
          recipeId: recipeData.recipe_id,
          data: changedFields as CostCalculatorRequest,
        });
        toast.dismiss();
        showSuccessToast('메뉴가 수정 되었습니다.');
      }

      try {
        const updatePromises = inventoryChanges.map(([itemId, amount]) => {
          const originalAmount = originalUsage[itemId] || 0;
          const diffAmount = amount - originalAmount;

          return InventoryItemMutation.mutateAsync({
            ingredientId: itemId,
            data: { used_stock: diffAmount },
          });
        });

        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
          toast.dismiss();
          showSuccessToast('메뉴가 수정 되었습니다.');
        }

        return true;
      } catch (inventoryError) {
        console.error('재고 사용 오류:', inventoryError);

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
