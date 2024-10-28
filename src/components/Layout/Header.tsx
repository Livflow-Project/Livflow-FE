import Logo from '/public/Logo.svg';

const Header = () => {
  return (
    <header className='fixed left-0 top-0 h-[75px] w-[100%] bg-white px-[80px] shadow-sm'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={Logo} alt='Livflow 로고' className='h-[70px]' />
          <span className='text-main ml-[150px] text-[25px]'>서비스 소개</span>
          <span className='text-main ml-[80px] text-[25px]'>고객 지원</span>
        </div>
        <button className='text-primary hover:text-primary_hover rounded-full px-2 py-1 text-[25px] font-semibold'>
          로그인
        </button>
      </nav>
    </header>
  );
};

export default Header;
