import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';

type ActionButtonsProps = {
  hasIngredients: boolean;
  isEditMode: boolean;
  onAddIngredient: () => void;
  onToggleEditMode: () => void;
};

const ActionButtons = ({
  hasIngredients,
  isEditMode,
  onAddIngredient,
  onToggleEditMode,
}: ActionButtonsProps) => {
  return (
    <div className='flex items-center'>
      {(!hasIngredients || !isEditMode) && (
        <Button onClick={onAddIngredient} aria-label='재료 추가하기'>
          재료 추가하기
        </Button>
      )}
      {hasIngredients && (
        <div className={twMerge('flex gap-5', !isEditMode && 'ml-5')}>
          <Button
            onClick={onToggleEditMode}
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
