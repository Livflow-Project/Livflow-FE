import { Link } from 'react-router-dom';
import R_Arrow from '../assets/R_Arrow.svg';

const Start_Btn = () => {
  return (
    <div className='fixed bottom-5 flex w-[100%] justify-center'>
      <Link to='/login'>
        <button className='bg-button hover:bg-button_hover relative h-[62px] w-[274px] rounded-[96px] text-xl text-white shadow-md'>
          Livflow 시작하기
          <img
            src={R_Arrow}
            alt='Arrow Icon'
            className='absolute right-8 top-1/2 -translate-y-1/2 transform'
          />
        </button>
      </Link>
    </div>
  );
};

export default Start_Btn;
