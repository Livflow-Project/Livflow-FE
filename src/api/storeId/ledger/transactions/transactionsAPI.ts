import {
  AddTransactionParams,
  DayParams,
  TransactionRequest,
} from './transactions.type';

import axiosInstance from '@/api/axiosInstance';

export const TransactionsAPI = {
  getAllTransactionsAPI: async (storeId: string, params: DayParams) => {
    const response = await axiosInstance.post(
      `/ledger/${storeId}/transactions?year=${params.year}&month=${params.month}&day=${params.day}`
    );
    return response.data;
  },

  getTransactionAPI: async (storeId: string, transactionId: string) => {
    const response = await axiosInstance.get(
      `/ledger/${storeId}/transactions/${transactionId}`
    );
    return response.data;
  },

  addTransactionAPI: async (storeId: string, data: AddTransactionParams) => {
    const response = await axiosInstance.post(
      `/ledger/${storeId}/transactions`,
      data
    );
    return response.data;
  },

  updateTransactionAPI: async (
    storeId: string,
    transactionId: string,
    data: TransactionRequest
  ) => {
    const response = await axiosInstance.put(
      `/ledger/${storeId}/transactions/${transactionId}`,
      data
    );
    return response.data;
  },

  deleteTransactionAPI: async (storeId: string, transactionId: string) => {
    const response = await axiosInstance.delete(
      `/ledger/${storeId}/transactions/${transactionId}`
    );
    return response.data;
  },
};
