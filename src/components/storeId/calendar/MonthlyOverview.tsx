import PieChart from '@/components/common/PieChart';
import { StoreIdDetailResponse } from '@/api/storeId/storeId.type';
import { calculateTotals } from '@/utils/calendarUtils';
import { twMerge } from 'tailwind-merge';

type MonthlyOverviewProps = {
  calendarData: StoreIdDetailResponse | null | undefined;
};

type CategoryData = {
  type: 'expense' | 'income';
  category: string;
  cost: number;
};

type CategorySectionProps = {
  title: string;
  categories: CategoryData[];
  total: number;
  isIncome: boolean;
};

const CategorySection = ({
  title,
  categories,
  total,
  isIncome,
}: CategorySectionProps) => {
  if (categories.length === 0) {
    return (
      <p className='text-sx text-caption'>
        입력된 {isIncome ? '수입' : '지출'}이 없습니다.
      </p>
    );
  }

  return (
    <>
      <span className='text-2xl font-semibold'>{title}</span>
      <PieChart categories={categories} />
      <ul className='flex h-full w-full flex-col items-center text-xl font-medium text-caption'>
        {categories
          .sort((a, b) => b.cost - a.cost)
          .slice(0, 5)
          .map((category, index) => (
            <li
              key={`${category.category}-${index}`}
              className='flex w-full justify-between'
            >
              <span className='text-xl font-normal text-caption'>
                {category.category}
              </span>
              <span className='text-xl font-normal text-caption'>
                {isIncome ? '+' : '-'} {category.cost.toLocaleString()}원
              </span>
            </li>
          ))}

        <div className='mt-auto w-full pt-[25px]'>
          <li className='flex w-full justify-between'>
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
    <div className='flex h-[100px] w-full items-center justify-center border-t-2 border-underline/30'>
      <p className='text-2xl font-semibold'>총 합계 &nbsp;&nbsp;</p>
      <p
        className={twMerge(
          'text-2xl font-semibold',
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
  const monthlyTotals = calculateTotals(calendarData);
  const expenseCategories = monthlyTotals.categories.filter(
    (cat) => cat.type === 'expense'
  );
  const incomeCategories = monthlyTotals.categories.filter(
    (cat) => cat.type === 'income'
  );

  if (expenseCategories.length === 0 && incomeCategories.length === 0) {
    return (
      <div className='my-auto w-full text-center text-2xl text-main'>
        입력된 지출 / 수입이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className='flex h-full w-full items-center justify-evenly py-14'>
        <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
          <CategorySection
            title='총 지출'
            categories={expenseCategories}
            total={monthlyTotals.expense}
            isIncome={false}
          />
        </div>

        <div className='h-full w-[1px] bg-underline/30' />

        <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
          <CategorySection
            title='총 수입'
            categories={incomeCategories}
            total={monthlyTotals.income}
            isIncome={true}
          />
        </div>
      </div>

      <TotalBalance
        income={monthlyTotals.income}
        expense={monthlyTotals.expense}
      />
    </>
  );
};

export default MonthlyOverview;
