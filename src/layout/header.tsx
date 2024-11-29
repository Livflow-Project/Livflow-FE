import { Link } from 'react-router-dom';
import { logo } from '../assets/assets';

const Header = () => {
  return (
    <header className='fixed left-0 top-0 h-[75px] w-[100%] bg-white px-[80px] shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/'>
            <img src={logo} alt='Livflow 로고' className='mr-28 h-[70px]' />
          </Link>
          <div className='flex items-center gap-20'>
            <Link to=''>
              <nav className='text-[25px] text-main'>서비스 소개</nav>
            </Link>
            <Link to=''>
              <nav className='text-[25px] text-main'>고객 지원</nav>
            </Link>
          </div>
        </div>
        <Link to='/login'>
          <nav className='text-[25px] font-semibold text-primary hover:font-bold hover:text-primary_hover'>
            로그인
          </nav>
        </Link>
      </div>
    </header>
  );
};

export default Header;
