const TransactionHeader = () => (
  <ul className='flex h-[65px] w-full items-center border-b border-underline'>
    <li className='w-[30%] text-center text-xl font-semibold text-main'>
      항목
    </li>

    <li className='w-[40%] text-center text-xl font-semibold text-main'>
      상세 정보
    </li>

    <li className='w-[30%] text-center text-xl font-semibold text-main'>
      지출 / 수입
    </li>
  </ul>
);

export default TransactionHeader;
