import { twMerge } from 'tailwind-merge';

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

export default TotalBalance;
