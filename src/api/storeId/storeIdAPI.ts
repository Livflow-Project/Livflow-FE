import axiosInstance from '../axiosInstance';

export const storeIdAPI = {
  getStoreIdAPI: async (id: number) => {
    const response = await axiosInstance.get(`/stores/stores/${id}`);
    return response.data;
  },
};
