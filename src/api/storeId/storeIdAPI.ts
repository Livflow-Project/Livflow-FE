import {
  AddTransactionParams,
  DayParams,
  TransactionRequest,
} from './storeId.type';

import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  // 스토어 상세 정보(달력 데이터) 조회
  getStoreCalendarAPI: async (id: string, params: DayParams) => {
    const response = await axiosInstance.get(
      `/stores/${id}/calendar?year=${params.year}&month=${params.month}`
    );
    return response.data;
  },

  addTransactionAPI: async (id: string, data: AddTransactionParams) => {
    const response = await axiosInstance.post(
      `/ledger/${id}/transactions`,
      data
    );
    return response.data;
  },

  getTransactionAPI: async (id: string, transactionId: string) => {
    const response = await axiosInstance.get(
      `/ledger/${id}/transactions/${transactionId}`
    );
    return response.data;
  },

  updateTransactionAPI: async (
    id: string,
    transactionId: string,
    data: TransactionRequest
  ) => {
    const response = await axiosInstance.put(
      `/ledger/${id}/transactions/${transactionId}`,
      data
    );
    return response.data;
  },

  deleteTransactionAPI: async (id: string, transactionId: string) => {
    const response = await axiosInstance.delete(
      `/ledger/${id}/transactions/${transactionId}`
    );
    return response.data;
  },
};
