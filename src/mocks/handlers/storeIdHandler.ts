import { HttpResponse, http } from 'msw';

type StoreIdResponse = {
  store_id: number;
  name: string;
  address?: string;
};

type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

type DayInfo = {
  day?: number;
  day_info?: DayTransaction;
};

type DayTransaction = {
  expense?: DayDetailTransaction[];
  income?: DayDetailTransaction[];
};

type DayDetailTransaction = {
  category: string;
  detail: string;
  cost: number;
};

type StoreDetailParams = {
  year: number;
  month: number;
};

const MOCK_STORE_ID: StoreIdResponse[] = [
  {
    // 스토어 아이디
    store_id: 1,
    // 스토어 이름
    name: '스토어 이름 1',
    // 스토어 주소 (선택)
    address: '스토어 주소 1',
  },
  {
    // 스토어 아이디
    store_id: 2,
    // 스토어 이름
    name: '스토어 이름 2',
    // 스토어 주소 (선택)
    address: '스토어 주소 2',
  },
];

const MOCK_STORE_ID_DETAIL: StoreIdDetailResponse[] = [
  {
    // 해당 달에 있는 날짜별 지출, 수입
    // 1일부터 순서대로 배열에 담기고 지출이나 수입이 있는 날짜만 받음
    date_info: [
      {
        // 1일에 있는 상세 지출, 수입 정보
        day: 1,
        day_info: {
          expense: [
            // 1일에 입력 된 상세 지출 정보
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '교통비',
              detail: '서울 여행',
              cost: 30000,
            },
          ],
        },
      },
      {
        // 1일에 있는 상세 지출, 수입 정보
        day: 2,
        day_info: {
          expense: [
            // 2일에 입력 된 상세 지출 정보 전체
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 2일에 입력 된 상세 수입 정보 전체
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
      {
        // 3일에 있는 상세 지출, 수입 정보
        day: 3,
        day_info: {
          expense: [
            // 3일에 입력 된 상세 지출 정보 전체
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 3일에 입력 된 상세 수입 정보 전체
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
      {
        // 10일에 있는 상세 지출, 수입 정보
        day: 10,
        day_info: {
          expense: [
            // 3일에 입력 된 상세 지출 정보 전체
            {
              category: '영화',
              detail: '친구랑 영화',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 3일에 입력 된 상세 수입 정보 전체
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
    ],
  },
  {
    // 해당 달에 있는 날짜별 지출, 수입
    // 1일부터 순서대로 배열에 담기고 지출이나 수입이 있는 날짜만 받음
    date_info: [
      {
        // 1일에 있는 상세 지출, 수입 정보
        day: 21,
        day_info: {
          expense: [
            // 1일에 입력 된 상세 지출 정보
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 1일에 입력 된 상세 수입 정보
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
      {
        // 1일에 있는 상세 지출, 수입 정보
        day: 23,
        day_info: {
          expense: [
            // 2일에 입력 된 상세 지출 정보 전체
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 2일에 입력 된 상세 수입 정보 전체
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
      {
        // 3일에 있는 상세 지출, 수입 정보
        day: 3,
        day_info: {
          expense: [
            // 3일에 입력 된 상세 지출 정보 전체
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
            {
              category: '식비',
              detail: '친구랑 밥',
              cost: 30000,
            },
          ],
          income: [
            // 3일에 입력 된 상세 수입 정보 전체
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
            {
              category: '급여',
              detail: '11월 급여',
              cost: 2000000,
            },
          ],
        },
      },
    ],
  },
];

export const storeIdHandler = [
  http.get('/stores/stores/:id', ({ params }) => {
    const storeId = Number(params.id);
    const store = MOCK_STORE_ID.find((store) => store.store_id === storeId);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(store);
  }),

  // 스토어 상세 정보 조회 (달력 데이터)
  http.post('/stores/stores/detail/:id', async ({ params, request }) => {
    const storeId = Number(params.id);
    const { year, month } = (await request.json()) as StoreDetailParams;

    // 실제로는 year, month를 사용해서 해당 월의 데이터만 필터링해야 함
    const storeDetail = MOCK_STORE_ID_DETAIL[storeId - 1];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      year,
      month,
      ...storeDetail,
    });
  }),
];
