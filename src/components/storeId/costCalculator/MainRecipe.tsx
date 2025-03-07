import Button from '@/components/common/Button';
import ErrorPage from '@/pages/status/errorPage';
import LoadingPage from '@/pages/status/loadindPage';
import MainCostCalculator from './MainCostCalculator';
import RecipeList from './components/recipe/RecipeList';
import { useRecipeManagement } from '@/hooks/useRecipeManagement';

const MainRecipe = () => {
  const {
    recipes,
    isLoading,
    isError,
    error,
    refetch,
    showCostCalculator,
    isDeleteMode,
    handleAddMenu,
    handleEditRecipe,
    handleSaveMenu,
    handleCancelMenu,
    handleDeleteMode,
    handleDeleteRecipe,
  } = useRecipeManagement();

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
          onSave={handleSaveMenu}
          onCancel={handleCancelMenu}
          editOnly={false}
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
            onEditRecipe={handleEditRecipe}
          />
        </>
      )}
    </div>
  );
};

export default MainRecipe;
