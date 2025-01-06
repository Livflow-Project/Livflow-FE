import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import { getSelectedDateTransactions } from '@/utils/calendarUtils';
import { useState } from 'react';

type DailyDetailsProps = {
  selectedDate: string;
  calendarData: any;
  storeId: number;
  onModalOpen: () => void;
};

const DailyDetails = ({
  selectedDate,
  calendarData,
  onModalOpen,
}: DailyDetailsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const transactions = getSelectedDateTransactions(selectedDate, calendarData);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const TransactionItem = ({
    transaction,
    type,
    index,
  }: {
    transaction: DayDetailTransaction;
    type: 'expense' | 'income';
    index: number;
  }) => (
    <div
      key={`${type}-${index}`}
      className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center'
    >
      <span className='w-[30%] text-lg font-normal'>
        {transaction.category}
      </span>
      <span className='w-[40%] text-lg font-normal'>{transaction.detail}</span>
      <span
        className={`w-[30%] text-lg font-normal ${type === 'expense' ? 'text-red' : 'text-green'}`}
      >
        {type === 'expense' ? '- ' : '+ '}
        {transaction.cost.toLocaleString()}원
      </span>
      {isEditMode && (
        <div className='absolute inset-0 flex items-center justify-center gap-4 bg-white/50'>
          <button
            onClick={() => handleEdit(transaction)}
            className='flex h-8 w-8 items-center justify-center rounded-full bg-main hover:bg-main/80'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(transaction)}
            className='flex h-8 w-8 items-center justify-center rounded-full bg-red hover:bg-red/80'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  const handleEdit = (transaction: DayDetailTransaction) => {
    // 수정 로직 구현
    console.log('Edit:', transaction);
  };

  const handleDelete = (transaction: DayDetailTransaction) => {
    // 삭제 로직 구현
    console.log('Delete:', transaction);
  };

  return (
    <>
      <div className='flex h-[65px] w-full items-center border-b border-underline'>
        <span className='w-[30%] text-center text-xl font-semibold text-main'>
          항목
        </span>
        <span className='w-[40%] text-center text-xl font-semibold text-main'>
          상세 정보
        </span>
        <span className='w-[30%] text-center text-xl font-semibold text-main'>
          지출 / 수입
        </span>
      </div>

      <div className='flex h-[calc(100%-130px)] w-full flex-col'>
        {transactions ? (
          <>
            {transactions?.expense?.map(
              (transaction: DayDetailTransaction, index: number) => (
                <TransactionItem
                  key={`expense-${index}`}
                  transaction={transaction}
                  type='expense'
                  index={index}
                />
              )
            )}

            {transactions?.income?.map(
              (transaction: DayDetailTransaction, index: number) => (
                <TransactionItem
                  key={`income-${index}`}
                  transaction={transaction}
                  type='income'
                  index={index}
                />
              )
            )}
          </>
        ) : (
          <div className='my-auto w-full text-center text-2xl text-main'>
            입력된 지출 / 수입이 없습니다.
          </div>
        )}
      </div>

      <div className='flex w-full items-center justify-between px-[25px] pb-[20px]'>
        <button onClick={onModalOpen} className='soft_BcolorSet w-[40%]'>
          지출 / 수입 추가하기
        </button>
        {/* <div className='flex w-[40%] gap-4'> */}
        {/* <button className='soft_BcolorSet w-[50%]'>수정 하기</button>
          <button className='soft_BcolorSet w-[50%]'>삭제 하기</button> */}
        <button
          onClick={handleEditClick}
          className={`soft_BcolorSet w-[25%] ${isEditMode ? 'bg-main text-white' : ''}`}
        >
          수정 / 삭제 하기
        </button>
        {/* <button
            className='soft_BcolorSet w-[50%]'
            onClick={() => setIsEditMode(false)}
          >
            삭제 하기
          </button> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default DailyDetails;
