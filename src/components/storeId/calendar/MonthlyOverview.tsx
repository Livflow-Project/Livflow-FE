import PieChart from '@/components/common/PieChart';
import { calculateTotals } from '@/utils/calendarUtils';
import { twMerge } from 'tailwind-merge';

type MonthlyOverviewProps = {
  calendarData: any;
};

const MonthlyOverview = ({ calendarData }: MonthlyOverviewProps) => {
  const monthlyTotals = calculateTotals(calendarData);

  return (
    <>
      <div className='flex h-full w-full items-center justify-evenly py-14'>
        <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
          {monthlyTotals.categories.expense.length === 0 ? (
            <p className='text-sx text-caption'>입력된 지출이 없습니다.</p>
          ) : (
            <>
              <span className='text-2xl font-semibold'>총 지출</span>
              <PieChart
                selectedType='expense'
                categories={monthlyTotals.categories.expense}
              />
              <ul className='flex h-full w-full flex-col items-center text-xl font-medium text-caption'>
                {monthlyTotals.categories.expense
                  .sort((a, b) => b.cost - a.cost)
                  .slice(0, 5)
                  .map((category, index) => (
                    <li key={index} className='flex w-full justify-between'>
                      <span className='text-xl font-normal text-caption'>
                        {category.category}
                      </span>
                      <span className='text-xl font-normal text-caption'>
                        - {category.cost.toLocaleString()}원
                      </span>
                    </li>
                  ))}
                <div className='mt-auto w-full pt-[25px]'>
                  <li className='flex w-full justify-between'>
                    <span>합계</span>
                    <span>- {monthlyTotals.expense.toLocaleString()}원</span>
                  </li>
                </div>
              </ul>
            </>
          )}
        </div>

        <div className='h-full w-[1px] bg-underline/30'></div>

        <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
          {monthlyTotals.categories.income.length === 0 ? (
            <p className='text-sx text-caption'>입력된 수입이 없습니다.</p>
          ) : (
            <>
              <span className='text-2xl font-semibold'>총 수입</span>
              <PieChart
                selectedType='income'
                categories={monthlyTotals.categories.income}
              />
              <ul className='flex h-full w-full flex-col items-center text-xl font-medium text-caption'>
                {monthlyTotals.categories.income
                  .sort((a, b) => b.cost - a.cost)
                  .slice(0, 5)
                  .map((category, index) => (
                    <li key={index} className='flex w-full justify-between'>
                      <span className='text-xl font-normal text-caption'>
                        {category.category}
                      </span>
                      <span className='text-xl font-normal text-caption'>
                        + {category.cost.toLocaleString()}원
                      </span>
                    </li>
                  ))}
                <div className='mt-auto w-full pt-[20px]'>
                  <li className='mt-10 flex w-full justify-between'>
                    <span>합계</span>
                    <span>+ {monthlyTotals.income.toLocaleString()}원</span>
                  </li>
                </div>
              </ul>
            </>
          )}
        </div>
      </div>

      <div className='flex h-[100px] w-full items-center justify-center border-t-2 border-underline/30'>
        <p className='text-2xl font-semibold'>총 합계 &nbsp;&nbsp;</p>
        <p
          className={twMerge(
            'text-2xl font-semibold',
            monthlyTotals.income - monthlyTotals.expense >= 0
              ? 'text-green'
              : 'text-red'
          )}
        >
          {monthlyTotals.income - monthlyTotals.expense >= 0 ? '+' : '-'}
          {Math.abs(
            monthlyTotals.income - monthlyTotals.expense
          ).toLocaleString()}
          원
        </p>
      </div>
    </>
  );
};

export default MonthlyOverview;
