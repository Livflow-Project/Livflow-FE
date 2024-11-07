const Store_ID = () => {
  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <ul className='flex flex-col items-end gap-4'>
        <li className='text-2xl font-semibold text-main'>해당 스토어 이름</li>
        <li className='text-[15px] font-medium text-main'>해당 스토어 주소</li>
      </ul>
      <div className='h-[100%]'>
        <div className='flex items-center justify-start gap-3'>
          <nav className='bg-background flex h-[55px] w-[135px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px]'>
            <span className='text-[22px] font-normal text-main'>가계부</span>
          </nav>
          <nav className='bg-background/60 flex h-[55px] w-[135px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px]'>
            <span className='text-[22px] font-normal text-main/60'>
              원가계산
            </span>
          </nav>
        </div>
        <div className='bg-background h-[calc(100%-55px)] w-full'></div>
      </div>
    </div>
  );
};

export default Store_ID;
