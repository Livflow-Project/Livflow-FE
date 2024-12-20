import { HttpResponse, http } from 'msw';

type StoreResponse = {
  store_id: number;
  name: string;
  address?: string;
  chart: {
    expense: Category[];
    income: Category[];
  };
};

export type Category = {
  category: string;
  cost: number;
};

const MOCK_STORE: StoreResponse[] = [
  {
    // 스토어 아이디
    store_id: 1,
    // 스토어 이름
    name: '스토어 이름',
    // 스토어 주소 (선택)
    address: '스토어 주소',
    // 해당 달에 있는 카테고리별 총 지출
    chart: {
      expense: [
        {
          category: '교통비',
          // 카테고리가 교통비인 지출의 총 합
          cost: 1500,
        },
        {
          category: '저축',
          // 카테고리가 저축인 지출의 총 합
          cost: 20000,
        },
      ],
      // 해당 달에 있는 카테고리별 총 수입
      income: [
        {
          category: '용돈',
          // 카테고리가 용돈인 수입의 총 합
          cost: 50000,
        },
        {
          category: '주식',
          // 카테고리가 주식인 수입의 총 합
          cost: 2000,
        },
      ],
    },
  },
  {
    // 스토어 아이디
    store_id: 2,
    // 스토어 이름
    name: '스토어 이름',
    // 스토어 주소 (선택)
    address: '스토어 주소',
    // 해당 달에 있는 카테고리별 총 지출
    chart: {
      expense: [
        {
          category: '외식',
          // 카테고리가 외식인 지출의 총 합
          cost: 17000,
        },
        {
          category: '주식',
          // 카테고리가 주식인 지출의 총 합
          cost: 20000,
        },
      ],
      // 해당 달에 있는 카테고리별 총 수입
      income: [
        {
          category: '용돈',
          // 카테고리가 용돈인 수입의 총 합
          cost: 30000,
        },
        {
          category: '알바',
          // 카테고리가 알바인 수입의 총 합
          cost: 70000,
        },
      ],
    },
  },
];

let stores: StoreResponse[] = [...MOCK_STORE];

export const storeHandler = [
  // 모든 상점 조회
  http.get('/stores/stores', () => {
    return HttpResponse.json(stores);
  }),

  // 특정 상점 조회
  http.get('/stores/stores/:id', ({ params }) => {
    const store = stores.find((store) => store.store_id === Number(params.id));
    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(store);
  }),

  // 새 상점 생성
  http.post('/stores/stores', async ({ request }) => {
    const newStore = (await request.json()) as Omit<StoreResponse, 'store_id'>;
    const store_id = Math.max(...stores.map((store) => store.store_id)) + 1;

    const createdStore = {
      ...newStore,
      store_id,
      expense: [],
      income: [],
    };

    stores.push(createdStore);
    return HttpResponse.json(createdStore, { status: 201 });
  }),

  // 상점 정보 수정 (이름, 주소만)
  http.put('/stores/stores/:id', async ({ params, request }) => {
    const updates = (await request.json()) as Pick<
      StoreResponse,
      'name' | 'address'
    >;
    const storeIndex = stores.findIndex(
      (store) => store.store_id === Number(params.id)
    );

    if (storeIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    stores[storeIndex] = {
      ...stores[storeIndex],
      ...updates,
    };

    return HttpResponse.json(stores[storeIndex]);
  }),

  // 상점 삭제
  http.delete('/stores/stores/:id', ({ params }) => {
    const storeIndex = stores.findIndex(
      (store) => store.store_id === Number(params.id)
    );

    if (storeIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    stores = stores.filter((store) => store.store_id !== Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),
];
