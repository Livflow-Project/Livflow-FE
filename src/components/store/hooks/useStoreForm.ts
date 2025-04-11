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
  const {
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<StoreFormData>({
    defaultValues: {
      name: storeInfo.name,
      address: storeInfo.address || '',
    },
  });

  const name = watch('name');
  const address = watch('address');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const { useUpdateStore } = useStoreQuery();
  const updateStoreMutation = useUpdateStore();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleEditButtonClick = (type: 'name' | 'address') => {
    if (type === 'name') {
      setIsEditingName(true);
      requestAnimationFrame(() => nameInputRef.current?.focus());
    } else if (type === 'address') {
      setIsEditingAddress(true);
      requestAnimationFrame(() => addressInputRef.current?.focus());
    }
  };

  const handleChange = (value: string, field: keyof StoreFormData) => {
    setValue(field, value, { shouldDirty: true });

    if (field === 'name' && value.trim()) {
      clearErrors('name');
    }
  };

  const handleUpdate = (type: 'name' | 'address') => {
    if (type === 'name') {
      if (!name.trim()) {
        showWarnToast('스토어 이름은 필수 입니다.');
        setError('name', {
          type: 'required',
          message: '스토어 이름은 필수 입니다.',
        });
        return;
      }

      if (name === storeInfo.name) {
        setIsEditingName(false);
        return;
      }
    } else if (type === 'address') {
      if (address === storeInfo.address) {
        setIsEditingAddress(false);
        return;
      }
    }

    const formData = { name, address };

    const initialData = {
      name: storeInfo.name,
      address: storeInfo.address || '',
    };

    const changedFields = getChangedFields(formData, initialData);

    if (Object.keys(changedFields).length === 0) {
      if (type === 'name') setIsEditingName(false);
      if (type === 'address') setIsEditingAddress(false);
      return;
    }

    const updates: StoreRequestParams = {
      name: type === 'name' ? name : storeInfo.name,
      address: type === 'address' ? address : storeInfo.address,
    };

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
    nameError: !!errors.name,
    handleEditButtonClick,
    handleChange,
    handleUpdate,
    handleKeyDown,
  };
};
