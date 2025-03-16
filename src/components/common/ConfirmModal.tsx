import { toast } from 'react-toastify';

type ConfirmModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
};

const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  children,
  confirmText = '확인',
  cancelText = '취소',
  isDanger = false,
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
            className='choice_button opacity-70'
          >
            {cancelText}
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            className={`choice_button ${isDanger ? 'bg-red/70 hover:bg-red' : ''}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
