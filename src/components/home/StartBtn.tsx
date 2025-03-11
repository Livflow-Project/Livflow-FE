import { Link } from 'react-router-dom';
import { rightArrow } from '@/assets/assets';

const StartBtn = () => {
  return (
    <div className='pointer-events-none fixed bottom-5 flex w-[100%] justify-center'>
      <Link to='/login' className='pointer-events-auto'>
        <button className='relative h-[62px] w-[274px] rounded-[96px] bg-button text-xl text-white shadow-md hover:bg-button_hover'>
          Livflow 시작하기
          <img
            src={rightArrow}
            alt='Arrow Icon'
            className='absolute right-8 top-1/2 -translate-y-1/2 transform'
          />
        </button>
      </Link>
    </div>
  );
};

export default StartBtn;
