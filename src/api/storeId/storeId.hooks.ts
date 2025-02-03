import {
  AddTransactionParams,
  DayDetailTransaction,
  DayParams,
} from './storeId.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { storeIdAPI } from './storeIdAPI';

export const useStoreIdQuery = () => {
  const queryClient = useQueryClient();

  // 스토어 상세 정보(달력 데이터) 조회
  const useGetStoreCalendar = (storeId: string, params: DayParams) => {
    return useQuery({
      queryKey: ['store', storeId, 'detail', params.year, params.month],
      queryFn: () => storeIdAPI.getStoreCalendarAPI(storeId, params),
    });
  };

  const useAddTransaction = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        data,
      }: {
        storeId: string;
        data: AddTransactionParams;
      }) => storeIdAPI.addTransactionAPI(storeId, data),
      onSuccess: (_, variables) => {
        // 성공 시 해당 월의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: [
            'store',
            variables.storeId,
            'detail',
            variables.data.date.year,
            variables.data.date.month,
          ],
        });
      },
    });
  };

  const useGetTransaction = (storeId: string, transactionId: string) => {
    return useQuery({
      queryKey: ['store', storeId, 'transaction', transactionId],
      queryFn: () => storeIdAPI.getTransactionAPI(storeId, transactionId),
    });
  };

  const useUpdateTransaction = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        transactionId,
        data,
      }: {
        storeId: string;
        transactionId: string;
        data: DayDetailTransaction;
      }) => storeIdAPI.updateTransactionAPI(storeId, transactionId, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId, 'detail'],
        });
      },
    });
  };

  const useDeleteTransaction = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        transactionId,
      }: {
        storeId: string;
        transactionId: string;
      }) => storeIdAPI.deleteTransactionAPI(storeId, transactionId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId, 'detail'],
        });
      },
    });
  };

  return {
    useGetStoreCalendar,
    useAddTransaction,
    useGetTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
  };
};
