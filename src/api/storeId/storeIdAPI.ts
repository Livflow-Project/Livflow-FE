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
};
