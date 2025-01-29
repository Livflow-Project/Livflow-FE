import Button from '@/components/common/Button';

const MainIngredients = () => {
  return (
    <div className='flex h-full flex-col items-center justify-between px-10 py-7'>
      <header className='flex w-full items-center justify-between'>
        <div className='h-[60px] w-[30%] min-w-[350px] rounded-lg bg-white/50'>
          <div className='flex h-full w-full items-center justify-evenly'>
            <span>총 등록된 재료 : 0개</span>
            <div className='h-[40px] w-[1px] bg-caption'></div>
            <span>총 비용 : 0원</span>
          </div>
        </div>
        <nav className='flex items-center gap-10'>
          <Button>재료 추가하기</Button>
          <div className='ml-5 flex gap-5'>
            <Button>수정 / 삭제하기</Button>
          </div>
        </nav>
      </header>
      <div className='h-[calc(100%-80px)] w-full bg-white'></div>
    </div>
  );
};

export default MainIngredients;
