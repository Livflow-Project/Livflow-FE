import { Link, Outlet } from 'react-router-dom';

import { logo } from '../assets/assets';
import { showErrorToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContextProvider';

// 네비게이션 항목 타입 정의
type NavItem = {
  to: string;
  label: string;
  className?: string;
};

// 네비게이션 항목 데이터
const NAV_ITEMS: NavItem[] = [{ to: '/store', label: '내 스토어' }];

// 네비게이션 링크 컴포넌트
const NavigationLinks = ({ items }: { items: NavItem[] }) => (
  <div className='flex items-center gap-20'>
    {items.map((item) => (
      <Link key={item.label} to={item.to} onClick={() => toast.dismiss()}>
        <span className={`text-[25px] text-main`}>{item.label}</span>
      </Link>
    ))}
  </div>
);

const UserHeader = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      toast.dismiss();
      await logout();
    } catch (error) {
      showErrorToast('로그아웃에 실패했습니다.');
    }
  };

  return (
    <>
      <header className='fixed left-0 top-0 z-50 h-[75px] w-full bg-white px-20 shadow-sm'>
        <nav className='flex h-full items-center justify-between'>
          {/* 왼쪽 영역: 로고 + 네비게이션 */}
          <div className='flex items-center'>
            <Link to='/' onClick={() => toast.dismiss()} className='mr-28'>
              <img src={logo} alt='Livflow 로고' className='h-[70px]' />
            </Link>

            <NavigationLinks items={NAV_ITEMS} />
          </div>

          {/* 오른쪽 영역: 로그아웃 버튼 */}
          <span
            onClick={handleLogout}
            className='cursor-pointer text-[25px] font-semibold text-primary transition-all hover:font-bold hover:text-primary_hover'
          >
            로그아웃
          </span>
        </nav>
      </header>

      <main className='mt-[75px]'>
        <Outlet />
      </main>
    </>
  );
};

export default UserHeader;
