import { Link, Outlet } from 'react-router-dom';

import { logo } from '../assets/assets';

type NavItem = {
  to: string;
  label: string;
  className?: string;
};

const NAV_ITEMS: NavItem[] = [
  { to: '', label: '서비스 소개' },
  // { to: '', label: '고객 지원' },
];

const NavigationLinks = ({ items }: { items: NavItem[] }) => (
  <div className='flex items-center gap-20'>
    {items.map((item) => (
      <Link key={item.label} to={item.to}>
        <span className='text-xl text-main'>{item.label}</span>
      </Link>
    ))}
  </div>
);

const Header = () => {
  return (
    <>
      <header className='fixed left-0 top-0 z-50 h-[65px] w-full bg-white px-20 shadow-sm'>
        <nav className='flex h-full items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='mr-28'>
              <img src={logo} alt='Livflow 로고' className='h-[60px]' />
            </Link>

            <NavigationLinks items={NAV_ITEMS} />
          </div>

          <Link to='/login'>
            <span className='cursor-pointer text-xl font-semibold text-primary transition-all hover:font-bold hover:text-primary_hover'>
              로그인
            </span>
          </Link>
        </nav>
      </header>

      <main className='mt-[65px] bg-white'>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
