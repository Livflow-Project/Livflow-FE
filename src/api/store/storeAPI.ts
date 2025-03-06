import { StoreRequestParams } from './store.type';
import axiosInstance from '../axiosInstance';

export const storeAPI = {
  getAllStoresAPI: async () => {
    const response = await axiosInstance.get(`/stores/`);
    return response.data;
  },

  getStoreAPI: async (storeId: string) => {
    const response = await axiosInstance.get(`/stores/${storeId}/`);
    return response.data;
  },

  postStoreAPI: async (NewStoreData: StoreRequestParams) => {
    const response = await axiosInstance.post(`/stores/`, NewStoreData);
    return response.data;
  },

  putStoreAPI: async (storeId: string, storeInfo: StoreRequestParams) => {
    const response = await axiosInstance.put(`/stores/${storeId}/`, storeInfo);
    return response.data;
  },

  deleteStoreAPI: async (storeId: string) => {
    const response = await axiosInstance.delete(`/stores/${storeId}/`);
    return response.data;
  },
};
