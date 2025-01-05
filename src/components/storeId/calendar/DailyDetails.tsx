import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import { getSelectedDateTransactions } from '@/utils/calendarUtils';

interface DailyDetailsProps {
  selectedDate: string;
  calendarData: any;
  storeId: number;
  onModalOpen: () => void;
}

const DailyDetails = ({
  selectedDate,
  calendarData,
  onModalOpen,
}: DailyDetailsProps) => {
  const transactions = getSelectedDateTransactions(selectedDate, calendarData);

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

      <div className='flex h-[calc(100%-130px)] w-full flex-col gap-2'>
        {transactions ? (
          <>
            {transactions?.expense?.map(
              (transaction: DayDetailTransaction, index: number) => (
                <div
                  key={`expense-${index}`}
                  className='flex h-[45px] w-full items-center border-b border-underline/30 text-center'
                >
                  <span className='w-[30%] text-lg font-normal'>
                    {transaction.category}
                  </span>
                  <span className='w-[40%] text-lg font-normal'>
                    {transaction.detail}
                  </span>
                  <span className='w-[30%] text-lg font-normal text-red'>
                    - {transaction.cost.toLocaleString()}원
                  </span>
                </div>
              )
            )}

            {transactions?.income?.map(
              (transaction: DayDetailTransaction, index: number) => (
                <div
                  key={`income-${index}`}
                  className='flex h-[45px] w-full items-center border-b border-underline/30 text-center'
                >
                  <span className='w-[30%] text-lg font-normal'>
                    {transaction.category}
                  </span>
                  <span className='w-[40%] text-lg font-normal'>
                    {transaction.detail}
                  </span>
                  <span className='w-[30%] text-lg font-normal text-green'>
                    + {transaction.cost.toLocaleString()}원
                  </span>
                </div>
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
        <div className='flex w-[40%] gap-4'>
          <button className='soft_BcolorSet w-[50%]'>수정 하기</button>
          <button className='soft_BcolorSet w-[50%]'>삭제 하기</button>
        </div>
      </div>
    </>
  );
};

export default DailyDetails;
