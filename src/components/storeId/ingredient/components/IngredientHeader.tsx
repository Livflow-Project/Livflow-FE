const IngredientHeader = () => (
  <ul className='flex h-[65px] w-full items-center border-b border-underline'>
    <li className='w-[8%] text-center text-xl font-semibold text-main'>번호</li>

    <li className='w-[17%] text-center text-xl font-semibold text-main'>
      재료명
    </li>

    <li className='w-[16%] text-center text-xl font-semibold text-main'>
      구매가
    </li>

    <li className='w-[16%] text-center text-xl font-semibold text-main'>
      용량
    </li>

    <li className='w-[9%] text-center text-xl font-semibold text-main'>단위</li>

    <li className='w-[17%] text-center text-xl font-semibold text-main'>
      판매처
    </li>

    <li className='w-[17%] text-center text-xl font-semibold text-main'>
      비고
    </li>
  </ul>
);

export default IngredientHeader;
