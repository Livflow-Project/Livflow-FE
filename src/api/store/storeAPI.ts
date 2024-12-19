import axiosInstance from '../axiosInstance';

export const storeAPI = {
  getAllStoresAPI: async () => {
    const response = await axiosInstance.get(`/stores/stores`);
    return response.data;
  },

  getStoreAPI: async (id: number) => {
    const response = await axiosInstance.get(`/stores/stores/${id}`);
    return response.data;
  },

  postStoreAPI: async (NewstoreInfo: StoreRequestParams) => {
    const response = await axiosInstance.post(`/stores/stores`, NewstoreInfo);
    return response.data;
  },

  putStoreAPI: async (id: number, storeInfo: StoreRequestParams) => {
    const response = await axiosInstance.put(`/stores/stores/${id}`, storeInfo);
    return response.data;
  },

  deleteStoreAPI: async (id: number) => {
    const response = await axiosInstance.delete(`/stores/stores/${id}`);
    return response.data;
  },
};
