import {
  IngredientRequest,
  IngredientResponse,
} from '@/api/storeId/ingredients/ingredients.type';

import FormField from '@/components/common/FormField';
import Modal from '@/components/common/Modal';
import UnitRadioGroup from '../components/UnitRadioGroup';
import { getChangedFields } from '@/utils/formUtils';
import { showWarnToast } from '@/utils/toast';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';

type IngredientsModalProps = {
  onClose: () => void;
  storeId: string;
  selectedDate?: string | null;
  isEditMode?: boolean;
  initialData?: IngredientResponse;
};

const IngredientsModal = ({
  onClose,
  storeId,
  isEditMode = false,
  initialData,
}: IngredientsModalProps) => {
  const { useAddIngredient, useUpdateIngredient } = useIngredientsQuery();
  const { mutate: addIngredient } = useAddIngredient();
  const { mutate: updateIngredient } = useUpdateIngredient();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<IngredientRequest>({
    defaultValues: getDefaultValues(isEditMode, initialData),
  });

  // 모달이 열릴 때 품목명 필드에 포커스
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('ingredient_name');
    }, 100);

    return () => clearTimeout(timer);
  }, [setFocus]);

  const onSubmit = (data: IngredientRequest) => {
    if (!data.ingredient_name.trim()) {
      setError('ingredient_name', {
        type: 'required',
        message: '품목명을 입력해주세요.',
      });
      showWarnToast('품목명을 입력해주세요.');

      setTimeout(() => {
        setFocus('ingredient_name');
      }, 100);
      return;
    }

    if (!data.ingredient_cost || data.ingredient_cost < 0) {
      setError('ingredient_cost', {
        type: 'required',
        message: '구매가를 입력해주세요.',
      });
      showWarnToast('구매가를 입력해주세요.');

      setTimeout(() => {
        setFocus('ingredient_cost');
      }, 100);
      return;
    }

    if (!data.capacity || data.capacity <= 0) {
      setError('capacity', {
        type: 'required',
        message: '용량을 입력해주세요.',
      });
      showWarnToast('용량을 입력해주세요.');

      setTimeout(() => {
        setFocus('capacity');
      }, 100);
      return;
    }

    if (isEditMode && initialData) {
      handleUpdateIngredient(data, initialData);
    } else {
      handleAddIngredient(data);
    }

    reset();
    onClose();
  };

  const handleAddIngredient = (data: IngredientRequest) => {
    addIngredient({ storeId, data });
  };

  const handleUpdateIngredient = (
    data: IngredientRequest,
    initialData: IngredientResponse
  ) => {
    const changedFields = getChangedFields(data, initialData);

    // 변경된 필드가 없으면 서버에 요청하지 않고 모달만 닫기
    if (Object.keys(changedFields).length === 0) {
      return;
    }

    updateIngredient({
      storeId,
      ingredientId: initialData.ingredient_id,
      data: changedFields as IngredientRequest,
    });
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label='품목명'
        required
        register={register('ingredient_name')}
        placeholder='품목명을 입력해 주세요.'
        className={errors.ingredient_name && 'error-input'}
      />

      <FormField
        label='구매가'
        required
        type='number'
        register={register('ingredient_cost', {
          valueAsNumber: true,
          min: 0,
        })}
        placeholder='구매가를 입력해 주세요.'
        className={twMerge(
          'number_input',
          errors.ingredient_cost && 'error-input'
        )}
      />

      <FormField
        label='용량'
        required
        type='number'
        register={register('capacity', {
          valueAsNumber: true,
          min: 0,
        })}
        placeholder='숫자만 입력해 주세요.'
        className={twMerge('number_input', errors.capacity && 'error-input')}
      />

      <UnitRadioGroup register={register} />

      <FormField
        label='판매처'
        register={register('shop')}
        placeholder='판매처를 입력해 주세요.'
      />

      <FormField
        label='비고'
        register={register('ingredient_detail')}
        placeholder='비고를 입력해 주세요.'
      />
    </Modal>
  );
};

// 폼 기본값 설정
const getDefaultValues = (
  isEditMode: boolean,
  initialData?: IngredientResponse
): Partial<IngredientRequest> => {
  if (isEditMode && initialData) {
    return {
      ingredient_name: initialData.ingredient_name,
      ingredient_cost: initialData.ingredient_cost,
      capacity: initialData.capacity,
      unit: initialData.unit,
      shop: initialData.shop,
      ingredient_detail: initialData.ingredient_detail,
    };
  }

  return {
    ingredient_name: '',
    ingredient_cost: undefined,
    capacity: undefined,
    unit: 'ml',
    shop: '',
    ingredient_detail: '',
  };
};

export default IngredientsModal;
