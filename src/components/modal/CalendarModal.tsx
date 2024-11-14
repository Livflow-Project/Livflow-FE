import { toast } from 'react-toastify';
import { Transaction } from '../../types/calendar';
import { useState } from 'react';

type CalendarModalProps = {
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  selectedDate: string | null;
};

const CalendarModal = ({ onClose, onSubmit }: CalendarModalProps) => {
  const [transaction, setTransaction] = useState<Transaction>({
    item: '',
    details: '',
    type: 'expense',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !transaction.item ||
      transaction.amount === 0 ||
      transaction.details.trim() === ''
    ) {
      toast.warn('빈칸 없이 모두 입력해주세요.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    onSubmit(transaction);

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
              value={transaction.item}
              onChange={(e) =>
                setTransaction({ ...transaction, item: e.target.value })
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
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  amount: Number(e.target.value),
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
              value={transaction.details}
              onChange={(e) =>
                setTransaction({ ...transaction, details: e.target.value })
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
