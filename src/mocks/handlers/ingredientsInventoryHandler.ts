import { HttpResponse, http } from 'msw';

type InventoryResponse = {
  ingredient_id: string;
  ingredient_name: string;
  remaining_stock: number;
  unit: 'ml' | 'g' | 'ea';
};

const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

// 재고 데이터 저장소
export const MOCK_INVENTORY: Record<string, InventoryResponse[]> = {
  [STORE_IDS.STORE_1]: [],
  [STORE_IDS.STORE_2]: [],
  [STORE_IDS.STORE_3]: [],
};

// 재고 관련 핸들러
export const IngredientsinventoryHandlers = [
  // 재고 조회
  http.get('/inventory/:storeId', ({ params }) => {
    const { storeId } = params;
    return HttpResponse.json(MOCK_INVENTORY[storeId as string]);
  }),

  // 재고 사용
  http.post(
    '/inventory/:storeId/:ingredientId/use',
    async ({ params, request }) => {
      const { storeId, ingredientId } = params;
      const { used_stock } = (await request.json()) as { used_stock: number };

      const inventory = MOCK_INVENTORY[storeId as string];

      if (!inventory) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Store not found',
        });
      }

      const itemIndex = inventory.findIndex(
        (i) => i.ingredient_id === ingredientId
      );

      if (itemIndex === -1) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Ingredient not found',
        });
      }

      const currentItem = inventory[itemIndex];

      // 재고 부족 확인
      if (currentItem.remaining_stock < used_stock) {
        return HttpResponse.json(
          { success: false, message: 'Insufficient inventory' },
          { status: 400 }
        );
      }

      // 재고 차감
      currentItem.remaining_stock -= used_stock;

      return HttpResponse.json({
        success: true,
        data: currentItem,
      });
    }
  ),
];
