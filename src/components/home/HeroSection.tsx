import { homeIcons } from '@/assets/assets';

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className='relative flex h-[calc(100dvh-65px)] w-full flex-col items-center justify-center bg-gradient-to-b from-white to-main/5'>
      <motion.h1
        className='mb-2 text-center text-[40px] font-bold text-main'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        효율적인 비즈니스 관리를 위한 올인원 웹 서비스
      </motion.h1>

      <motion.p
        className='text-center text-base text-gray-600 md:text-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        복잡한 엑셀 작업은 이제 그만! 간편하고 직관적인 인터페이스로 사업 관리의
        번거로움을 줄여드립니다.
      </motion.p>

      <motion.div
        className='mt-16 flex items-center justify-center gap-5'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.img
          src={homeIcons.logoWhale}
          alt='메인 로고'
          className='h-[260px] drop-shadow-xl filter'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 1,
          }}
        />
        <motion.img
          src={homeIcons.logoText}
          alt='메인 로고'
          className='h-[70px]'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      <motion.div
        className='absolute bottom-10 left-0 right-0 mx-auto w-max'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <a
          href='#features'
          className='flex flex-col items-center text-main/70 transition-colors hover:text-main'
        >
          <span className='mb-2'>더 알아보기</span>
          <svg
            className='h-6 w-6 animate-bounce'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default HeroSection;
