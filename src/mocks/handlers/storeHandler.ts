import { HttpResponse, http } from 'msw';

type StoresResponse = {
  stores: StoreDetailResponse[];
};

type StoreDetailResponse = {
  store_id: string; // UUID
  name: string;
  address?: string;
  chart: Category[];
};

type StoreIdResponse = Omit<StoreDetailResponse, 'chart'>;

type Category = {
  type: 'expense' | 'income';
  category: string;
  cost: number;
};

// 임시 랜덤 UUID
const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

const STORE_INFO: StoreIdResponse[] = [
  {
    store_id: STORE_IDS.STORE_1,
    name: '스토어 이름 1',
    address: '스토어 주소 1',
  },
  {
    store_id: STORE_IDS.STORE_2,
    name: '스토어 이름 2',
    address: '스토어 주소 2',
  },
  {
    store_id: STORE_IDS.STORE_3,
    name: '스토어 이름 3',
    address: '스토어 주소 3',
  },
];

const MOCK_STORE: StoreDetailResponse[] = [
  {
    store_id: STORE_IDS.STORE_1,
    name: '스토어 이름 1',
    address: '스토어 주소 1',
    chart: [
      {
        type: 'expense',
        category: '교통비',
        cost: 1500,
      },
      {
        type: 'expense',
        category: '저축',
        cost: 20000,
      },
      {
        type: 'income',
        category: '용돈',
        cost: 50000,
      },
      {
        type: 'income',
        category: '기타',
        cost: 2000,
      },
    ],
  },
  {
    store_id: STORE_IDS.STORE_2,
    name: '스토어 이름 2',
    address: '스토어 주소 2',
    chart: [
      {
        type: 'expense',
        category: '기타',
        cost: 17000,
      },
      {
        type: 'expense',
        category: '경조사',
        cost: 20000,
      },
      {
        type: 'income',
        category: '용돈',
        cost: 30000,
      },
      {
        type: 'income',
        category: '기타',
        cost: 70000,
      },
    ],
  },
];

let stores: StoreDetailResponse[] = [...MOCK_STORE];

export const storeHandler = [
  // 모든 상점 조회
  http.get('/stores', () => {
    const response: StoresResponse = {
      stores,
    };
    return HttpResponse.json(response.stores);
  }),

  // 특정 스토어 이름, 주소 정보 조회
  http.get('/stores/:storeId', ({ params }) => {
    const store = STORE_INFO.find((store) => store.store_id === params.storeId);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(store);
  }),

  // 새 상점 생성
  http.post('/stores', async ({ request }) => {
    const newStore = (await request.json()) as StoreDetailResponse;

    const createdStore: StoreDetailResponse = {
      ...newStore,
      store_id: STORE_IDS.STORE_3,
      chart: [],
    };

    stores.push(createdStore);
    return HttpResponse.json(createdStore, { status: 201 });
  }),

  // 상점 정보 수정 (이름, 주소만)
  http.put('/stores/:storeId', async ({ params, request }) => {
    const updates = (await request.json()) as Pick<
      StoreDetailResponse,
      'name' | 'address'
    >;
    const storeIndex = stores.findIndex(
      (store) => store.store_id === params.storeId
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
  http.delete('/stores/:storeId', ({ params }) => {
    const storeIndex = stores.findIndex(
      (store) => store.store_id === params.storeId
    );

    if (storeIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    stores = stores.filter((store) => store.store_id !== params.storeId);
    return new HttpResponse(null, { status: 204 });
  }),
];
