import { motion } from 'framer-motion';

const ContentLoadingIndicator = () => {
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
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <motion.div
        className='relative w-20 h-20 origin-center'
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
              className='absolute left-[calc(50%-8px)] top-[calc(50%-8px)] h-4 w-4 origin-center rounded-full bg-primary'
              animate={{ x, y }}
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

export default ContentLoadingIndicator;
