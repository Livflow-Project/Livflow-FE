// import Footer from '@/components/layout/Footer';

import StartBtn from '@/components/home/StartBtn';
// import { logoText, logoWhale } from '@/assets/assets';
import { test } from '@/assets/assets';

const Home = () => {
  return (
    <div className='h- flex h-[calc(100vh-75px)] items-center justify-center'>
      <div className='flex items-center gap-5'>
        {/* <img
          src={logoWhale}
          alt='메인 로고'
          className='h-[200px] animate-smoothWaveAndSlide'
        />
        <img src={logoText} alt='메인 로고' className='h-[70px]' /> */}
        <img src={test} />
      </div>

      <StartBtn />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
