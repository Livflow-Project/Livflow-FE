import { useNavigate, useParams } from 'react-router-dom';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import MainCostCalculator from '../../MainCostCalculator';
import { useGetRecipe } from '@/api/storeId/costCalculator/costCalculator.hooks';
import { useStore } from '@/contexts/StoreContext';

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { storeInfo } = useStore();
  const storeId = storeInfo?.id || '';

  const {
    data: recipeDetail,
    isLoading,
    isError,
    error,
  } = useGetRecipe(storeId, recipeId || '');

  const handleSave = () => {
    navigate(`/store/${storeId}/recipe`);
  };

  const handleCancel = () => {
    navigate(`/store/${storeId}/recipe`);
  };

  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorPage error={error as Error} resetError={() => handleCancel()} />
    );
  }

  return (
    <MainCostCalculator
      onSave={handleSave}
      onCancel={handleCancel}
      recipeData={recipeDetail}
      editOnly={true}
    />
  );
};

export default RecipeDetail;
