import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import RecipeItem from './RecipeItem';

type RecipeListProps = {
  recipes: CostCalculatorListItem[];
  isDeleteMode: boolean;
  onDeleteRecipe: (recipeId: string) => void;
  onEditRecipe: (recipeId: string) => void;
};

const RecipeList = ({
  recipes,
  isDeleteMode,
  onDeleteRecipe,
  onEditRecipe,
}: RecipeListProps) => {
  return (
    <div className='flex items-start justify-center'>
      <ul className='grid grid-cols-4 gap-x-20 gap-y-10'>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.recipe_id}
            recipe={recipe}
            isDeleteMode={isDeleteMode}
            onDelete={() => onDeleteRecipe(recipe.recipe_id)}
            onClick={() => onEditRecipe(recipe.recipe_id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
