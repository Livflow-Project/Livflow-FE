import Button from '@/components/common/Button';

type ActionButtonsProps = {
  isEditMode: boolean;
  onEditModeToggle: () => void;
  onModalOpen: () => void;
};

const ActionButtons = ({
  isEditMode,
  onEditModeToggle,
  onModalOpen,
}: ActionButtonsProps) => {
  if (isEditMode) {
    return (
      <div className='flex w-full items-center justify-end px-[25px] pb-[20px]'>
        <Button onClick={onEditModeToggle}>완료하기</Button>
      </div>
    );
  }

  return (
    <div className='flex w-full items-center justify-between px-[25px] pb-[20px]'>
      <Button onClick={onModalOpen}>지출 / 수입 추가하기</Button>
      <Button onClick={onEditModeToggle}>수정 / 삭제 하기</Button>
    </div>
  );
};

export default ActionButtons;
