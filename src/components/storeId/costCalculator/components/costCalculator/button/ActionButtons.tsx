import Button from '@/components/common/Button';

type ActionButtonsProps = {
  viewMode: 'list' | 'calculator' | 'delete';
  hasRecipes: boolean;
  onAddRecipe: () => void;
  onToggleDeleteMode: () => void;
};

const ActionButtons = ({
  viewMode,
  hasRecipes,
  onAddRecipe,
  onToggleDeleteMode,
}: ActionButtonsProps) => {
  return (
    <div className='flex items-center justify-center gap-20 py-[30px]'>
      {viewMode === 'delete' ? (
        <Button onClick={onToggleDeleteMode}>완료하기</Button>
      ) : (
        <>
          <Button onClick={onAddRecipe}>메뉴 추가하기</Button>
          {hasRecipes && (
            <Button onClick={onToggleDeleteMode}>메뉴 삭제하기</Button>
          )}
        </>
      )}
    </div>
  );
};

export default ActionButtons;
