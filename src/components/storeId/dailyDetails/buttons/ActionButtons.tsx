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
        <button onClick={onEditModeToggle} className='soft_BcolorSet w-[25%]'>
          완료하기
        </button>
      </div>
    );
  }

  return (
    <div className='flex w-full items-center justify-between px-[25px] pb-[20px]'>
      <button onClick={onModalOpen} className='soft_BcolorSet w-[40%]'>
        지출 / 수입 추가하기
      </button>
      <button onClick={onEditModeToggle} className='soft_BcolorSet w-[25%]'>
        수정 / 삭제 하기
      </button>
    </div>
  );
};

export default ActionButtons;
