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
    <div className='flex w-full items-center justify-center border-t border-dashed border-underline/30 bg-white/50 py-4 text-xl font-semibold'>
      <p className='text-xl'>총 합계 &nbsp;&nbsp;</p>
      <p className={twMerge(isPositive ? 'text-green' : 'text-red')}>
        {isPositive ? '+' : '-'}
        {Math.abs(balance).toLocaleString()}원
      </p>
    </div>
  );
};

export default TotalBalance;
