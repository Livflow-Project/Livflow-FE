const Header = () => {
  return (
    <header className='flex h-[60px] w-full items-center justify-evenly rounded-lg bg-white text-xl'>
      <div className='flex w-[40%] items-center justify-center'>
        <span className='mr-2'>메뉴 이름 : </span>
        <input
          type='text'
          className='h-full border-0 border-b border-gray-300 bg-transparent p-0 text-lg focus:border-b focus:border-gray-300 focus:outline-none focus:ring-0'
        />
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[40%] items-center justify-center'>
        <span className='mr-2'>판매 가격 : </span>
        <input
          type='number'
          className='h-full border-0 border-b border-gray-300 bg-transparent p-0 text-lg [-moz-appearance:_textfield] focus:border-b focus:border-gray-300 focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
        />
        <span className='ml-1'>원</span>
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[15%] items-center justify-center'>
        <label className='flex cursor-pointer items-center'>
          <span className='mr-2'>즐겨찾기</span>
          <input
            type='checkbox'
            className='h-6 w-6 rounded border-gray-300 text-green shadow-sm focus:ring-0 focus:ring-offset-0'
          />
        </label>
      </div>
    </header>
  );
};

export default Header;
