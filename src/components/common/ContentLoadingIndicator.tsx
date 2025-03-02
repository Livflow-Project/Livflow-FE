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
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <motion.div
        className='relative h-20 w-20'
        variants={containerVariants}
        animate='animate'
        style={{ transformOrigin: 'center' }}
      >
        {[...Array(6)].map((_, i) => {
          const angle = i * 60 * (Math.PI / 180);
          const x = Math.cos(angle) * 30;
          const y = Math.sin(angle) * 30;

          return (
            <div
              key={i}
              className='absolute h-4 w-4 rounded-full bg-primary'
              style={{
                left: 'calc(50% - 8px)',
                top: 'calc(50% - 8px)',
                transform: `translate(${x}px, ${y}px)`,
                transformOrigin: 'center',
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

export default ContentLoadingIndicator;
