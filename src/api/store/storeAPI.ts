import { StoreRequestParams } from './store.type';
import axiosInstance from '../axiosInstance';

export const storeAPI = {
  getAllStoresAPI: async () => {
    const response = await axiosInstance.get(`/stores`);
    return response.data;
  },

  postStoreAPI: async (NewstoreInfo: StoreRequestParams) => {
    const response = await axiosInstance.post(`/stores`, NewstoreInfo);
    return response.data;
  },

  putStoreAPI: async (id: string, storeInfo: StoreRequestParams) => {
    const response = await axiosInstance.put(`/stores/${id}`, storeInfo);
    return response.data;
  },

  deleteStoreAPI: async (id: string) => {
    const response = await axiosInstance.delete(`/stores/${id}`);
    return response.data;
  },
};
