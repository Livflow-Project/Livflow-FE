import {
  AddTransactionParams,
  TransactionRequest,
  TransactionResponse,
} from '@/api/storeId/ledger/transactions/transactions.type';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useState } from 'react';
import { useTransactionsQuery } from '@/api/storeId/ledger/transactions/transactions.hooks';

type CalendarModalProps = {
  onClose: () => void;
  storeId: string;
  selectedDate: string | null;
  isEditMode?: boolean;
  initialData?: TransactionResponse;
};

const TRANSACTION_CATEGORIES = [
  { value: '급여', label: '급여' },
  { value: '식비', label: '식비' },
  { value: '교통비', label: '교통비' },
  { value: '생활용품', label: '생활용품' },
  { value: '저축', label: '저축' },
  { value: '주거', label: '주거' },
  { value: '용돈', label: '용돈' },
  { value: '통신비', label: '통신비' },
  { value: '건강', label: '건강' },
  { value: '자기계발', label: '자기계발' },
  { value: '여행', label: '여행' },
  { value: '자동차', label: '자동차' },
  { value: '문화', label: '문화' },
  { value: '경조사', label: '경조사' },
  { value: '기타', label: '기타' },
];

const CalendarModal = ({
  onClose,
  selectedDate,
  storeId,
  isEditMode = false,
  initialData,
}: CalendarModalProps) => {
  const { useAddTransaction, useUpdateTransaction } = useTransactionsQuery();
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();

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

    if (!selectedDate) {
      showWarnToast('날짜를 선택해주세요.');
      return;
    }

    if (!transaction.category || transaction.cost === 0) {
      showWarnToast('빈칸 없이 모두 입력해주세요.');
      return;
    }

    if (isEditMode && initialData) {
      updateTransaction({
        storeId: storeId,
        transactionId: initialData.transaction_id,
        data: {
          transaction_id: initialData.transaction_id,
          ...transaction,
        },
      });
    } else {
      const [year, month, day] = selectedDate!.split('-').map(Number);
      const addTransactionData: AddTransactionParams = {
        date: { year, month, day },
        ...transaction,
      };
      addTransaction({ storeId: storeId, data: addTransactionData });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit}>
      <ul className='flex flex-col gap-4'>
        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>카테고리</label>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <select
            value={transaction.category}
            onChange={(e) =>
              setTransaction({ ...transaction, category: e.target.value })
            }
            className='input_box'
          >
            <option value='' disabled className='text-center text-caption'>
              카테고리 선택
            </option>
            {TRANSACTION_CATEGORIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <span className='input_label'>지출 / 수입</span>
            <span className='absolute -right-1.5 -top-2 text-red'>*</span>
          </div>
          <div className='flex h-[42px] w-[60%] items-center justify-around'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='transactionType'
                value='expense'
                checked={transaction.type === 'expense'}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    type: e.target.value as 'expense' | 'income',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>지출</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='transactionType'
                value='income'
                checked={transaction.type === 'income'}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    type: e.target.value as 'expense' | 'income',
                  })
                }
                className='h-5 w-5'
              />
              <span className='ml-2 text-lg text-main'>수입</span>
            </label>
          </div>
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>금액</label>
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
            className='input_box number_input'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <label className='input_label'>상세정보</label>
            {/* <span className='absolute -right-1.5 -top-2 text-red'>*</span> */}
          </div>
          <input
            type='text'
            value={transaction.detail}
            onChange={(e) =>
              setTransaction({ ...transaction, detail: e.target.value })
            }
            placeholder='상세 정보를 입력해 주세요.'
            className='input_box'
          />
        </li>
      </ul>
    </Modal>
  );
};

export default CalendarModal;
