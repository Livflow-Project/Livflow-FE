import CategorySection from './CategorySection';
import { LedgerCalendarResponse } from '@/api/storeId/ledger/calendar/calendar.type';
import TotalBalance from './TotalBalance';

type MonthlyOverviewProps = {
  calendarData: LedgerCalendarResponse;
};

const MonthlyOverview = ({ calendarData }: MonthlyOverviewProps) => {
  const { totalIncome, totalExpense, categories } = calendarData.chart;

  if (categories.length === 0) {
    return (
      <div className='my-auto w-full text-center text-2xl text-caption'>
        추가된 지출 / 수입이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className='flex h-[calc(100%-80px)] w-full items-center justify-evenly py-11'>
        <CategorySection
          title='총 지출'
          categories={categories}
          total={totalExpense}
          isIncome={false}
        />

        <div className='h-full w-[1px] bg-underline/30' />

        <CategorySection
          title='총 수입'
          categories={categories}
          total={totalIncome}
          isIncome={true}
        />
      </div>

      <TotalBalance income={totalIncome} expense={totalExpense} />
    </>
  );
};

export default MonthlyOverview;
