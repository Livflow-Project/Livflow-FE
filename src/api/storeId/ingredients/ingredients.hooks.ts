import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IngredientsAPI } from './ingredientsAPI';
import { IngredientsRequest } from './ingredients.type';

export const useIngredientsQuery = () => {
  const queryClient = useQueryClient();

  // 모든 재료 조회
  const useGetAllIngredients = (storeId: string) => {
    return useQuery({
      queryKey: ['store', storeId],
      queryFn: () => IngredientsAPI.getAllIngredientsAPI(storeId),
    });
  };

  const useGetIngredient = (storeId: string, ingredientsId: string) => {
    return useQuery({
      queryKey: ['store', storeId, 'ingredient', ingredientsId],
      queryFn: () => IngredientsAPI.getIngredientAPI(storeId, ingredientsId),
    });
  };

  const useAddIngredient = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        data,
      }: {
        storeId: string;
        data: IngredientsRequest;
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
        ingredientsId,
        data,
      }: {
        storeId: string;
        ingredientsId: string;
        data: IngredientsRequest;
      }) => IngredientsAPI.updateIngredientAPI(storeId, ingredientsId, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId, 'ingredient'],
        });
      },
    });
  };

  const useDeleteIngredient = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        ingredientsId,
      }: {
        storeId: string;
        ingredientsId: string;
      }) => IngredientsAPI.deleteIngredientAPI(storeId, ingredientsId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId, 'ingredient'],
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
