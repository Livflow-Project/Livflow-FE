import { HttpResponse, http } from 'msw';

type CostCalCulatorsResponse = {
  recipe_id: string; // UUID
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: string;
};

type CostCalCulatorResponse = {
  recipe_id: string; // UUID
  recipe_name: string;
  recipe_cost?: number;
  recipe_img?: string;
  ingredients?: RecipeIngredient[];
  total_ingredient_cost?: number;
  production_quantity?: number;
  production_cost?: number;
};

// 레시피에 사용되는 재료 정보
type RecipeIngredient = {
  ingredient_id: string;
  ingredient_name: string;
  required_amount: number;
  unit: 'ml' | 'g' | 'ea';
};

type CostCalCulatorRequest = Omit<CostCalCulatorResponse, 'recipe_id'>;

const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

const MOCK_RECIPES_LIST: Record<string, CostCalCulatorsResponse[]> = {
  [STORE_IDS.STORE_1]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      recipe_img: 'americano.jpg',
    },
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '카페라떼',
      recipe_cost: 2500,
      recipe_img: 'latte.jpg',
    },
  ],

  [STORE_IDS.STORE_2]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      recipe_img: 'americano.jpg',
    },
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '카페라떼',
      recipe_cost: 2500,
      recipe_img: 'latte.jpg',
    },
  ],
  [STORE_IDS.STORE_3]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      recipe_img: 'americano.jpg',
    },
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '카페라떼',
      recipe_cost: 2500,
      recipe_img: 'latte.jpg',
    },
  ],
};

const MOCK_RECIPE_DETAILS: Record<string, CostCalCulatorResponse[]> = {
  [STORE_IDS.STORE_1]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      ingredients: [
        {
          ingredient_id: crypto.randomUUID(),
          ingredient_name: '우유',
          required_amount: 1000,
          unit: 'ml',
        },
      ],
      total_ingredient_cost: 1000,
      production_quantity: 1,
      production_cost: 1500,
    },
  ],
  [STORE_IDS.STORE_2]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      recipe_img: 'americano.jpg',
      ingredients: [
        {
          ingredient_id: crypto.randomUUID(),
          ingredient_name: '우유',
          required_amount: 1000,
          unit: 'ml',
        },
      ],
      total_ingredient_cost: 1000,
      production_quantity: 1,
      production_cost: 1500,
    },
  ],
  [STORE_IDS.STORE_3]: [
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '아메리카노',
      recipe_cost: 1500,
      recipe_img: 'americano.jpg',
      ingredients: [
        {
          ingredient_id: crypto.randomUUID(),
          ingredient_name: '우유',
          required_amount: 1000,
          unit: 'ml',
        },
      ],
      total_ingredient_cost: 1000,
      production_quantity: 1,
      production_cost: 1500,
    },
  ],
};

export const costCalculatorHandlers = [
  // 모든 레시피 조회
  http.get('/costcalcul/:storeId', ({ params }) => {
    const { storeId } = params;
    const recipes = MOCK_RECIPES_LIST[storeId as string];

    if (!recipes) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(recipes);
  }),

  // 특정 레시피 정보 조회
  http.get('/costcalcul/:storeId/:recipesId', ({ params }) => {
    const { storeId, recipeId } = params;
    const recipes = MOCK_RECIPE_DETAILS[storeId as string];

    if (!recipes) {
      return new HttpResponse(null, { status: 404 });
    }

    const recipe = recipes.find((r) => r.recipe_id === recipeId);

    if (!recipe) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(recipe);
  }),

  // 새로운 레시피 원가 정보 추가
  http.post('/costcalcul/:storeId', async ({ params, request }) => {
    const storeId = params.storeId as string;
    const newRecipe = (await request.json()) as CostCalCulatorRequest;

    if (!MOCK_RECIPE_DETAILS[storeId]) {
      MOCK_RECIPE_DETAILS[storeId] = [];
    }

    const completeRecipe: CostCalCulatorResponse = {
      ...newRecipe,
      recipe_id: crypto.randomUUID(),
    };

    MOCK_RECIPE_DETAILS[storeId].push(completeRecipe);

    // 목록에도 추가
    MOCK_RECIPES_LIST[storeId].push({
      recipe_id: completeRecipe.recipe_id,
      recipe_name: completeRecipe.recipe_name,
      recipe_cost: completeRecipe.recipe_cost,
    });

    return HttpResponse.json(completeRecipe);
  }),

  // 레시피 원가 정보 수정
  http.put('/costcalcul/:storeId/:recipeId', async ({ params, request }) => {
    const { storeId, recipeId } = params;
    const updateData = (await request.json()) as CostCalCulatorRequest;

    const recipes = MOCK_RECIPE_DETAILS[storeId as string];
    if (!recipes) {
      return new HttpResponse(null, { status: 404 });
    }

    const index = recipes.findIndex((recipe) => recipe.recipe_id === recipeId);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedRecipe = {
      ...recipes[index],
      ...updateData,
    };

    recipes[index] = updatedRecipe;

    // 목록도 업데이트
    const listIndex = MOCK_RECIPES_LIST[storeId as string].findIndex(
      (recipe) => recipe.recipe_id === recipeId
    );
    if (listIndex !== -1) {
      MOCK_RECIPES_LIST[storeId as string][listIndex] = {
        recipe_id: updatedRecipe.recipe_id,
        recipe_name: updatedRecipe.recipe_name,
        recipe_cost: updatedRecipe.recipe_cost,
      };
    }

    return HttpResponse.json(updatedRecipe);
  }),

  // 레시피 삭제
  http.delete('/costcalcul/:storeId/:recipeId', ({ params }) => {
    const { storeId, recipeId } = params;

    const recipes = MOCK_RECIPE_DETAILS[storeId as string];
    if (!recipes) {
      return new HttpResponse(null, { status: 404 });
    }

    MOCK_RECIPE_DETAILS[storeId as string] = recipes.filter(
      (recipe) => recipe.recipe_id !== recipeId
    );

    // 목록에서도 삭제
    MOCK_RECIPES_LIST[storeId as string] = MOCK_RECIPES_LIST[
      storeId as string
    ].filter((recipe) => recipe.recipe_id !== recipeId);

    return HttpResponse.json({
      success: true,
      message: '레시피가 삭제되었습니다.',
    });
  }),
];
