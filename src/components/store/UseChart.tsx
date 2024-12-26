import PieChart from '../common/PieChart';
import { StoreResponse } from '@/api/store/store.type';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type UseChartProps = {
  chartInfo?: StoreResponse['chart'];
  isDeleteMode: boolean;
};

const UseChart = ({ chartInfo, isDeleteMode }: UseChartProps) => {
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'expense'
  );

  return (
    <>
      <div className='flex w-[100%] justify-between'>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : selectedType === 'expense'
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => setSelectedType('expense')}
        >
          지출
        </button>

        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : selectedType === 'income'
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => setSelectedType('income')}
        >
          수입
        </button>
      </div>

      <div className={isDeleteMode ? 'opacity-50' : ''}>
        {selectedType === 'expense' ? (
          chartInfo?.expense && chartInfo.expense.length > 0 ? (
            <PieChart selectedType='expense' categories={chartInfo.expense} />
          ) : (
            <div className='text-center'>입력된 지출이 없습니다.</div>
          )
        ) : chartInfo?.income && chartInfo.income.length > 0 ? (
          <PieChart selectedType='income' categories={chartInfo.income} />
        ) : (
          <div className='text-center'>입력된 수입이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default UseChart;
