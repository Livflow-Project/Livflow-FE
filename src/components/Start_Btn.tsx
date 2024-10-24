import { Link } from 'react-router-dom';
import R_Arrow from '../assets/R_Arrow.svg';

const Start_Btn = () => {
  return (
    <div className='relative w-fit'>
      <Link to='/login'>
        <button className='bg-button hover:bg-button_hover relative h-[62px] w-[274px] rounded-[96px] text-xl text-white shadow-md'>
          Livflow 시작하기
        </button>
      </Link>
      <img
        src={R_Arrow}
        alt='Arrow Icon'
        className='absolute right-8 top-1/2 -translate-y-1/2 transform'
      />
    </div>
  );
};

export default Start_Btn;
