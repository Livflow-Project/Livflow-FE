import {
  createRecipeAPI,
  deleteRecipeAPI,
  getAllRecipesAPI,
  getRecipeAPI,
  updateRecipeAPI,
} from './costCalculatorAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CostCalculatorRequest } from './costCalculator.type';
import { showErrorToast } from '@/utils/toast';
import { toast } from 'react-toastify';

const RECIPES_QUERY_KEY = 'recipes';
const RECIPE_DETAIL_QUERY_KEY = 'recipeDetail';

export const useGetAllRecipes = (storeId: string) => {
  return useQuery({
    queryKey: [RECIPES_QUERY_KEY, storeId],
    queryFn: () => getAllRecipesAPI(storeId),
  });
};

export const useGetRecipe = (storeId: string, recipeId: string) => {
  return useQuery({
    queryKey: [RECIPE_DETAIL_QUERY_KEY, storeId, recipeId],
    queryFn: () => getRecipeAPI(storeId, recipeId),

    enabled: !!recipeId,
  });
};

export const useCreateRecipeMutation = (storeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CostCalculatorRequest) => createRecipeAPI(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RECIPES_QUERY_KEY, storeId],
      });
      toast.success('메뉴가 추가 되었습니다');
    },
    onError: (error) => {
      console.error('메뉴 추가 실패:', error);
      showErrorToast('메뉴 추가에 실패했습니다.');
    },
  });
};

export const useUpdateRecipeMutation = (storeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recipeId,
      data,
    }: {
      recipeId: string;
      data: CostCalculatorRequest;
    }) => updateRecipeAPI(storeId, recipeId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [RECIPES_QUERY_KEY, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [RECIPE_DETAIL_QUERY_KEY, storeId, variables.recipeId],
      });
      toast.success('메뉴가 수정 되었습니다');
    },
    onError: (error) => {
      console.error('메뉴 수정 실패:', error);
      showErrorToast('메뉴 수정에 실패했습니다.');
    },
  });
};

export const useDeleteRecipeMutation = (storeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => deleteRecipeAPI(storeId, recipeId),
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({
        queryKey: [RECIPES_QUERY_KEY, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [RECIPE_DETAIL_QUERY_KEY, storeId, recipeId],
      });
      toast.success('메뉴가 삭제 되었습니다');
    },
    onError: (error) => {
      console.error('메뉴 삭제 실패:', error);
      showErrorToast('메뉴 삭제에 실패했습니다.');
    },
  });
};
