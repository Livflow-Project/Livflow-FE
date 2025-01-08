import {
  AddTransactionParams,
  DeleteTransactionParams,
  StoreDetailParams,
} from './storeId.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { storeIdAPI } from './storeIdAPI';

export const useStoreIdQuery = () => {
  const queryClient = useQueryClient();

  // 기본 스토어 정보 조회
  const useGetStore = (id: string) => {
    return useQuery({
      queryKey: ['store', id],
      queryFn: () => storeIdAPI.getStoreIdAPI(id),
    });
  };

  // 스토어 상세 정보(달력 데이터) 조회
  const useGetStoreDetail = (id: string, params: StoreDetailParams) => {
    return useQuery({
      queryKey: ['store', id, 'detail', params.year, params.month],
      queryFn: () => storeIdAPI.getStoreDetailAPI(id, params),
    });
  };

  const useAddTransaction = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: AddTransactionParams }) =>
        storeIdAPI.addTransactionAPI(id, data),
      onSuccess: (_, variables) => {
        // 성공 시 해당 월의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: [
            'store',
            variables.id,
            'detail',
            variables.data.year,
            variables.data.month,
          ],
        });
      },
    });
  };

  const useUpdateTransaction = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: AddTransactionParams }) =>
        storeIdAPI.updateTransactionAPI(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [
            'store',
            variables.id,
            'detail',
            variables.data.year,
            variables.data.month,
          ],
        });
      },
    });
  };

  const useDeleteTransaction = () => {
    return useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: DeleteTransactionParams;
      }) => storeIdAPI.deleteTransactionAPI(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [
            'store',
            variables.id,
            'detail',
            variables.data.year,
            variables.data.month,
          ],
        });
      },
    });
  };

  return {
    useGetStore,
    useGetStoreDetail,
    useAddTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
  };
};
