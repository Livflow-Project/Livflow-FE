import { motion } from 'framer-motion';
import { storeIcons } from '@/assets/assets';
import { twMerge } from 'tailwind-merge';

type AddStoreProps = {
  onOpenModal: () => void;
  isDeleteMode: boolean;
};

const AddStore = ({ onOpenModal, isDeleteMode }: AddStoreProps) => {
  return (
    <motion.button
      type='button'
      onClick={() => {
        if (!isDeleteMode) onOpenModal();
      }}
      className={twMerge(
        'store_box flex items-center justify-center',
        isDeleteMode && 'pointer-events-none cursor-default opacity-50'
      )}
      whileHover='hover'
      initial='rest'
      animate='rest'
    >
      <div className='flex flex-col items-center justify-between gap-9'>
        <motion.img
          src={storeIcons.plusButton}
          alt='플러스 이미지'
          className='w-[50px]'
          variants={{
            rest: { scale: 1.1 },
            hover: { scale: 1.4 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
        <span className='text-lg font-normal text-caption'>
          스토어 추가하기
        </span>
      </div>
    </motion.button>
  );
};

export default AddStore;
