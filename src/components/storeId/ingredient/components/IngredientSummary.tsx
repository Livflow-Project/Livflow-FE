import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import { useMemo } from 'react';

type IngredientSummaryProps = {
  ingredients: IngredientResponse[] | undefined;
};

const IngredientSummary: React.FC<IngredientSummaryProps> = ({
  ingredients,
}) => {
  const totalCost = useMemo(() => {
    if (!ingredients?.length) return 0;

    return ingredients.reduce(
      (sum, ingredient) => sum + ingredient.ingredient_cost,
      0
    );
  }, [ingredients]);

  return (
    <ul className='flex h-full w-fit items-center rounded-lg bg-white/50 text-lg text-main'>
      <li className='px-6'>{`총 재료 개수 : ${ingredients?.length ?? 0}개`}</li>
      <div className='h-[40px] w-[1px] bg-caption'></div>
      <li className='px-6'>{`총 비용 : ${totalCost}원`}</li>
    </ul>
  );
};

export default IngredientSummary;
