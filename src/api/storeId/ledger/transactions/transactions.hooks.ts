import {
  AddTransactionParams,
  DayParams,
  TransactionResponse,
} from './transactions.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TransactionsAPI } from './transactionsAPI';

export const useTransactionsQuery = () => {
  const queryClient = useQueryClient();

  const useGetAllTransactions = (storeId: string, params: DayParams) => {
    return useQuery({
      queryKey: [
        'store',
        storeId,
        'detail',
        params.year,
        params.month,
        params.day,
      ],
      queryFn: () => TransactionsAPI.getAllTransactionsAPI(storeId, params),
    });
  };

  const useGetTransaction = (storeId: string, transactionId: string) => {
    return useQuery({
      queryKey: ['store', storeId, 'transaction', transactionId],
      queryFn: () => TransactionsAPI.getTransactionAPI(storeId, transactionId),
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
      }) => TransactionsAPI.addTransactionAPI(storeId, data),
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

  const useUpdateTransaction = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        transactionId,
        data,
      }: {
        storeId: string;
        transactionId: string;
        data: TransactionResponse;
      }) => TransactionsAPI.updateTransactionAPI(storeId, transactionId, data),
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
      }) => TransactionsAPI.deleteTransactionAPI(storeId, transactionId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId, 'detail'],
        });
      },
    });
  };

  return {
    useGetAllTransactions,
    useGetTransaction,
    useAddTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
  };
};
