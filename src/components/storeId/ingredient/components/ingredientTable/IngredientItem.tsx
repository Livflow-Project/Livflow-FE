import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import { twMerge } from 'tailwind-merge';
import IconButton from '@/components/common/IconButton';

type IngredientItemProps = {
  index: number;
  ingredient: IngredientResponse;
  isLastItem: boolean;
  isEditMode: boolean;
  onEditIngredient: (transaction: IngredientResponse) => void;
  onDelete: (transaction: IngredientResponse) => void;
};

const IngredientItem = ({
  index,
  ingredient,
  isLastItem,
  isEditMode,
  onEditIngredient,
  onDelete,
}: IngredientItemProps) => (
  <ul
    className={twMerge(
      'table_list',
      !isLastItem && 'border-b border-underline/30'
    )}
  >
    <li className='w-[8%] min-w-20 font-medium'>{index + 1}</li>

    <li className='w-[16%]'>{ingredient.ingredient_name}</li>

    <li className='w-[16%]'>{ingredient.ingredient_cost}</li>

    <li className='w-[16%]'>{ingredient.capacity}</li>

    <li className='w-[6%]'>{ingredient.unit}</li>

    <li className='w-[9%]'>{Math.round(ingredient.unit_cost * 10) / 10}원</li>

    <li className='w-[15%]'>{ingredient.shop}</li>

    <li className='w-[14%]'>{ingredient.ingredient_detail}</li>

    {isEditMode && (
      <li className='table_list_action'>
        <IconButton type='edit' onClick={() => onEditIngredient(ingredient)} />
        <IconButton type='delete' onClick={() => onDelete(ingredient)} />
      </li>
    )}
  </ul>
);

export default IngredientItem;
