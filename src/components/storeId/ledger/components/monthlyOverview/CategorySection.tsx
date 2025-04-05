import { useEffect, useRef, useState } from 'react';

import { ChartOverview } from '@/api/storeId/ledger/calendar/calendar.type';
import PieChart from '@/components/common/PieChart';
import { twMerge } from 'tailwind-merge';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredCategories = categories.filter(
    (cat) => cat.type === (isIncome ? 'income' : 'expense')
  );
  const getCategoryClass = (name: string) =>
    `bg-category-${name.replace(/\s/g, '-').replace(/\./g, '')}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;

        if (height <= 308) {
          setVisibleCount(0);
        } else if (height <= 356) {
          setVisibleCount(3);
        } else if (height <= 404) {
          setVisibleCount(4);
        } else {
          setVisibleCount(5);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (filteredCategories.length === 0) {
    return (
      <div className='text-sx flex h-full w-[40%] items-center justify-center text-caption'>
        추가된 {isIncome ? '수입' : '지출'}이 없습니다.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className='flex h-full w-[45%] flex-col items-center justify-between gap-5'
    >
      <span className='text-xl font-semibold'>{title}</span>

      <div className='flex h-full min-h-3 w-full items-center justify-center'>
        <div className='flex aspect-square h-[min(100%,250px)] w-[min(100%,250px)] items-center justify-center'>
          <PieChart categories={filteredCategories} />
        </div>
      </div>

      <ul
        className={twMerge(
          'flex h-full w-full flex-col items-center',
          visibleCount === 0 && 'h-auto'
        )}
      >
        {filteredCategories
          .sort((a, b) => b.cost - a.cost)
          .slice(0, visibleCount)
          .map((category, index) => (
            <li
              key={`${category.category}-${index}`}
              className='flex w-full justify-between font-normal text-caption'
            >
              <span className='flex items-center gap-1 text-main'>
                <div
                  className={twMerge(
                    'flex h-5 w-5 items-center justify-center rounded-full bg-caption text-xs text-white',
                    getCategoryClass(category.category)
                  )}
                >
                  {index + 1}
                </div>
                {category.category}
              </span>

              <span>
                {isIncome ? '+' : '-'} {category.cost.toLocaleString()}원
              </span>
            </li>
          ))}

        <div
          className={twMerge(
            'mt-auto w-full pt-4',
            visibleCount === 0 && 'mt-0 pt-0'
          )}
        >
          <li className='flex w-full justify-between text-lg font-medium'>
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
