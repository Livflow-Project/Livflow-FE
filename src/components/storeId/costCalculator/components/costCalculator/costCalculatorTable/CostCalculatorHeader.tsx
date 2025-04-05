const CostCalculatorHeader = () => {
  return (
    <ul className='table_header'>
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
