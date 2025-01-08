import { AddTransactionParams, UpdateTransactionParams } from './storeId.type';

import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  // 기본 스토어 정보 조회
  getStoreIdAPI: async (id: string) => {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  },

  // 스토어 상세 정보(달력 데이터) 조회
  getStoreDetailAPI: async (
    id: string,
    params: { year: number; month: number }
  ) => {
    const response = await axiosInstance.post(`/stores/detail/${id}`, params);
    return response.data;
  },

  addTransactionAPI: async (id: string, data: AddTransactionParams) => {
    const response = await axiosInstance.post(
      `/stores/${id}/transaction`,
      data
    );
    return response.data;
  },

  updateTransactionAPI: async (id: string, data: UpdateTransactionParams) => {
    const response = await axiosInstance.put(`/stores/${id}/transaction`, data);
    return response.data;
  },

  deleteTransactionAPI: async (id: string, transaction_id: string) => {
    const response = await axiosInstance.delete(`/stores/${id}/transaction`, {
      data: { transaction_id },
    });
    return response.data;
  },
};
