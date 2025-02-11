import IngredientItem from './IngredientItem';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';

type IngredientListProps = {
  ingredients: IngredientResponse[] | null;
  isEditMode: boolean;
  onEdit: (ingredient: IngredientResponse) => void;
  onDelete: (ingredient: IngredientResponse) => void;
};

const IngredientList = ({
  ingredients,
  isEditMode,
  onEdit,
  onDelete,
}: IngredientListProps) => (
  <div className='flex h-[calc(100%-130px)] w-full flex-col'>
    {ingredients && ingredients.length > 0 ? (
      ingredients.map((ingredient, index) => (
        <IngredientItem
          key={ingredient.ingredient_id}
          index={index}
          ingredient={ingredient}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className='my-auto w-full text-center text-2xl text-main'>
        입력된 재료가 없습니다.
      </div>
    )}
  </div>
);

export default IngredientList;
