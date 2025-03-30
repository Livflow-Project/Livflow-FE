import { CostCalculatorDetail } from '@/api/storeId/costCalculator/costCalculator.type';
import { KeyboardEventHandler } from 'react';
import { RecipeFormData } from './useRecipeForm';
import { useGetInventoryItems } from '@/api/storeId/inventory/inventory.hooks';
import { useRecipeCreate } from './useRecipeCreate';
import { useRecipeUpdate } from './useRecipeUpdate';
import { useRecipeValidation } from './useRecipeValidation';
import { useStore } from '@/contexts/StoreContext';

export const useRecipeSubmit = (
  onSave: () => void,
  recipeData?: CostCalculatorDetail,
  editOnly: boolean = false,
  originalUsage: { [key: string]: number } = {}
) => {
  const { storeInfo } = useStore();
  const storeId = storeInfo?.id || '';

  // 재고 정보 가져오기
  const { data: inventoryItems } = useGetInventoryItems(storeId);

  // 유효성 검증 로직
  const { validateRecipeForm } = useRecipeValidation(
    inventoryItems,
    originalUsage
  );

  // 레시피 생성 로직
  const { createRecipe, isCreating } = useRecipeCreate(storeId);

  // 레시피 업데이트 로직
  const { updateRecipe, isUpdating } = useRecipeUpdate(storeId);

  // 엔터 키 이벤트 핸들러
  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      // 버튼이나 제출 버튼이 아닌 경우 엔터 키 기본 동작 방지
      if (e.target.type !== 'submit' && e.target.type !== 'button') {
        e.preventDefault();
      }
    }
  };

  // 메뉴 저장 핸들러
  const onSubmit = async (data: RecipeFormData, formMethods: any) => {
    // 기존 오류 초기화
    formMethods.clearErrors();

    // 유효성 검증
    const validationResult = validateRecipeForm(data, formMethods);
    if (!validationResult.isValid || !validationResult.recipeDataToSave) {
      return;
    }

    try {
      if (editOnly && recipeData) {
        await updateRecipe(
          recipeData,
          validationResult.recipeDataToSave,
          data.ingredients_usage,
          originalUsage
        );
      } else {
        await createRecipe(
          validationResult.recipeDataToSave,
          validationResult.usedIngredients
        );
      }

      onSave();
    } catch (error) {
      console.error('메뉴 저장 오류:', error);
    }
  };

  const isPending = isCreating || isUpdating;

  return {
    onSubmit,
    handleKeyDown,
    isPending,
  };
};
