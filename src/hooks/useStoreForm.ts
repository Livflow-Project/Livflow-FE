import {
  StoreDetailResponse,
  StoreRequestParams,
} from '@/api/store/store.type';
import { useRef, useState } from 'react';

import { getChangedFields } from '@/utils/formUtils';
import { showWarnToast } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import { useStoreQuery } from '@/api/store/store.hooks';

type StoreFormData = {
  name: string;
  address: string;
};

export const useStoreForm = (storeInfo: StoreDetailResponse) => {
  // React Hook Form 설정
  const { watch, setValue } = useForm<StoreFormData>({
    defaultValues: {
      name: storeInfo.name,
      address: storeInfo.address || '',
    },
  });

  // 현재 폼 값 가져오기
  const name = watch('name');
  const address = watch('address');

  // 편집 상태 관리
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // React Query 훅 사용
  const { useUpdateStore } = useStoreQuery();
  const updateStoreMutation = useUpdateStore();

  // 입력 필드 참조
  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  /**
   * 편집 버튼 클릭 핸들러
   */
  const handleEditButtonClick = (type: 'name' | 'address') => {
    if (type === 'name') {
      setIsEditingName(true);
      requestAnimationFrame(() => nameInputRef.current?.focus());
    } else if (type === 'address') {
      setIsEditingAddress(true);
      requestAnimationFrame(() => addressInputRef.current?.focus());
    }
  };

  /**
   * 폼 값 변경 핸들러
   */
  const handleChange = (value: string, field: keyof StoreFormData) => {
    setValue(field, value, { shouldDirty: true });
  };

  /**
   * 스토어 정보 업데이트 핸들러
   */
  const handleUpdate = (type: 'name' | 'address') => {
    // 이름 필드 유효성 검사
    if (type === 'name') {
      if (!name.trim()) {
        showWarnToast('스토어 이름은 필수 입력 요소입니다.');
        return;
      }

      // 변경사항이 없으면 편집 모드만 종료
      if (name === storeInfo.name) {
        setIsEditingName(false);
        return;
      }
    } else if (type === 'address') {
      // 변경사항이 없으면 편집 모드만 종료
      if (address === storeInfo.address) {
        setIsEditingAddress(false);
        return;
      }
    }

    // 현재 폼 데이터
    const formData = { name, address };

    // 초기 데이터
    const initialData = {
      name: storeInfo.name,
      address: storeInfo.address || '',
    };

    // 변경된 필드만 추출
    const changedFields = getChangedFields(formData, initialData);

    // 변경된 필드가 없으면 편집 모드만 종료
    if (Object.keys(changedFields).length === 0) {
      if (type === 'name') setIsEditingName(false);
      if (type === 'address') setIsEditingAddress(false);
      return;
    }

    // 업데이트할 데이터 준비
    const updates: StoreRequestParams = {
      name: type === 'name' ? name : storeInfo.name,
      address: type === 'address' ? address : storeInfo.address,
    };

    // 서버에 업데이트 요청
    updateStoreMutation.mutate(
      {
        storeId: storeInfo.store_id,
        storeInfo: updates,
        updateType: type,
      },
      {
        onSuccess: () => {
          if (type === 'name') setIsEditingName(false);
          if (type === 'address') setIsEditingAddress(false);
        },
      }
    );
  };

  /**
   * 키 입력 이벤트 핸들러
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'name' | 'address'
  ) => {
    if (e.key === 'Enter') {
      handleUpdate(type);
    }
  };

  return {
    name,
    address,
    isEditingName,
    isEditingAddress,
    nameInputRef,
    addressInputRef,
    handleEditButtonClick,
    handleChange,
    handleUpdate,
    handleKeyDown,
  };
};
