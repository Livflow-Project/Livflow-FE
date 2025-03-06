import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import DeleteButton from '@/components/common/DeleteButton';
import { favoritesIcon } from '@/assets/assets';
import { twMerge } from 'tailwind-merge';

type RecipeItemProps = {
  recipe: CostCalculatorListItem;
  isDeleteMode: boolean;
  onDelete: () => void;
  onClick: () => void;
};

const RecipeItem = ({
  recipe,
  isDeleteMode,
  onDelete,
  onClick,
}: RecipeItemProps) => {
  const handleClick = () => {
    if (!isDeleteMode) {
      onClick();
    }
  };

  return (
    <li
      className={twMerge(
        'recipe_box',
        isDeleteMode && 'border-none bg-gray-400'
      )}
      onClick={handleClick}
    >
      {recipe.is_favorites && (
        <div className='absolute -left-3 -top-3 flex items-center justify-center rounded-full'>
          <img
            src={favoritesIcon}
            className={twMerge(
              'transition-all duration-200',
              isDeleteMode && 'grayscale'
            )}
          />
        </div>
      )}

      <div className='flex h-full w-full flex-col items-center'>
        <div className='flex flex-grow items-center justify-center overflow-hidden'>
          {recipe.recipe_img ? (
            <img
              src={recipe.recipe_img}
              alt={recipe.recipe_name}
              className={twMerge(
                'max-h-full max-w-full rounded object-contain transition-all duration-200',
                isDeleteMode && 'opacity-60 grayscale'
              )}
            />
          ) : (
            <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-200'>
              <span className='text-gray-400'>이미지 없음</span>
            </div>
          )}
        </div>

        <div className='mt-auto flex flex-col items-center justify-center py-2'>
          <h1 className='line-clamp-1 text-xl font-bold'>
            {recipe.recipe_name}
          </h1>
          {recipe.recipe_cost && (
            <p className='text-lg'>{recipe.recipe_cost.toLocaleString()}원</p>
          )}
        </div>
      </div>

      {isDeleteMode && (
        <div className='absolute right-2 top-2 flex items-center justify-center rounded-full text-3xl text-red'>
          <DeleteButton onClick={onDelete} />
        </div>
      )}
    </li>
  );
};

export default RecipeItem;
