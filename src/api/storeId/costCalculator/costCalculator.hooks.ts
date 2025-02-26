import {
  createRecipeAPI,
  deleteRecipeAPI,
  getAllRecipesAPI,
  getRecipeAPI,
  updateRecipeAPI,
} from './costCalculatorAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CostCalculatorRequest } from './costCalculator.type';

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
    },
  });
};
