import { ChartOverview } from '@/api/storeId/ledger/calendar/calendar.type';
import PieChart from '@/components/common/PieChart';

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
        추가된 {isIncome ? '수입' : '지출'}이 없습니다.
      </p>
    );
  }

  return (
    <div className='flex h-full w-[40%] flex-col items-center justify-center gap-[40px]'>
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
    </div>
  );
};

export default CategorySection;
