import PieChart from './PieChart';
import { twMerge } from 'tailwind-merge';
import useCalendarStore from '../../store/useCalendarStore';
import { useState } from 'react';

interface UseChartProps {
  id: number;
  isDeleteMode: boolean;
}

const UseChart: React.FC<UseChartProps> = ({ id, isDeleteMode }) => {
  const [isExpenseSelected, setIsExpenseSelected] = useState(true);

  const { monthlyTotals } = useCalendarStore();

  const monthKey = new Date().toISOString().slice(0, 7);
  const totalsForMonth = monthlyTotals[id]?.[monthKey];

  const expenseCategories = totalsForMonth?.categories.expense || {};
  const incomeCategories = totalsForMonth?.categories.income || {};

  const isExpenseEmpty = Object.keys(expenseCategories).length === 0;
  const isIncomeEmpty = Object.keys(incomeCategories).length === 0;

  const handleToggle = (type: 'expense' | 'income') => {
    setIsExpenseSelected(type === 'expense');
  };

  return (
    <>
      <div className='flex w-[100%] justify-between'>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : isExpenseSelected
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => handleToggle('expense')}
        >
          지출
        </button>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : !isExpenseSelected
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => handleToggle('income')}
        >
          수입
        </button>
      </div>
      <div
        className={twMerge(
          'max-h-[270px] text-xl font-medium text-caption',
          isDeleteMode ? 'opacity-50' : ''
        )}
      >
        {isExpenseSelected ? (
          isExpenseEmpty ? (
            <div className='text-center'>입력된 지출이 없습니다.</div>
          ) : (
            <PieChart selectedType='expense' categories={expenseCategories} />
          )
        ) : isIncomeEmpty ? (
          <div className='text-center'>입력된 수입이 없습니다.</div>
        ) : (
          <PieChart selectedType='income' categories={incomeCategories} />
        )}
      </div>
    </>
  );
};

export default UseChart;
