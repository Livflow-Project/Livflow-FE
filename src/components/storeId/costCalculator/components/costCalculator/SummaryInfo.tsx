const SummaryInfo = () => {
  return (
    <article className='h-[30%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-evenly px-5'>
        <li className='input_label'>총 재료 원가 :</li>

        <li className='flex w-full items-center'>
          <label
            htmlFor='production_quantity'
            className='input_label mr-2 whitespace-nowrap'
          >
            생산 수량 :
          </label>
          <input
            id='production_quantity'
            type='number'
            className='input_underlined number_input flex-1'
          />
        </li>

        <li className='input_label'>생산 단가 :</li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
