import {
  CostCalculatorDetail,
  CostCalculatorRequest,
} from '@/api/storeId/costCalculator/costCalculator.type';
import { showErrorToast, showWarnToast } from '@/utils/toast';
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '@/api/storeId/costCalculator/costCalculator.hooks';
import {
  useGetInventoryItems,
  useInventoryItemMutation,
} from '@/api/storeId/inventory/inventory.hooks';

import { RecipeFormData } from './useRecipeForm';
import { toast } from 'react-toastify';
import { useStore } from '@/contexts/StoreContext';

export const useRecipeSubmit = (
  onSave: () => void,
  recipeData?: CostCalculatorDetail,
  editOnly: boolean = false,
  originalUsage: { [key: string]: number } = {}
) => {
  const { storeInfo } = useStore();
  const storeId = storeInfo?.id || '';

  // 레시피 생성/수정 뮤테이션
  const createRecipeMutation = useCreateRecipeMutation(storeId);
  const updateRecipeMutation = useUpdateRecipeMutation(storeId);

  // 재고 정보 가져오기
  const { data: inventoryItems } = useGetInventoryItems(storeId);

  // 재고 사용 뮤테이션
  const InventoryItemMutation = useInventoryItemMutation(storeId);

  // 메뉴 저장 핸들러 (formMethods 매개변수 추가)
  const onSubmit = async (data: RecipeFormData, formMethods: any) => {
    // 기존 오류 초기화
    formMethods.clearErrors();

    // 필수 입력값 검증
    if (!data.recipe_name) {
      showWarnToast('메뉴 이름을 입력해주세요.');
      // 메뉴 이름 필드에 오류 설정
      formMethods.setError('recipe_name', {
        type: 'required',
        message: '메뉴 이름을 입력해주세요.',
      });
      return;
    }

    // 재고 초과 검증
    if (inventoryItems) {
      const invalidItems = [];

      for (const item of inventoryItems) {
        const usage = data.ingredients_usage[item.ingredient_id] || 0;
        const originalAmount = originalUsage[item.ingredient_id] || 0;
        const maxUsage = item.remaining_stock + originalAmount;

        if (usage > maxUsage) {
          // 오류 항목 추가
          invalidItems.push({
            id: item.ingredient_id,
            name: item.ingredient_name,
            max: maxUsage,
            unit: item.unit,
          });

          // 해당 필드에 오류 설정
          formMethods.setError(`ingredients_usage.${item.ingredient_id}`, {
            type: 'max',
            message: `최대 사용량은 ${maxUsage}${item.unit}입니다`,
          });
        }
      }

      // 사용량 초과 항목이 있으면 토스트 표시
      if (invalidItems.length > 0) {
        toast.dismiss();
        // 토스트 메시지를 지연 시간을 두고 순차적으로 표시
        invalidItems.forEach((item, index) => {
          setTimeout(() => {
            showWarnToast(
              `${item.name}의 최대 사용량은 ${item.max}${item.unit}입니다.`
            );
          }, index * 1200);
        });

        // 5초 후 오류 초기화
        setTimeout(() => {
          formMethods.clearErrors();
        }, 5000);

        return;
      }
    }

    // 사용된 재료만 필터링
    const usedIngredients = Object.entries(data.ingredients_usage)
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

    if (editOnly && recipeData) {
      await handleRecipeUpdate(
        recipeData,
        recipeDataToSave,
        data.ingredients_usage
      );
    } else {
      await handleRecipeCreate(recipeDataToSave, usedIngredients);
    }

    onSave();
  };

  // 레시피 업데이트 처리
  const handleRecipeUpdate = async (
    recipeData: CostCalculatorDetail,
    recipeDataToSave: CostCalculatorRequest,
    ingredientsUsage: { [key: string]: number }
  ) => {
    // 1. 레시피 수정
    await updateRecipeMutation.mutateAsync({
      recipeId: recipeData.recipe_id,
      data: recipeDataToSave,
    });

    // 2. 재고 조정 (사용량 차이만큼)
    const updatePromises = Object.entries(ingredientsUsage)
      .filter(([itemId, amount]) => {
        // 원래 사용량과 다른 경우만 처리
        const originalAmount = originalUsage[itemId] || 0;
        return amount !== originalAmount;
      })
      .map(([itemId, amount]) => {
        const originalAmount = originalUsage[itemId] || 0;
        const difference = originalAmount - amount; // 양수: 재고 증가, 음수: 재고 감소

        return InventoryItemMutation.mutateAsync({
          ingredientId: itemId,
          data: { used_stock: -difference }, // 차이의 반대값을 사용
        });
      });

    await Promise.all(updatePromises);
  };

  // 레시피 생성 처리
  const handleRecipeCreate = async (
    recipeDataToSave: CostCalculatorRequest,
    usedIngredients: { ingredient_id: string; required_amount: number }[]
  ) => {
    // 1. 레시피 저장
    await createRecipeMutation.mutateAsync(recipeDataToSave);

    // 2. 각 재료의 재고 감소 처리
    const updatePromises = usedIngredients.map(
      ({ ingredient_id, required_amount }) =>
        InventoryItemMutation.mutateAsync({
          ingredientId: ingredient_id,
          data: { used_stock: required_amount },
        })
    );

    await Promise.all(updatePromises);
  };

  const isPending =
    createRecipeMutation.isPending || updateRecipeMutation.isPending;

  return {
    onSubmit,
    isPending,
  };
};
