import { Link } from 'react-router-dom';
import { loginIcons } from '@/assets/assets';

const {
  VITE_KAKAO_CLIENT_ID,
  VITE_KAKAO_REDIRECT_URI,
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_REDIRECT_URI,
  VITE_GOOGLE_SCOPE,
  VITE_NAVER_CLIENT_ID,
  VITE_NAVER_CLIENT_SECRET,
  VITE_NAVER_REDIRECT_URI,
} = import.meta.env;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_CLIENT_ID}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=${VITE_GOOGLE_SCOPE}&access_type=offline&prompt=consent`;

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&state=${VITE_NAVER_CLIENT_SECRET}&redirect_uri=${VITE_NAVER_REDIRECT_URI}`;

const socialButtons = [
  { name: 'google', src: loginIcons.google, url: GOOGLE_AUTH_URL },
  { name: 'kakao', src: loginIcons.kakao, url: KAKAO_AUTH_URL },
  { name: 'naver', src: loginIcons.naver, url: NAVER_AUTH_URL },
];

const Login = () => {
  return (
    <div className='flex h-svh w-[100%] flex-col items-center justify-center gap-[55px]'>
      <Link to='/'>
        <img
          src={loginIcons.logo}
          alt='Livflow 로고 이미지'
          className='w-[500px]'
        />
      </Link>

      <div className='flex flex-col items-center justify-center gap-5'>
        {socialButtons.map(({ name, src, url }) => (
          <Link key={name} to={url}>
            <img src={src} alt={name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Login;
