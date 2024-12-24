import { storeIdAPI } from './storeIdAPI';
import { useQuery } from '@tanstack/react-query';

export const useStoreIdQuery = () => {
  // 특정 스토어 조회
  const useGetStore = (id: number) => {
    return useQuery({
      queryKey: ['store', id],
      queryFn: () => storeIdAPI.getStoreIdAPI(id),
    });
  };

  return {
    useGetStore,
  };
};
