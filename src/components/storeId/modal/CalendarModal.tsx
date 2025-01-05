import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type CalendarModalProps = {
  onClose: () => void;
  storeId: number;
  selectedDate: string | null;
};

const CalendarModal = ({
  onClose,
  selectedDate,
  storeId,
}: CalendarModalProps) => {
  const { useAddTransaction } = useStoreIdQuery();
  const { mutate: addTransaction } = useAddTransaction();

  const [transaction, setTransaction] = useState<{
    category: string;
    detail: string;
    type: 'expense' | 'income';
    cost: number;
  }>({
    category: '',
    detail: '',
    type: 'expense',
    cost: 0,
  });

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

    const newTransaction: DayDetailTransaction = {
      category: transaction.category,
      detail: transaction.detail,
      cost: transaction.cost,
    };

    addTransaction({
      id: storeId,
      data: {
        year,
        month,
        day,
        day_info: {
          [transaction.type]: [newTransaction],
        },
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
              <option value='식비'>식비</option>
              <option value='교통비'>교통비</option>
              <option value='생활용품'>생활용품</option>
              <option value='저축'>저축</option>
              <option value='주거'>주거</option>
              <option value='용돈'>용돈</option>
              <option value='통신비'>통신비</option>
              <option value='건강'>건강</option>
              <option value='자기계발'>자기계발</option>
              <option value='여행'>여행</option>
              <option value='자동차'>자동차</option>
              <option value='문화'>문화</option>
              <option value='경조사'>경조사</option>
              <option value='기타'>기타</option>
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
              value={transaction.cost}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  cost: Number(e.target.value),
                })
              }
              placeholder='금액을 입력해 주세요.'
              className='input_box'
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
