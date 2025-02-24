import RecipeItem from './RecipeItem';

type Recipe = {
  id: number;
  // 추가적인 레시피 정보를 여기에 넣을 수 있습니다.
};

type RecipeListProps = {
  recipes: Recipe[];
  isDeleteMode: boolean;
  onDeleteRecipe: (id: number) => void;
};

const RecipeList = ({
  recipes,
  isDeleteMode,
  onDeleteRecipe,
}: RecipeListProps) => {
  return (
    <div className='flex items-start justify-center'>
      <ul className='grid grid-cols-4 gap-x-20 gap-y-10'>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            isDeleteMode={isDeleteMode}
            onDelete={() => onDeleteRecipe(recipe.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
