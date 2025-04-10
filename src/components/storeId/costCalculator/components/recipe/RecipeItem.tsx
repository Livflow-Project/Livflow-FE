import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import IconButton from '@/components/common/IconButton';
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
  const VITE_IMAGE_REQUEST_URL = 'https://api.livflow.co.kr:8443';

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

      <div className='flex h-full w-full flex-col items-center gap-2'>
        <div className='flex h-[calc(100%-63px)] w-full flex-grow items-center justify-center rounded-lg'>
          {recipe.recipe_img && !hasImageError ? (
            <img
              src={VITE_IMAGE_REQUEST_URL + recipe.recipe_img}
              alt={recipe.recipe_name}
              className={twMerge(
                'max-h-full max-w-full rounded object-contain transition-all duration-200',
                isDeleteMode && 'opacity-60 grayscale'
              )}
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-gray-200'>
              <span className='text-sm text-caption/30'>
                {recipe.recipe_img ? '이미지 오류' : '이미지 없음'}
              </span>
            </div>
          )}
        </div>

        <div className='flex h-[55px] flex-col items-center justify-center text-center'>
          <h2 className='line-clamp-1 text-lg font-bold'>
            {recipe.recipe_name}
          </h2>
          {recipe.recipe_cost && (
            <p className='line-clamp-1 text-caption'>
              {recipe.recipe_cost.toLocaleString()}원
            </p>
          )}
        </div>
      </div>

      {isDeleteMode && (
        <div className='absolute right-2 top-2 flex items-center justify-center rounded-full text-3xl text-red'>
          <IconButton type='delete' onClick={onDelete} />
        </div>
      )}
    </li>
  );
};

export default RecipeItem;
