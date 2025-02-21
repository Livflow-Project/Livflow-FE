const CostCalculatorHeader = () => {
  return (
    <ul className='flex h-[65px] w-full items-center border-b border-underline text-center text-xl font-semibold text-main'>
      <li className='w-[20%] min-w-20'>사용 재료</li>

      <li className='w-[15%]'>재고</li>

      <li className='w-[20%]'>사용량</li>

      <li className='w-[10%]'>단위</li>

      <li className='w-[20%]'>재료 원가</li>

      <li className='w-[15%]'>원가 비율</li>
    </ul>
  );
};

export default CostCalculatorHeader;
