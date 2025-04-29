import 'swiper/swiper-bundle.css';
import './swiper/swiperStyles.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { CostCalculatorListItem } from '@/api/storeId/costCalculator/costCalculator.type';
import RecipeItem from './RecipeItem';
import { createSwiperConfig } from './swiper/swiperConfig';
import { useGridRows } from '../../hooks/useGridRows';

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
  const gridRows = useGridRows();

  const swiperConfig = createSwiperConfig(gridRows);

  if (!recipes || recipes.length === 0) {
    return (
      <div className='flex h-[calc(100%-90px)] w-full items-center justify-center text-lg text-caption'>
        추가된 메뉴가 없습니다.
      </div>
    );
  }

  return (
    <div className='flex h-[calc(100%-90px)] w-full items-start justify-center'>
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
