const Header = () => {
  return (
    <header className='flex h-[60px] w-full items-center justify-evenly rounded-lg bg-white text-xl'>
      <div className='flex w-[40%] items-center justify-center'>
        <label htmlFor='menu_name' className='input_label mr-2'>
          메뉴 이름 :
        </label>
        <input id='menu_name' type='text' className='input_underlined h-full' />
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[40%] items-center justify-center'>
        <label htmlFor='menu_cost' className='input_label mr-2'>
          판매 가격 :
        </label>
        <input
          id='menu_cost'
          type='number'
          className='input_underlined number_input h-full'
        />
        <span className='input_label ml-1'>원</span>
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[15%] items-center justify-center'>
        <label
          htmlFor='favorites_checkbox'
          className='input_label mr-2 cursor-pointer'
        >
          즐겨찾기
        </label>
        <input
          id='favorites_checkbox'
          type='checkbox'
          className='h-6 w-6 cursor-pointer rounded border-gray-300 text-green shadow-sm focus:ring-0 focus:ring-offset-0'
        />
      </div>
    </header>
  );
};

export default Header;
