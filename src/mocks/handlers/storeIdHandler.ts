import { HttpResponse, http } from 'msw';

type StoreIdResponse = {
  store_id: string; // UUID
  name: string;
  address?: string;
};

type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

type DayInfo = {
  day: number;
  day_info: DayDetailTransaction[];
};

type DayDetailTransaction = {
  transaction_id: string; // UUID
  type: 'expense' | 'income';
  category: string;
  detail: string;
  cost: number;
};

type StoreDetailParams = {
  year: number;
  month: number;
};

type AddTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: Omit<DayDetailTransaction, 'transaction_id'>[];
};

type EditTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: DayDetailTransaction[];
};

type DeleteTransactionParams = {
  transaction_id: string;
};

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

const MOCK_STORE_ID_DETAIL: StoreIdDetailResponse[] = [
  {
    date_info: [
      {
        day: 1,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '교통비',
            detail: '서울 여행',
            cost: 30000,
          },
        ],
      },
      {
        day: 2,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 3,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 10,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '영화',
            detail: '친구랑 영화',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
    ],
  },
  {
    date_info: [
      {
        day: 21,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 23,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 3,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
    ],
  },
];

export const storeIdHandler = [
  // 스토어 이름, 주소 정보 조회
  http.get('/stores/:id', ({ params }) => {
    const store = STORE_INFO.find((store) => store.store_id === params.id);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(store);
  }),

  // 스토어 상세 정보 조회 (달력 데이터)
  http.post('/stores/detail/:id', async ({ params, request }) => {
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    const { year, month } = (await request.json()) as StoreDetailParams;

    return HttpResponse.json({
      year,
      month,
      ...storeDetail,
    });
  }),

  // 스토어 지출, 수입 정보 추가
  http.post('/stores/:id/transaction', async ({ params, request }) => {
    const transactionData = (await request.json()) as AddTransactionParams;
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    // 해당 날짜의 데이터가 있는지 확인
    const dayIndex = storeDetail.date_info.findIndex(
      (info) => info.day === transactionData.day
    );

    if (dayIndex === -1) {
      // 새로운 날짜 추가
      const newTransactions = [
        ...(transactionData.day_info.map((exp) => ({
          ...exp,
          type: 'expense' as const,
          transaction_id: crypto.randomUUID(),
        })) || []),
        ...(transactionData.day_info.map((inc) => ({
          ...inc,
          type: 'income' as const,
          transaction_id: crypto.randomUUID(),
        })) || []),
      ];

      storeDetail.date_info.push({
        day: transactionData.day,
        day_info: newTransactions,
      });

      // 날짜 순으로 정렬
      storeDetail.date_info.sort((a, b) => a.day - b.day);
    } else {
      // 기존 날짜에 거래 추가
      const newTransactions = [
        ...storeDetail.date_info[dayIndex].day_info,
        ...(transactionData.day_info.map((exp) => ({
          ...exp,
          type: 'expense' as const,
          transaction_id: crypto.randomUUID(),
        })) || []),
        ...(transactionData.day_info.map((inc) => ({
          ...inc,
          type: 'income' as const,
          transaction_id: crypto.randomUUID(),
        })) || []),
      ];

      storeDetail.date_info[dayIndex].day_info = newTransactions;
    }

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 추가되었습니다.',
      data: storeDetail,
    });
  }),

  // 스토어 지출, 수입 정보 수정
  http.put('/stores/:id/transaction', async ({ params, request }) => {
    const updateData = (await request.json()) as EditTransactionParams;
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    const dayIndex = storeDetail.date_info.findIndex(
      (info) => info.day === updateData.day
    );

    if (dayIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '해당 날짜의 거래 정보를 찾을 수 없습니다.',
      });
    }

    const newTransactions = [
      ...(updateData.day_info.map((exp) => ({
        ...exp,
        type: 'expense' as const,
      })) || []),
      ...(updateData.day_info.map((inc) => ({
        ...inc,
        type: 'income' as const,
      })) || []),
    ];

    storeDetail.date_info[dayIndex].day_info = newTransactions;

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 수정되었습니다.',
      data: storeDetail,
    });
  }),

  // 스토어 지출, 수입 정보 삭제
  http.delete('/stores/:id/transaction', async ({ params, request }) => {
    const deleteData = (await request.json()) as DeleteTransactionParams;
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    // 모든 날짜에서 해당 ID를 가진 거래 찾기
    let isDeleted = false;
    storeDetail.date_info = storeDetail.date_info.filter((dayInfo) => {
      dayInfo.day_info = dayInfo.day_info.filter((transaction) => {
        if (transaction.transaction_id === deleteData.transaction_id) {
          isDeleted = true;
          return false;
        }
        return true;
      });

      return dayInfo.day_info.length > 0;
    });

    if (!isDeleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '해당 거래를 찾을 수 없습니다.',
      });
    }

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 삭제되었습니다.',
      data: storeDetail,
    });
  }),
];
