import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';

type ActionButtonsProps = {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onModalOpen: () => void;
  hasTransactions?: boolean;
};

const ActionButtons = ({
  isEditMode,
  onToggleEditMode,
  onModalOpen,
  hasTransactions = false,
}: ActionButtonsProps) => {
  if (isEditMode) {
    return (
      <div className={'flex w-full items-center justify-end p-5'}>
        <Button onClick={onToggleEditMode}>완료하기</Button>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        'flex w-full items-center p-5',
        hasTransactions ? 'justify-between' : 'justify-end'
      )}
    >
      <Button onClick={onModalOpen}>지출 / 수입 추가하기</Button>
      {hasTransactions && (
        <Button onClick={onToggleEditMode}>수정 / 삭제 하기</Button>
      )}
    </div>
  );
};

export default ActionButtons;
