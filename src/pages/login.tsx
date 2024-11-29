import { google, kakao, logo, naver } from '@/assets/assets';

import { Link } from 'react-router-dom';

const Login = () => {
  const socialButtons = [
    {
      src: kakao,
      alt: 'kakao',
    },
    {
      src: naver,
      alt: 'naver',
    },
    {
      src: google,
      alt: 'google',
    },
  ];

  return (
    <div className='flex h-svh w-[100%] flex-col items-center justify-center gap-[55px]'>
      <Link to='/'>
        <img src={logo} alt='Livflow 로고 이미지' className='w-[500px]' />
      </Link>
      <div className='flex flex-col items-center justify-center gap-5'>
        {socialButtons.map((button: any) => (
          <img src={button.src} alt={button.alt} />
        ))}
      </div>
    </div>
  );
};

export default Login;
