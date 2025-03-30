import {
  useDeleteRecipeMutation,
  useGetAllRecipes,
} from '@/api/storeId/costCalculator/costCalculator.hooks';
import { useNavigate, useOutletContext } from 'react-router-dom';

import ActionButtons from './components/costCalculator/button/ActionButtons';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import MainCostCalculator from './MainCostCalculator';
import RecipeList from './components/recipe/RecipeList';
import { toast } from 'react-toastify';
import { useState } from 'react';

type ViewMode = 'list' | 'calculator' | 'delete';

const MainRecipe = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const navigate = useNavigate();

  const { storeId } = useOutletContext<{ storeId: string }>();

  if (!storeId) {
    return (
      <ErrorPage
        error={new Error('스토어 아이디가 없습니다.')}
        resetError={() => {}}
      />
    );
  }

  const {
    data: recipes,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRecipes(storeId);

  const deleteRecipeMutation = useDeleteRecipeMutation(storeId);

  const handleAddRecipe = () => {
    toast.dismiss();
    setViewMode('calculator');
  };

  const handleEditRecipe = (recipeId: string) => {
    toast.dismiss();
    navigate(`/store/${storeId}/recipe/${recipeId}`);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipeMutation.mutate(recipeId, {
      onSuccess: () => {
        // 마지막 레시피였다면 삭제 모드 비활성화
        if (recipes?.length === 1) {
          setViewMode('list');
        }
        refetch();
      },
    });
  };

  const handleSaveRecipe = () => {
    setViewMode('list');
    refetch();
  };

  const handleCancelRecipe = () => {
    toast.dismiss();
    setViewMode('list');
  };

  const handleToggleDeleteMode = () => {
    toast.dismiss();
    setViewMode(viewMode === 'delete' ? 'list' : 'delete');
  };

  if (isLoading || !recipes) {
    return <ContentLoadingIndicator />;
  }

  if (isError) {
    return <ErrorPage error={error as Error} resetError={refetch} />;
  }

  // 원가계산 모드일 때 렌더링
  if (viewMode === 'calculator') {
    return (
      <MainCostCalculator
        onSave={handleSaveRecipe}
        onCancel={handleCancelRecipe}
        editOnly={false}
      />
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <ActionButtons
        viewMode={viewMode}
        hasRecipes={!!recipes?.length}
        onToggleDeleteMode={handleToggleDeleteMode}
        onAddRecipe={handleAddRecipe}
      />

      <RecipeList
        recipes={recipes}
        isDeleteMode={viewMode === 'delete'}
        onDeleteRecipe={handleDeleteRecipe}
        onEditRecipe={handleEditRecipe}
      />
    </div>
  );
};

export default MainRecipe;
