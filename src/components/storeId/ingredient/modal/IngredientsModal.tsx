import {
  IngredientRequest,
  IngredientResponse,
} from '@/api/storeId/ingredients/ingredients.type';
import { SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
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

  const { register, handleSubmit } = useForm<IngredientRequest>({
    defaultValues:
      isEditMode && initialData
        ? {
            ingredient_name: initialData.ingredient_name,
            ingredient_cost: initialData.ingredient_cost,
            capacity: initialData.capacity,
            unit: initialData.unit,
            shop: initialData.shop,
            ingredient_detail: initialData.ingredient_detail,
          }
        : {
            ingredient_name: '',
            ingredient_cost: undefined,
            capacity: undefined,
            unit: 'ml',
            shop: '',
            ingredient_detail: '',
          },
  });

  const getChangedFields = (
    currentData: IngredientRequest,
    initialData: IngredientResponse
  ): Partial<IngredientRequest> => {
    const changedFields: Partial<IngredientRequest> = {};

    if (currentData.ingredient_name !== initialData.ingredient_name) {
      changedFields.ingredient_name = currentData.ingredient_name;
    }
    if (currentData.ingredient_cost !== initialData.ingredient_cost) {
      changedFields.ingredient_cost = currentData.ingredient_cost;
    }
    if (currentData.capacity !== initialData.capacity) {
      changedFields.capacity = currentData.capacity;
    }
    if (currentData.unit !== initialData.unit) {
      changedFields.unit = currentData.unit;
    }
    if (currentData.shop !== initialData.shop) {
      changedFields.shop = currentData.shop;
    }
    if (currentData.ingredient_detail !== initialData.ingredient_detail) {
      changedFields.ingredient_detail = currentData.ingredient_detail;
    }

    return changedFields;
  };

  const onSubmit: SubmitHandler<IngredientRequest> = (data) => {
    if (
      data.ingredient_name.trim() === '' ||
      data.ingredient_cost === 0 ||
      data.capacity === 0
    ) {
      showWarnToast('필수 정보를 모두 입력해주세요.');
      return;
    }

    if (isEditMode && initialData) {
      const changedFields = getChangedFields(data, initialData);

      // 변경된 필드가 없으면 서버에 요청하지 않고 모달만 닫기
      if (Object.keys(changedFields).length === 0) {
        onClose();
        return;
      }

      updateIngredient({
        storeId: storeId,
        ingredientId: initialData.ingredient_id,
        data: changedFields as IngredientRequest,
      });
    } else {
      addIngredient({ storeId: storeId, data });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <ul className='flex flex-col gap-4'>
        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>품목명</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='text'
            {...register('ingredient_name', { required: true })}
            placeholder='품목명을 입력해 주세요.'
            className='input_box'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>구매가</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='number'
            {...register('ingredient_cost', {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            placeholder='구매가를 입력해 주세요.'
            className='input_box number_input'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>용량</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='number'
            {...register('capacity', {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            placeholder='숫자만 입력해 주세요.'
            className='input_box number_input'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <span className='input_label'>단위</span>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <div className='flex h-[42px] w-[60%] items-center justify-around'>
            <label className='flex items-center'>
              <input
                type='radio'
                value='ml'
                {...register('unit')}
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>ml</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                value='g'
                {...register('unit')}
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>g</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                value='ea'
                {...register('unit')}
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>ea</span>
            </label>
          </div>
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>판매처</label>
          </div>
          <input
            type='text'
            {...register('shop')}
            placeholder='판매처를 입력해 주세요.'
            className='input_box'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>비고</label>
          </div>
          <input
            type='text'
            {...register('ingredient_detail')}
            placeholder='비고를 입력해 주세요.'
            className='input_box'
          />
        </li>
      </ul>
    </Modal>
  );
};

export default IngredientsModal;
