import {
  IngredientRequest,
  IngredientResponse,
} from '@/api/storeId/ingredients/ingredients.type';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';
import { useState } from 'react';

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

  const [ingredient, setIngredient] = useState<IngredientRequest>(() => {
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
      ingredient_cost: 0,
      capacity: 0,
      unit: 'ml',
      shop: '',
      ingredient_detail: '',
    };
  });

  const [costInput, setCostInput] = useState(() => {
    if (isEditMode && initialData) {
      return initialData.ingredient_cost.toString();
    }
    return '';
  });

  const [capacityInput, setCapacityInput] = useState(() => {
    if (isEditMode && initialData) {
      return initialData.capacity.toString();
    }
    return '';
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      ingredient.ingredient_name.trim() === '' ||
      ingredient.ingredient_cost === 0 ||
      ingredient.capacity === 0
    ) {
      showWarnToast('빈칸 없이 모두 입력해주세요.');
      return;
    }

    if (isEditMode && initialData) {
      updateIngredient({
        storeId: storeId,
        ingredientId: initialData.ingredient_id,
        data: {
          ...ingredient,
        },
      });
    } else {
      const addIngredientData: IngredientRequest = {
        ...ingredient,
      };
      addIngredient({ storeId: storeId, data: addIngredientData });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit}>
      <ul className='flex flex-col gap-4'>
        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>품목명</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='text'
            value={ingredient.ingredient_name}
            onChange={(e) =>
              setIngredient({ ...ingredient, ingredient_name: e.target.value })
            }
            placeholder='품목명울 입력해 주세요.'
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
            value={costInput}
            onChange={(e) => {
              const value = e.target.value;
              setCostInput(value);
              setIngredient({
                ...ingredient,
                ingredient_cost: value ? Number(value) : 0,
              });
            }}
            placeholder='구매가를 입력해 주세요.'
            className='input_box [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>용량</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='number'
            value={capacityInput}
            onChange={(e) => {
              const value = e.target.value;
              setCapacityInput(value);
              setIngredient({
                ...ingredient,
                capacity: value ? Number(value) : 0,
              });
            }}
            placeholder='숫자만 입력해 주세요.'
            className='input_box [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
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
                name='ingredientType'
                value='ml'
                checked={ingredient.unit === 'ml'}
                onChange={(e) =>
                  setIngredient({
                    ...ingredient,
                    unit: e.target.value as 'ml' | 'g' | 'ea',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>ml</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='ingredientType'
                value='g'
                checked={ingredient.unit === 'g'}
                onChange={(e) =>
                  setIngredient({
                    ...ingredient,
                    unit: e.target.value as 'ml' | 'g' | 'ea',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>g</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='ingredientType'
                value='ea'
                checked={ingredient.unit === 'ea'}
                onChange={(e) =>
                  setIngredient({
                    ...ingredient,
                    unit: e.target.value as 'ml' | 'g' | 'ea',
                  })
                }
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
            value={ingredient.shop}
            onChange={(e) =>
              setIngredient({ ...ingredient, shop: e.target.value })
            }
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
            value={ingredient.ingredient_detail}
            onChange={(e) =>
              setIngredient({
                ...ingredient,
                ingredient_detail: e.target.value,
              })
            }
            placeholder='비고를 입력해 주세요.'
            className='input_box'
          />
        </li>
      </ul>
    </Modal>
  );
};

export default IngredientsModal;
