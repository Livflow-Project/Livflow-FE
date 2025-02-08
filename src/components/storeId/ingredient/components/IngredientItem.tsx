import DeleteButton from '@/components/common/DeleteButton';
import EditButton from '@/components/common/EditButton';
import { IngredientsDetailResponse } from '@/api/storeId/ingredients/ingredients.type';

type IngredientItemProps = {
  index: number;
  ingredient: IngredientsDetailResponse;
  isEditMode: boolean;
  onEdit: (transaction: IngredientsDetailResponse) => void;
  onDelete: (transaction: IngredientsDetailResponse) => void;
};

const IngredientItem = ({
  index,
  ingredient,
  isEditMode,
  onEdit,
  onDelete,
}: IngredientItemProps) => (
  <ul className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center'>
    <li className='w-[8%] min-w-20 text-lg font-normal'>{index + 1}</li>

    <li className='w-[16%] text-lg font-normal'>
      {ingredient.ingredient_name}
    </li>

    <li className='w-[16%] text-lg font-normal'>
      {ingredient.ingredient_cost}
    </li>

    <li className='w-[16%] text-lg font-normal'>{ingredient.capacity}</li>

    <li className='w-[6%] text-lg font-normal'>{ingredient.unit}</li>

    <li className='w-[9%] text-lg font-normal'>{ingredient.unit_cost} 원</li>

    <li className='w-[15%] text-lg font-normal'>{ingredient.shop}</li>

    <li className='w-[14%] text-lg font-normal'>
      {ingredient.ingredient_detail}
    </li>

    {isEditMode && (
      <li className='absolute inset-0 flex items-center bg-white/50'>
        <nav className='flex w-[8%] min-w-20 items-center justify-center gap-1'>
          <EditButton onClick={() => onEdit(ingredient)} />
          <DeleteButton onClick={() => onDelete(ingredient)} />
        </nav>
      </li>
    )}
  </ul>
);

export default IngredientItem;
