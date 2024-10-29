import Google from '../assets/Google.svg';
import Kakao from '../assets/Kakao.svg';
import { Link } from 'react-router-dom';
import Logo from '/public/Logo.svg';
import Naver from '../assets/Naver.svg';

const Login = () => {
  return (
    <div className='flex h-svh w-[100%] flex-col items-center justify-center gap-[55px]'>
      <Link to='/'>
        <img src={Logo} alt='Livflow 로고 이미지' className='w-[500px]' />
      </Link>
      <div className='flex flex-col items-center justify-center gap-5'>
        <button
          className='text-main social_button'
          style={{
            backgroundImage: `url(${Kakao})`,
          }}
        >
          카카오 로그인
        </button>
        <button
          className='social_button text-white'
          style={{
            backgroundImage: `url(${Naver})`,
          }}
        >
          네이버 로그인
        </button>
        <button
          className='text-main social_button text-opacity-50 shadow-md'
          style={{
            backgroundImage: `url(${Google})`,
          }}
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
