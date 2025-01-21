import {
  AddTransactionParams,
  DayParams,
  TransactionRequest,
} from './storeId.type';

import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  // 기본 스토어 정보 조회
  getStoreIdAPI: async (id: string) => {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  },

  // 스토어 상세 정보(달력 데이터) 조회
  getStoreCalendarAPI: async (id: string, params: DayParams) => {
    const response = await axiosInstance.get(
      `/stores/${id}/calendar?year=${params.year}&month=${params.month}`
    );
    return response.data;
  },

  addTransactionAPI: async (id: string, data: AddTransactionParams) => {
    const response = await axiosInstance.post(
      `/stores/${id}/transactions`,
      data
    );
    return response.data;
  },

  getTransactionAPI: async (id: string, transactionId: string) => {
    const response = await axiosInstance.get(
      `/stores/${id}/transactions/${transactionId}`
    );
    return response.data;
  },

  updateTransactionAPI: async (
    id: string,
    transactionId: string,
    data: TransactionRequest
  ) => {
    const response = await axiosInstance.put(
      `/stores/${id}/transactions/${transactionId}`,
      data
    );
    return response.data;
  },

  deleteTransactionAPI: async (id: string, transactionId: string) => {
    const response = await axiosInstance.delete(
      `/stores/${id}/transactions/${transactionId}`
    );
    return response.data;
  },
};
