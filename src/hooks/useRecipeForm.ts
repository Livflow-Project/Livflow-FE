import { CostCalculatorDetail } from '@/api/storeId/costCalculator/costCalculator.type';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
export type RecipeFormData = {
  recipe_name: string;
  recipe_cost: number | null;
  is_favorites: boolean;
  recipe_img: string | null;
  production_quantity: number | null;
  ingredients_usage: { [key: string]: number };
  total_ingredient_cost: number;
};

export const useRecipeForm = (recipeData?: CostCalculatorDetail) => {
  // 원래 레시피의 재료 사용량 계산
  const originalUsage =
    recipeData?.ingredients?.reduce(
      (acc, ingredient) => {
        acc[ingredient.ingredient_id] = ingredient.required_amount;
        return acc;
      },
      {} as { [key: string]: number }
    ) || {};

  // React Hook Form 설정
  const methods = useForm<RecipeFormData>({
    defaultValues: {
      recipe_name: recipeData?.recipe_name || '',
      recipe_cost: recipeData?.recipe_cost || null,
      is_favorites: recipeData?.is_favorites || false,
      recipe_img: recipeData?.recipe_img?.toString() || null,
      production_quantity: recipeData?.production_quantity || null,
      ingredients_usage: originalUsage,
      total_ingredient_cost: 0,
    },
  });

  const { setValue } = methods;

  // 재료 사용량 업데이트 핸들러
  const handleItemUsageChange = useCallback(
    (itemId: string, amount: number) => {
      setValue(`ingredients_usage.${itemId}`, amount, { shouldDirty: true });
    },
    [setValue]
  );

  // 총 원가 업데이트 핸들러
  const handleTotalCostChange = useCallback(
    (totalCost: number) => {
      setValue('total_ingredient_cost', totalCost);
    },
    [setValue]
  );

  return {
    methods,
    originalUsage,
    handleItemUsageChange,
    handleTotalCostChange,
  };
};
