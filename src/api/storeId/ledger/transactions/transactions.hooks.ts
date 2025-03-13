import {
  AddTransactionParams,
  DayParams,
  TransactionResponse,
} from './transactions.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TransactionsAPI } from './transactionsAPI';
import { showErrorToast } from '@/utils/toast';
import { toast } from 'react-toastify';

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
        toast.success('수입 / 지출이 추가 되었습니다');
      },
      onError: (error) => {
        console.error('수입 / 지출 저장 실패:', error);
        showErrorToast('수입 / 지출 저장에 실패했습니다.');
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
        toast.success('수입 / 지출이 수정 되었습니다');
      },
      onError: (error) => {
        console.error('수입 / 지출 수정 실패:', error);
        showErrorToast('수입 / 지출 수정에 실패했습니다.');
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
        toast.success('수입 / 지출이 삭제 되었습니다');
      },
      onError: (error) => {
        console.error('수입 / 지출 삭제 실패:', error);
        showErrorToast('수입 / 지출 삭제에 실패했습니다.');
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
