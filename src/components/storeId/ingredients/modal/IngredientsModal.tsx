import {
  DayDetailTransaction,
  TransactionRequest,
} from '@/api/storeId/storeId.type';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useState } from 'react';

type IngredientsModalProps = {
  onClose: () => void;
  storeId?: string;
  selectedDate?: string | null;
  isEditMode?: boolean;
  initialData?: DayDetailTransaction;
};

const IngredientsModal = ({
  onClose,
  isEditMode = false,
  initialData,
}: IngredientsModalProps) => {
  const [transaction, setTransaction] = useState<TransactionRequest>(() => {
    if (isEditMode && initialData) {
      return {
        type: initialData.type,
        category: initialData.category,
        detail: initialData.detail,
        cost: initialData.cost,
      };
    }
    return {
      type: 'expense',
      category: '',
      detail: '',
      cost: 0,
    };
  });

  const [costInput, setCostInput] = useState(() => {
    if (isEditMode && initialData) {
      return initialData.cost.toString();
    }
    return '';
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !transaction.category ||
      transaction.cost === 0 ||
      transaction.detail.trim() === ''
    ) {
      showWarnToast('빈칸 없이 모두 입력해주세요.');
      return;
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
            value={transaction.detail}
            onChange={(e) =>
              setTransaction({ ...transaction, detail: e.target.value })
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
            type='text'
            value={transaction.detail}
            onChange={(e) =>
              setTransaction({ ...transaction, detail: e.target.value })
            }
            placeholder='구매가를 입력해 주세요.'
            className='input_box'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>용량</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <input
            type='number'
            value={costInput}
            onChange={(e) => {
              const value = e.target.value;
              setCostInput(value);
              setTransaction({
                ...transaction,
                cost: value ? Number(value) : 0,
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
                name='transactionType'
                value='ml'
                checked={transaction.type === 'expense'}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    type: e.target.value as 'expense' | 'income',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>ml</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='transactionType'
                value='mg'
                checked={transaction.type === 'income'}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    type: e.target.value as 'expense' | 'income',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>mg</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='transactionType'
                value='ea'
                checked={transaction.type === 'income'}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    type: e.target.value as 'expense' | 'income',
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
            value={transaction.detail}
            onChange={(e) =>
              setTransaction({ ...transaction, detail: e.target.value })
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
            value={transaction.detail}
            onChange={(e) =>
              setTransaction({ ...transaction, detail: e.target.value })
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
