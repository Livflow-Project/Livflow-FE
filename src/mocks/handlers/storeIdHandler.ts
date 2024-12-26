import { HttpResponse, http } from 'msw';

import { Category } from '@/api/store/store.type';

type StoreIDResponse = {
  store_id: number;
  name: string;
  address?: string;
  chart: {
    expense: Category[];
    income: Category[];
  };
  date_info: DayInfo[];
};

type DayInfo = {
  day: number;
  day_info: DayTransaction;
};

type DayTransaction = {
  expense: DayDetailTransaction[];
  income: DayDetailTransaction[];
};

type DayDetailTransaction = {
  category: string;
  detail: string;
  cost: number;
};

const MOCK_STORE_ID_INFO: StoreIDResponse[] = [
  {
    // 스토어 아이디
    store_id: 1,
    // 스토어 이름
    name: '스토어 이름 1',
    // 스토어 주소 (선택)
    address: '스토어 주소 1',
    // 해당 달에 있는 카테고리별 총 지출
    chart: {
      expense: [
        {
          category: '식비',
          // 카테고리가 식비인 지출의 총 합
          cost: 30000,
        },
      ],
      income: [
        {
          category: '급여',
          // 카테고리가 급여인 수입의 총 합
          cost: 2000000,
        },
      ],
    },
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
    ],
  },
  {
    // 스토어 아이디
    store_id: 2,
    // 스토어 이름
    name: '스토어 이름 2',
    // 스토어 주소 (선택)
    address: '스토어 주소 2',
    // 해당 달에 있는 카테고리별 총 지출
    chart: {
      expense: [
        {
          category: '식비',
          // 카테고리가 식비인 지출의 총 합
          cost: 30000,
        },
      ],
      income: [
        {
          category: '급여',
          // 카테고리가 급여인 수입의 총 합
          cost: 2000000,
        },
      ],
    },
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
    const store = MOCK_STORE_ID_INFO.find(
      (store) => store.store_id === storeId
    );

    return HttpResponse.json(store);
  }),
];
