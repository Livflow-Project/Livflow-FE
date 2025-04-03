import { toast } from 'react-toastify';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef } from 'react';

type ModalProps = {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, onSubmit, children }: ModalProps) => {
  const modalRef = useRef<HTMLFormElement | null>(null);

  useClickOutside(modalRef, () => {
    onClose();
    toast.dismiss();
  });

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'>
      <form
        ref={modalRef}
        onSubmit={onSubmit}
        autoComplete='off'
        className='modal_div flex w-[520px] flex-col gap-7'
      >
        <ul className='flex flex-col gap-4'>{children}</ul>
        <div className='button_gap'>
          <button
            type='button'
            onClick={() => {
              onClose();
              toast.dismiss();
            }}
            className='choice_button opacity-70'
          >
            취소
          </button>
          <button type='submit' className='choice_button'>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
