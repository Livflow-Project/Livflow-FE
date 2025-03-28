import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';

interface ActionButtonsProps {
  hasIngredients: boolean;
  isEditMode: boolean;
  onAddClick: () => void;
  onEditModeToggle: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  hasIngredients,
  isEditMode,
  onAddClick,
  onEditModeToggle,
}) => {
  return (
    <div className='flex items-center'>
      {(!hasIngredients || !isEditMode) && (
        <Button onClick={onAddClick} aria-label='재료 추가하기'>
          재료 추가하기
        </Button>
      )}
      {hasIngredients && (
        <div className={twMerge('flex gap-5', !isEditMode && 'ml-5')}>
          <Button
            onClick={onEditModeToggle}
            aria-pressed={isEditMode}
            aria-label={isEditMode ? '수정 모드 종료' : '수정 모드 시작'}
          >
            {isEditMode ? '완료하기' : '수정 / 삭제하기'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
