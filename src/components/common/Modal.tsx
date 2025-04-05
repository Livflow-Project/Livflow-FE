import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef } from 'react';

type ModalProps = {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const Modal = ({ onClose, onSubmit, children }: ModalProps) => {
  const modalRef = useRef<HTMLFormElement>(null);

  useClickOutside(modalRef, () => {
    onClose();
    toast.dismiss();
  });

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      variants={backdrop}
      initial='hidden'
      animate='visible'
    >
      <motion.form
        ref={modalRef}
        onSubmit={onSubmit}
        autoComplete='off'
        className='modal_div flex w-[520px] flex-col gap-7'
        variants={modal}
        initial='hidden'
        animate='visible'
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <ul className='flex flex-col gap-4'>{children}</ul>
        <div className='button_gap'>
          <button
            type='button'
            onClick={() => {
              onClose();
              toast.dismiss();
            }}
            className='modal_cancel_button'
          >
            취소
          </button>
          <button type='submit' className='modal_choice_button'>
            완료
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Modal;
