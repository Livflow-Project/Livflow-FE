import {
  useDeleteRecipeMutation,
  useGetAllRecipes,
} from '@/api/storeId/costCalculator/costCalculator.hooks';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import ErrorPage from '@/pages/status/errorPage';
import LoadingPage from '@/pages/status/loadindPage';
import MainCostCalculator from './MainCostCalculator';
import RecipeList from './components/recipe/RecipeList';

type MainRecipeProps = {
  storeId: string;
};

const MainRecipe = ({ storeId }: MainRecipeProps) => {
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const {
    data: recipes,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRecipes(storeId || '');

  const deleteRecipeMutation = useDeleteRecipeMutation(storeId || '');

  const handleAddMenu = () => {
    setShowCostCalculator(true);
  };

  const handleSaveMenu = () => {
    setShowCostCalculator(false);
  };

  const handleCancelMenu = () => {
    setShowCostCalculator(false);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipeMutation.mutate(recipeId);
  };

  useEffect(() => {
    // 레시피가 없으면 삭제 모드 비활성화
    if (recipes && recipes.length === 0) {
      setIsDeleteMode(false);
    }
  }, [recipes]);

  if (isLoading || !recipes) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-full flex-col'>
      {showCostCalculator ? (
        <MainCostCalculator
          storeId={storeId}
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
                {recipes && recipes.length > 0 && (
                  <Button onClick={handleDeleteMode}>메뉴 삭제하기</Button>
                )}
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
