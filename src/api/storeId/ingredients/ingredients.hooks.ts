import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IngredientRequest } from './ingredients.type';
import { IngredientsAPI } from './ingredientsAPI';

export const useIngredientsQuery = () => {
  const queryClient = useQueryClient();

  // 모든 재료 조회
  const useGetAllIngredients = (storeId: string) => {
    return useQuery({
      queryKey: ['store', storeId],
      queryFn: () => IngredientsAPI.getAllIngredientsAPI(storeId),
    });
  };

  const useGetIngredient = (storeId: string, ingredientId: string) => {
    return useQuery({
      queryKey: ['store', storeId, 'ingredient', ingredientId],
      queryFn: () => IngredientsAPI.getIngredientAPI(storeId, ingredientId),
    });
  };

  const useAddIngredient = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        data,
      }: {
        storeId: string;
        data: IngredientRequest;
      }) => IngredientsAPI.addIngredientAPI(storeId, data),
      onSuccess: (_, variables) => {
        // 성공 시 해당 월의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });
      },
    });
  };

  const useUpdateIngredient = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        ingredientId,
        data,
      }: {
        storeId: string;
        ingredientId: string;
        data: IngredientRequest;
      }) => IngredientsAPI.updateIngredientAPI(storeId, ingredientId, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });
      },
    });
  };

  const useDeleteIngredient = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        ingredientId,
      }: {
        storeId: string;
        ingredientId: string;
      }) => IngredientsAPI.deleteIngredientAPI(storeId, ingredientId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });
      },
    });
  };

  return {
    useGetAllIngredients,
    useGetIngredient,
    useAddIngredient,
    useUpdateIngredient,
    useDeleteIngredient,
  };
};
