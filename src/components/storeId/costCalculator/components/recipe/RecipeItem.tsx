import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import DeleteButton from '@/components/common/DeleteButton';
import { favoritesIcon } from '@/assets/assets';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type RecipeItemProps = {
  recipe: CostCalculatorListItem;
  isDeleteMode?: boolean;
  onDelete: () => void;
  onClick: () => void;
};

const RecipeItem = ({
  recipe,
  isDeleteMode,
  onDelete,
  onClick,
}: RecipeItemProps) => {
  // const { VITE_IMAGE_REQUEST_URL } = import.meta.env;

  const [hasImageError, setHasImageError] = useState(false);

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
        <div className='absolute flex items-center justify-center rounded-full -left-3 -top-3'>
          <img
            src={favoritesIcon}
            className={twMerge(
              'transition-all duration-200',
              isDeleteMode && 'grayscale'
            )}
          />
        </div>
      )}

      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex items-center justify-center flex-grow overflow-hidden'>
          {recipe.recipe_img && !hasImageError ? (
            <img
              // src={`${VITE_IMAGE_REQUEST_URL}${recipe.recipe_img}`}
              src={`https://api.livflow.co.kr:8443${recipe.recipe_img}`}
              alt={recipe.recipe_name}
              className={twMerge(
                'max-h-full max-w-full rounded object-contain transition-all duration-200',
                isDeleteMode && 'opacity-60 grayscale'
              )}
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className='flex items-center justify-center bg-gray-200 rounded-lg h-36 w-36'>
              <span className='text-gray-400'>
                {recipe.recipe_img ? '이미지 오류' : '이미지 없음'}
              </span>
            </div>
          )}
        </div>

        <div className='flex flex-col items-center justify-center py-2 mt-auto'>
          <h1 className='text-xl font-bold line-clamp-1'>
            {recipe.recipe_name}
          </h1>
          {recipe.recipe_cost && (
            <p className='text-lg'>{recipe.recipe_cost.toLocaleString()}원</p>
          )}
        </div>
      </div>

      {isDeleteMode && (
        <div className='absolute flex items-center justify-center text-3xl rounded-full right-2 top-2 text-red'>
          <DeleteButton onClick={onDelete} />
        </div>
      )}
    </li>
  );
};

export default RecipeItem;
