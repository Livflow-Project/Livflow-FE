import { AddTransactionParams, DeleteTransactionParams } from './storeId.type';

import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  // 기본 스토어 정보 조회
  getStoreIdAPI: async (id: number) => {
    const response = await axiosInstance.get(`/stores/stores/${id}`);
    return response.data;
  },

  // 스토어 상세 정보(달력 데이터) 조회
  getStoreDetailAPI: async (
    id: number,
    params: { year: number; month: number }
  ) => {
    const response = await axiosInstance.post(
      `/stores/stores/detail/${id}`,
      params
    );
    return response.data;
  },

  addTransactionAPI: async (id: number, data: AddTransactionParams) => {
    const response = await axiosInstance.post(
      `/stores/stores/detail/${id}/transaction`,
      data
    );
    return response.data;
  },

  updateTransactionAPI: async (id: number, data: AddTransactionParams) => {
    const response = await axiosInstance.put(
      `/stores/stores/detail/${id}/transaction`,
      data
    );
    return response.data;
  },

  deleteTransactionAPI: async (id: number, data: DeleteTransactionParams) => {
    const response = await axiosInstance.delete(
      `/stores/stores/detail/${id}/transaction`,
      { data }
    );
    return response.data;
  },
};
