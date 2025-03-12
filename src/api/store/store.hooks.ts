import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { storeAPI } from './storeAPI';

type StoreRequestParams = {
  name: string;
  address?: string;
};

export const useStoreQuery = () => {
  const queryClient = useQueryClient();

  // 모든 스토어 조회
  const useGetAllStores = () => {
    return useQuery({
      queryKey: ['stores'],
      queryFn: storeAPI.getAllStoresAPI,
    });
  };

  // 특정 스토어 정보 조회
  const useGetStore = (
    storeId: string,
    options?: {
      enabled?: boolean;
    }
  ) => {
    return useQuery({
      queryKey: ['store', storeId],
      queryFn: () => storeAPI.getStoreAPI(storeId),
      ...options,
    });
  };

  // 새 스토어 생성
  const useCreateStore = () => {
    return useMutation({
      mutationFn: (newStoreData: StoreRequestParams) =>
        storeAPI.postStoreAPI(newStoreData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
      },
    });
  };

  // 스토어 수정
  const useUpdateStore = () => {
    return useMutation({
      mutationFn: ({
        storeId,
        storeInfo,
      }: {
        storeId: string;
        storeInfo: StoreRequestParams;
      }) => storeAPI.putStoreAPI(storeId, storeInfo),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });
      },
    });
  };

  // 스토어 삭제
  const useDeleteStore = () => {
    return useMutation({
      mutationFn: (storeId: string) => storeAPI.deleteStoreAPI(storeId),
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
