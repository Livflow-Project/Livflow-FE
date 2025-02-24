import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import MainCostCalculator from './MainCostCalculator';
import RecipeList from './components/recipe/RecipeList';

type Recipe = {
  id: number;
};

const MainRecipe = () => {
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleAddMenu = () => {
    setShowCostCalculator(true);
  };

  const handleSaveMenu = () => {
    setRecipes((prevRecipes) => [...prevRecipes, { id: Date.now() }]);
    setShowCostCalculator(false);
  };

  const handleCancelMenu = () => {
    setShowCostCalculator(false);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = prevRecipes.filter((recipe) => recipe.id !== id);
      if (updatedRecipes.length === 0) {
        setIsDeleteMode(false); // 모든 레시피가 삭제되면 삭제 모드 종료
      }
      return updatedRecipes;
    });
  };

  useEffect(() => {
    if (recipes.length === 0) {
      setIsDeleteMode(false);
    }
  }, [recipes]);

  return (
    <div className='flex h-full flex-col'>
      {showCostCalculator ? (
        <MainCostCalculator
          onSave={handleSaveMenu}
          onCancel={handleCancelMenu}
        />
      ) : (
        <>
          <div className='flex items-center justify-center gap-20 py-[30px]'>
            {isDeleteMode ? (
              <Button onClick={handleDeleteMode}>완료하기</Button>
            ) : (
              <>
                <Button onClick={handleAddMenu}>메뉴 추가하기</Button>
                <Button onClick={handleDeleteMode}>메뉴 삭제하기</Button>
              </>
            )}
          </div>

          <RecipeList
            recipes={recipes}
            isDeleteMode={isDeleteMode}
            onDeleteRecipe={handleDeleteRecipe}
          />
        </>
      )}
    </div>
  );
};

export default MainRecipe;
