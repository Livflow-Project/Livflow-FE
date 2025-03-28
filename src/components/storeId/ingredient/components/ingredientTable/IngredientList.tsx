import IngredientItem from './IngredientItem';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';

type IngredientListProps = {
  ingredients: IngredientResponse[];
  isEditMode: boolean;
  onEdit: (ingredient: IngredientResponse) => void;
  onDelete: (ingredient: IngredientResponse) => void;
};

const IngredientList = ({
  ingredients,
  isEditMode,
  onEdit,
  onDelete,
}: IngredientListProps) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className='flex h-[calc(100%-65px)] w-full items-center justify-center text-2xl text-caption'>
        추가된 재료가 없습니다.
      </div>
    );
  }

  return (
    <div className='flex h-[calc(100%-65px)] w-full flex-col overflow-y-auto'>
      {ingredients.map((ingredient, index) => (
        <IngredientItem
          key={ingredient.ingredient_id}
          index={index}
          isLastItem={index === ingredients.length - 1}
          ingredient={ingredient}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default IngredientList;
