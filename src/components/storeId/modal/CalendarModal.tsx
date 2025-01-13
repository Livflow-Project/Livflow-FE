import { AddDayDetailTransaction } from '@/api/storeId/storeId.type';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type CalendarModalProps = {
  onClose: () => void;
  storeId: string;
  selectedDate: string | null;
};

const TRANSACTION_CATEGORIES = [
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
}: CalendarModalProps) => {
  const { useAddTransaction } = useStoreIdQuery();
  const { mutate: addTransaction } = useAddTransaction();

  const [transaction, setTransaction] = useState<AddDayDetailTransaction>({
    type: 'expense',
    category: '',
    detail: '',
    cost: 0,
  });

  const [costInput, setCostInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate) {
      showWarnToast('날짜를 선택해주세요.');
      return;
    }

    if (
      !transaction.category ||
      transaction.cost === 0 ||
      transaction.detail.trim() === ''
    ) {
      showWarnToast('빈칸 없이 모두 입력해주세요.');
      return;
    }

    const [year, month, day] = selectedDate.split('-').map(Number);

    addTransaction({
      id: storeId,
      data: {
        year,
        month,
        day,
        day_info: [transaction],
      },
    });

    onClose();
    toast.dismiss();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      toast.dismiss();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <form
        onSubmit={handleSubmit}
        className='modal_div flex w-[500px] flex-col gap-7'
      >
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
              className='input_box [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
            />
          </li>
          <li className='flex items-center justify-between'>
            <div className='relative flex items-center gap-2'>
              <label className='input_label'>상세정보</label>
              <span className='absolute -right-1.5 -top-2 text-red'>*</span>
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
        <div className='button_gap'>
          <button
            type='button'
            onClick={onClose}
            className='choice_button opacity-70'
          >
            취소
          </button>
          <button type='submit' className='choice_button'>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarModal;
