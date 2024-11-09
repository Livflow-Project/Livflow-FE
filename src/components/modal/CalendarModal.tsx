import { Transaction } from '../../types/calendar';
import { useState } from 'react';

type CalendarModalProps = {
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  selectedDate: string | null;
};

const CalendarModal = ({
  onClose,
  onSubmit,
  selectedDate,
}: CalendarModalProps) => {
  const [transaction, setTransaction] = useState<Transaction>({
    item: '',
    details: '',
    type: 'expense',
    amount: 0,
  });

  const handleSubmit = () => {
    onSubmit(transaction);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <div className='p-5 bg-white'>
        <h2>{selectedDate} - 지출/수입 추가</h2>
        <input
          type='text'
          value={transaction.item}
          onChange={(e) =>
            setTransaction({ ...transaction, item: e.target.value })
          }
          placeholder='항목 입력'
        />
        <input
          type='text'
          value={transaction.details}
          onChange={(e) =>
            setTransaction({ ...transaction, details: e.target.value })
          }
          placeholder='상세 정보 입력'
        />
        <input
          type='number'
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: Number(e.target.value) })
          }
          placeholder='금액 입력'
        />
        <button onClick={handleSubmit}>추가하기</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CalendarModal;
