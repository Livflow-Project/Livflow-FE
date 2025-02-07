import {
  ChartOverview,
  LedgerCalendarResponse,
} from '@/api/storeId/ledger/calendar/calendar.type';

import PieChart from '@/components/common/PieChart';
import { twMerge } from 'tailwind-merge';

type MonthlyOverviewProps = {
  calendarData: LedgerCalendarResponse;
};

type CategorySectionProps = {
  title: string;
  categories: ChartOverview['categories'];
  total: number;
  isIncome: boolean;
};

const CategorySection = ({
  title,
  categories,
  total,
  isIncome,
}: CategorySectionProps) => {
  const filteredCategories = categories.filter(
    (cat) => cat.type === (isIncome ? 'income' : 'expense')
  );

  if (filteredCategories.length === 0) {
    return (
      <p className='text-sx text-caption'>
        입력된 {isIncome ? '수입' : '지출'}이 없습니다.
      </p>
    );
  }

  return (
    <>
      <span className='text-2xl font-semibold'>{title}</span>
      <div className='flex h-full min-h-0 w-full items-center justify-center'>
        <div className='flex aspect-square h-[min(100%,250px)] w-[min(100%,250px)] items-center justify-center'>
          <PieChart categories={filteredCategories} />
        </div>
      </div>

      <ul className='flex h-full w-full flex-col items-center text-xl'>
        {filteredCategories
          .sort((a, b) => b.cost - a.cost)
          .slice(0, 5)
          .map((category, index) => (
            <li
              key={`${category.category}-${index}`}
              className='flex w-full justify-between font-normal text-caption'
            >
              <span>{category.category}</span>
              <span>
                {isIncome ? '+' : '-'} {category.cost.toLocaleString()}원
              </span>
            </li>
          ))}

        <div className='mt-auto w-full pt-[25px]'>
          <li className='flex w-full justify-between font-medium'>
            <span>합계</span>
            <span>
              {isIncome ? '+' : '-'} {total.toLocaleString()}원
            </span>
          </li>
        </div>
      </ul>
    </>
  );
};

const TotalBalance = ({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) => {
  const balance = income - expense;
  const isPositive = balance >= 0;

  return (
    <div className='flex w-full items-center justify-center border-t-2 border-underline/30 py-6'>
      <p className='text-[26px] font-semibold'>총 합계 &nbsp;&nbsp;</p>
      <p
        className={twMerge(
          'text-[26px] font-semibold',
          isPositive ? 'text-green' : 'text-red'
        )}
      >
        {isPositive ? '+' : '-'}
        {Math.abs(balance).toLocaleString()}원
      </p>
    </div>
  );
};

const MonthlyOverview = ({ calendarData }: MonthlyOverviewProps) => {
  const { totalIncome, totalExpense, categories } = calendarData.chart;

  if (categories.length === 0) {
    return (
      <div className='my-auto w-full text-center text-2xl text-main'>
        입력된 지출 / 수입이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className='flex h-[calc(100%-80px)] w-full items-center justify-evenly py-11'>
        <div className='flex h-full w-[40%] flex-col items-center justify-center gap-[40px]'>
          <CategorySection
            title='총 지출'
            categories={categories}
            total={totalExpense}
            isIncome={false}
          />
        </div>

        <div className='h-full w-[1px] bg-underline/30' />

        <div className='flex h-full w-[40%] flex-col items-center justify-center gap-[40px]'>
          <CategorySection
            title='총 수입'
            categories={categories}
            total={totalIncome}
            isIncome={true}
          />
        </div>
      </div>

      <TotalBalance income={totalIncome} expense={totalExpense} />
    </>
  );
};

export default MonthlyOverview;
