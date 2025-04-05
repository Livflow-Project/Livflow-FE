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

  const { data: inventoryItems } = useGetInventoryItems(storeId);

  const { validateRecipeForm } = useRecipeValidation(
    inventoryItems,
    originalUsage
  );

  const { createRecipe, isCreating } = useRecipeCreate(storeId);

  const { updateRecipe, isUpdating } = useRecipeUpdate(storeId);

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      if (e.target.type !== 'submit' && e.target.type !== 'button') {
        e.preventDefault();
      }
    }
  };

  const onSubmit = async (data: RecipeFormData, formMethods: any) => {
    formMethods.clearErrors();

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
    } catch (error) {}
  };

  const isPending = isCreating || isUpdating;

  return {
    onSubmit,
    handleKeyDown,
    isPending,
  };
};
