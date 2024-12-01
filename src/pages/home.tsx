// import Footer from '@/components/layout/Footer';

import { motion } from 'framer-motion';
import StartBtn from '@/components/home/StartBtn';
import { logoText, logoWhale } from '@/assets/assets';

const Home = () => {
  return (
    <div className='h- flex h-[calc(100vh-75px)] items-center justify-center'>
      <div className='flex items-center gap-5'>
        <img src={logoWhale} alt='메인 로고' className='h-[200px]' />
        <motion.img
          src={logoText}
          alt='메인 로고'
          className='h-[70px]'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: 'easeOut',
          }}
        />
      </div>

      <StartBtn />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
