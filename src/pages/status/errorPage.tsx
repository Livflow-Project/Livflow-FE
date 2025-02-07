import errorIcon from '@/assets/status/error.svg';
import { motion } from 'framer-motion';

type ErrorPageProps = {
  error?: Error;
  resetError?: () => void;
};

const ErrorPage = ({ error, resetError }: ErrorPageProps) => {
  return (
    <div className='flex h-svh items-center justify-center bg-gray-50'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className='flex max-w-md flex-col items-center px-6 text-center'
      >
        <motion.img
          src={errorIcon}
          alt='Error'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className='mb-6 h-44 w-44'
        />

        <motion.div className='text-red-300 mb-4 text-7xl font-bold'>
          Error
        </motion.div>

        <motion.h2 className='mb-4 text-xl font-medium text-gray-700'>
          예기치 못한 오류가 발생했습니다
        </motion.h2>

        <motion.p className='mb-6 max-w-xs text-center text-gray-500'>
          {error?.message || '알 수 없는 오류가 발생했습니다.'}
        </motion.p>

        {resetError && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-red-500 hover:bg-red-600 rounded-full px-6 py-2 text-white transition-colors'
            onClick={resetError}
          >
            다시 시도
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
