import { StoreDetailParams } from './storeId.type';
import { storeIdAPI } from './storeIdAPI';
import { useQuery } from '@tanstack/react-query';

export const useStoreIdQuery = () => {
  // 기본 스토어 정보 조회
  const useGetStore = (id: number) => {
    return useQuery({
      queryKey: ['store', id],
      queryFn: () => storeIdAPI.getStoreIdAPI(id),
    });
  };

  // 스토어 상세 정보(달력 데이터) 조회
  const useGetStoreDetail = (id: number, params: StoreDetailParams) => {
    return useQuery({
      queryKey: ['store', id, 'detail', params.year, params.month],
      queryFn: () => storeIdAPI.getStoreDetailAPI(id, params),
    });
  };

  return {
    useGetStore,
    useGetStoreDetail,
  };
};
