const SummaryInfo = () => {
  return (
    <article className='h-[30%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-evenly px-5 text-xl font-semibold text-main'>
        <li>총 재료 원가 : </li>
        <li>생산 수량 : </li>
        <li>생산 단가 </li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
