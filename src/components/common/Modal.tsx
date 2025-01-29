import { toast } from 'react-toastify';

type ModalProps = {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, onSubmit, children }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      toast.dismiss();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <form onSubmit={onSubmit} className={`modal_div flex flex-col gap-7`}>
        {children}
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
