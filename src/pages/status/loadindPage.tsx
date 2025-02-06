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
    <div className='flex h-screen flex-col items-center justify-center bg-white'>
      <motion.div
        className='relative h-20 w-20'
        variants={containerVariants}
        animate='animate'
      >
        {[...Array(6)].map((_, i) => {
          const angle = i * 60 * (Math.PI / 180);
          const x = Math.cos(angle) * 30;
          const y = Math.sin(angle) * 30;

          return (
            <motion.div
              key={i}
              className='absolute h-3 w-3 rounded-full bg-primary'
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
              }}
            />
          );
        })}
      </motion.div>
      <p className='mt-4'>잠시만 기다려주세요</p>
    </div>
  );
};

export default LoadingPage;
