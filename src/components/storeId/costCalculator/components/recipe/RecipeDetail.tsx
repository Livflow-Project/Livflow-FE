import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import MainCostCalculator from '../../MainCostCalculator';
import { toast } from 'react-toastify';
import { useGetRecipe } from '@/api/storeId/costCalculator/costCalculator.hooks';

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { storeId } = useOutletContext<{ storeId: string }>();

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
    toast.dismiss();
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
