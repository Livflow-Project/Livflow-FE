import 'swiper/swiper-bundle.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import RecipeItem from './RecipeItem';
import { createSwiperConfig } from './swiper/swiperConfig';
import { getSwiperStyles } from './swiper/swiperStyles';
import { useGridRows } from '@/hooks/useGridRows';

type RecipeListProps = {
  recipes: CostCalculatorListItem[];
  isDeleteMode?: boolean;
  onDeleteRecipe: (recipeId: string) => void;
  onEditRecipe: (recipeId: string) => void;
};

const RecipeList = ({
  recipes,
  isDeleteMode,
  onDeleteRecipe,
  onEditRecipe,
}: RecipeListProps) => {
  // 화면 높이에 따라 그리드 행 수 조정
  const gridRows = useGridRows();

  // Swiper 설정 생성
  const swiperConfig = createSwiperConfig(gridRows);

  return (
    <div className='flex h-[calc(100%-105px)] w-full items-start justify-center'>
      <style>{getSwiperStyles()}</style>

      <Swiper {...swiperConfig}>
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.recipe_id}>
            <div className='scale-[0.85] transform transition-transform md:scale-90 lg:scale-95 xl:scale-100'>
              <RecipeItem
                recipe={recipe}
                isDeleteMode={isDeleteMode}
                onDelete={() => onDeleteRecipe(recipe.recipe_id)}
                onClick={() => onEditRecipe(recipe.recipe_id)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecipeList;
