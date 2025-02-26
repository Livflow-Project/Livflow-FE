import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import DeleteButton from '@/components/common/DeleteButton';
import { twMerge } from 'tailwind-merge';

type RecipeItemProps = {
  recipe: CostCalculatorListItem;
  isDeleteMode: boolean;
  onDelete: () => void;
};

const RecipeItem = ({ recipe, isDeleteMode, onDelete }: RecipeItemProps) => {
  return (
    <li
      className={twMerge(
        'border-gray relative h-[250px] w-[200px] rounded-lg border border-opacity-20 bg-white shadow-xl',
        isDeleteMode && 'border-none bg-gray-400/50'
      )}
    >
      <div className='p-4'>
        <h3 className='font-bold'>{recipe.recipe_name}</h3>
        {recipe.recipe_cost && <p>원가: {recipe.recipe_cost}원</p>}
        {recipe.recipe_img && (
          <img
            src={recipe.recipe_img}
            alt={recipe.recipe_name}
            className='mt-2 h-32 w-full rounded object-cover'
          />
        )}
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
