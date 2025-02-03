import {
  AddTransactionParams,
  DayParams,
  TransactionRequest,
} from './storeId.type';

import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  // 스토어 상세 정보(달력 데이터) 조회
  getStoreCalendarAPI: async (storeId: string, params: DayParams) => {
    const response = await axiosInstance.get(
      `/stores/${storeId}/calendar?year=${params.year}&month=${params.month}`
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

  getTransactionAPI: async (storeId: string, transactionId: string) => {
    const response = await axiosInstance.get(
      `/ledger/${storeId}/transactions/${transactionId}`
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
