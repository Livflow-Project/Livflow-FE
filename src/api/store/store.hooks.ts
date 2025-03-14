import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { storeAPI } from './storeAPI';
import { toast } from 'react-toastify';

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
        showSuccessToast('스토어가 생성 되었습니다');
      },
      onError: (error) => {
        console.error('스토어 생성 실패:', error);
        showErrorToast('스토어 생성에 실패했습니다.');
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
        updateType: 'name' | 'address';
      }) => storeAPI.putStoreAPI(storeId, storeInfo),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
        queryClient.invalidateQueries({
          queryKey: ['store', variables.storeId],
        });

        const message =
          variables.updateType === 'name'
            ? '스토어 이름이 수정 되었습니다'
            : '스토어 주소가 수정 되었습니다';

        // 이미 표시 중인 성공 토스트가 있으면 업데이트, 없으면 새로 생성
        if (toast.isActive(`store-update-${variables.updateType}`)) {
          toast.update(`store-update-${variables.updateType}`, {
            render: message,
            autoClose: 3000,
          });
        } else {
          showSuccessToast(message, {
            toastId: `store-update-${variables.updateType}`,
          });
        }
      },
      onError: (error, variables) => {
        console.error('스토어 정보 수정 실패:', error);

        const errorMessage =
          variables.updateType === 'name'
            ? '스토어 이름 수정에 실패했습니다'
            : '스토어 주소 수정에 실패했습니다';

        // 이미 표시 중인 에러 토스트가 있으면 업데이트, 없으면 새로 생성
        if (toast.isActive(`store-update-error-${variables.updateType}`)) {
          toast.update(`store-update-error-${variables.updateType}`, {
            render: errorMessage,
            autoClose: 3000,
          });
        } else {
          showErrorToast(errorMessage, {
            toastId: `store-update-error-${variables.updateType}`,
          });
        }
      },
    });
  };

  // 스토어 삭제
  const useDeleteStore = () => {
    return useMutation({
      mutationFn: (storeId: string) => storeAPI.deleteStoreAPI(storeId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
        showSuccessToast('스토어가 삭제 되었습니다');
      },
      onError: (error) => {
        console.error('스토어 삭제 실패:', error);
        showErrorToast('스토어 삭제에 실패했습니다.');
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
