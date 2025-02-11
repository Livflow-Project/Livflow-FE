import { motion } from 'framer-motion';

const LoadingPage = () => {
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className='fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white'>
      <motion.div
        className='relative h-20 w-20'
        variants={containerVariants}
        animate='animate'
        style={{ transformOrigin: 'center' }} // 회전 중심점 설정
      >
        {[...Array(6)].map((_, i) => {
          const angle = i * 60 * (Math.PI / 180);
          const x = Math.cos(angle) * 30;
          const y = Math.sin(angle) * 30;

          return (
            <div // motion.div에서 일반 div로 변경
              key={i}
              className='absolute h-4 w-4 rounded-full bg-primary'
              style={{
                left: 'calc(50% - 8px)', // 원의 크기(16px)의 절반만큼 조정
                top: 'calc(50% - 8px)',
                transform: `translate(${x}px, ${y}px)`,
                transformOrigin: 'center', // 각 원의 회전 중심점도 설정
              }}
            />
          );
        })}
      </motion.div>
      <p className='mt-6 text-2xl font-medium text-gray-700'>
        잠시만 기다려주세요
      </p>
    </div>
  );
};

export default LoadingPage;
