import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { storeAPI } from './storeAPI';

interface StoreRequestParams {
  name: string;
  address?: string;
}

export const useStoreQuery = () => {
  const queryClient = useQueryClient();

  // 모든 스토어 조회
  const useGetAllStores = () => {
    return useQuery({
      queryKey: ['stores'],
      queryFn: storeAPI.getAllStoresAPI,
    });
  };

  // 특정 스토어 조회
  const useGetStore = (id: string) => {
    return useQuery({
      queryKey: ['store', id],
      queryFn: () => storeAPI.getStoreAPI(id),
    });
  };

  // 새 스토어 생성
  const useCreateStore = () => {
    return useMutation({
      mutationFn: (newStore: StoreRequestParams) =>
        storeAPI.postStoreAPI(newStore),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
      },
    });
  };

  // 스토어 수정
  const useUpdateStore = () => {
    return useMutation({
      mutationFn: ({
        id,
        storeInfo,
      }: {
        id: number;
        storeInfo: StoreRequestParams;
      }) => storeAPI.putStoreAPI(id, storeInfo),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
        queryClient.invalidateQueries({
          queryKey: ['store', variables.id.toString()],
        });
      },
    });
  };

  // 스토어 삭제
  const useDeleteStore = () => {
    return useMutation({
      mutationFn: (id: number) => storeAPI.deleteStoreAPI(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
      },
    });
  };

  return {
    useGetAllStores,
    useGetStore,
    useCreateStore,
    useUpdateStore,
    useDeleteStore,
  };
};
