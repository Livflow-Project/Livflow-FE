import { toast } from 'react-toastify';

type ConfirmModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
};

const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  children,
}: ConfirmModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      toast.dismiss();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
    toast.dismiss();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <div className='modal_div flex w-[520px] flex-col gap-7'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <div className='flex flex-col gap-4'>{children}</div>
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
          <button
            type='button'
            onClick={handleConfirm}
            className='modal_delete_button'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
