import Map_Icon from '../assets/Map_Icon.svg';
import Store_Icon from '../assets/Store_Icon.svg';

const My_Store = () => {
  return (
    <div className='store_box'>
      <div className='border-underline border-b border-opacity-20 p-[22px]'>
        <ul className='flex flex-col gap-6'>
          <li className='flex items-center justify-between'>
            <img src={Store_Icon} alt='상점 아이콘' className='w-[30px]' />
            <span className='text-main text-[17px] font-semibold'>
              GOD 내린 커피
            </span>
            <button className='text-primary hover:text-primary_hover text-[13px]'>
              수정
            </button>
          </li>
          <li className='flex items-center justify-between'>
            <img src={Map_Icon} alt='상점 아이콘' className='w-[30px]' />
            <span className='text-main w-[220px] truncate text-center text-[17px] font-semibold'>
              서울 동작구 123번지 56, 1층
            </span>
            <button className='text-primary hover:text-primary_hover text-[13px]'>
              수정
            </button>
          </li>
        </ul>
      </div>
      <div
        className='flex flex-col items-center justify-between px-[17px] pb-[40px] pt-[17px]'
        style={{ height: 'calc(100% - 128px)' }}
      >
        <div className='flex w-[100%] justify-between'>
          <button className='text-primary/50 hover:text-primary text-xl font-semibold'>
            지출
          </button>
          <button className='text-primary/50 hover:text-primary text-xl font-semibold'>
            수입
          </button>
        </div>
        <div className='text-caption text-xl font-medium'>
          입력된 지출이 없습니다.
        </div>
        <button className='choice_button'>선택</button>
      </div>
    </div>
  );
};

export default My_Store;
