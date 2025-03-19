import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';

type ActionButtonsProps = {
  isEditMode: boolean;
  onEditModeToggle: () => void;
  onModalOpen: () => void;
  hasTransactions?: boolean;
};

const ActionButtons = ({
  isEditMode,
  onEditModeToggle,
  onModalOpen,
  hasTransactions = false,
}: ActionButtonsProps) => {
  if (isEditMode) {
    return (
      <div
        className={twMerge(
          'flex w-full items-center justify-end px-[25px]',
          hasTransactions ? 'py-[20px]' : 'pb-[20px]'
        )}
      >
        <Button onClick={onEditModeToggle}>완료하기</Button>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        'flex w-full items-center px-[25px]',
        hasTransactions ? 'justify-between py-[20px]' : 'justify-end pb-[20px]'
      )}
    >
      <Button onClick={onModalOpen}>지출 / 수입 추가하기</Button>
      {hasTransactions && (
        <Button onClick={onEditModeToggle}>수정 / 삭제 하기</Button>
      )}
    </div>
  );
};

export default ActionButtons;
