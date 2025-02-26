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
      recipe_img:
        'data:image/webp;base64,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',
    },
    {
      recipe_id: crypto.randomUUID(),
      recipe_name: '카페라떼',
      recipe_cost: 2500,
      recipe_img:
        'https://item.elandrs.com/r/image/item/2023-04-03/39621678-a0d1-410d-9325-b71599fd3b18.jpg',
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
  http.get('/costcalcul/:storeId/:recipeId', ({ params }) => {
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
