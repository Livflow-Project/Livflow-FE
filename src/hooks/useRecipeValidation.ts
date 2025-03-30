import { CostCalculatorRequest } from '@/api/storeId/costCalculator/costCalculator.type';
import { RecipeFormData } from './useRecipeForm';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';

export const useRecipeValidation = (
  inventoryItems: any[] | undefined,
  originalUsage: { [key: string]: number } = {}
) => {
  const validateRecipeForm = (data: RecipeFormData, formMethods: any) => {
    // 필수 입력값 검증
    if (!data.recipe_name) {
      showWarnToast('메뉴 이름을 입력해주세요.');
      formMethods.setError('recipe_name', {
        type: 'required',
        message: '메뉴 이름을 입력해주세요.',
      });
      return { isValid: false };
    }

    // 인벤토리에 더 이상 존재하지 않는 재료 필터링
    let filteredUsage = { ...data.ingredients_usage };
    if (inventoryItems) {
      const validIngredientIds = inventoryItems.map(
        (item) => item.ingredient_id
      );
      filteredUsage = Object.entries(data.ingredients_usage)
        .filter(([id, _]) => validIngredientIds.includes(id))
        .reduce(
          (acc, [id, value]) => {
            acc[id] = value;
            return acc;
          },
          {} as Record<string, number>
        );
    }

    // 재고 초과 검증
    if (inventoryItems) {
      const invalidItems = [];

      for (const item of inventoryItems) {
        const usage = filteredUsage[item.ingredient_id] || 0;
        const originalAmount = originalUsage[item.ingredient_id] || 0;
        const maxUsage = item.remaining_stock + originalAmount;

        if (usage > maxUsage) {
          invalidItems.push({
            id: item.ingredient_id,
            name: item.ingredient_name,
            max: maxUsage,
            unit: item.unit,
          });

          formMethods.setError(`ingredients_usage.${item.ingredient_id}`, {
            type: 'max',
            message: `최대 사용량은 ${maxUsage}${item.unit}입니다`,
          });
        }
      }

      if (invalidItems.length > 0) {
        toast.dismiss();
        invalidItems.forEach((item, index) => {
          setTimeout(() => {
            showWarnToast(
              `${item.name}의 최대 사용량은 ${item.max}${item.unit}입니다.`
            );
          }, index * 1200);
        });

        setTimeout(() => {
          formMethods.clearErrors();
        }, 5000);

        return { isValid: false };
      }
    }

    // 사용된 재료만 필터링
    const usedIngredients = Object.entries(filteredUsage)
      .filter(([_, amount]) => amount > 0)
      .map(([ingredientId, required_amount]) => ({
        ingredient_id: ingredientId,
        required_amount,
      }));

    // 레시피 데이터 생성
    const recipeDataToSave: CostCalculatorRequest = {
      recipe_name: data.recipe_name,
      recipe_cost: data.recipe_cost || undefined,
      recipe_img: data.recipe_img || undefined,
      is_favorites: data.is_favorites,
      ingredients: usedIngredients,
      production_quantity: data.production_quantity || undefined,
    };

    return {
      isValid: true,
      recipeDataToSave,
      usedIngredients,
      filteredUsage,
    };
  };

  return { validateRecipeForm };
};
