const RecipeHeader = () => {
  return (
    <header className='flex h-[60px] w-full items-center justify-evenly rounded-lg bg-white text-xl'>
      <div className='w-[45%]'>
        <span>메뉴 이름 : </span>
        <input className='rounded border px-2 py-1' />
      </div>
      <div className='h-[40px] w-[1px] bg-caption'></div>
      <div className='w-[45%]'>
        <span>판매 가격 : </span>
        <input className='rounded border px-2 py-1' />
        <span>원</span>
      </div>
    </header>
  );
};

export default RecipeHeader;
