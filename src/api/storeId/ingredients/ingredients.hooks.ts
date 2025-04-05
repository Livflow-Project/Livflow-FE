import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IngredientRequest } from './ingredients.type';
import { IngredientsAPI } from './ingredientsAPI';

export const useIngredientsQuery = () => {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });
        showSuccessToast('재료가 추가 되었습니다');
      },
      onError: (error) => {
        console.error('재료 추가 실패:', error);
        showErrorToast('재료 추가에 실패했습니다.');
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
        showSuccessToast('재료가 수정 되었습니다');
      },
      onError: (error) => {
        console.error('재료 수정 실패:', error);
        showErrorToast('재료 수정에 실패했습니다.');
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
        showSuccessToast('재료가 삭제 되었습니다');
      },
      onError: (error) => {
        console.error('재료 삭제 실패:', error);
        showErrorToast('재료 삭제에 실패했습니다.');
      },
    });
  };

  const useGetIngredientUsages = (storeId: string, ingredientId: string) => {
    return useQuery({
      queryKey: ['store', storeId, 'ingredient', ingredientId, 'usages'],
      queryFn: () =>
        IngredientsAPI.getIngredientUsagesAPI(storeId, ingredientId),
    });
  };

  return {
    useGetAllIngredients,
    useGetIngredient,
    useAddIngredient,
    useUpdateIngredient,
    useDeleteIngredient,
    useGetIngredientUsages,
  };
};
