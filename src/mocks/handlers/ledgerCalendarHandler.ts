import { HttpResponse, http } from 'msw';

// 새로운 타입 정의
type StoreCalendarResponse = {
  days: DayOverview[];
  chart: ChartOverview;
};

type DayOverview = {
  day?: number;
  hasIncome?: boolean;
  hasExpense?: boolean;
};

type ChartOverview = {
  totalIncome: number;
  totalExpense: number;
  categories: {
    type: 'income' | 'expense';
    category: string;
    cost: number;
  }[];
};

const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

const MOCK_STORE_CALENDAR: Record<string, StoreCalendarResponse> = {
  [STORE_IDS.STORE_1]: {
    days: [
      {
        day: 1,
        hasIncome: true,
        hasExpense: true,
      },
      {
        day: 10,
        hasExpense: true,
      },
    ],
    chart: {
      totalIncome: 1000,
      totalExpense: 2000,
      categories: [
        {
          type: 'expense',
          category: '기타',
          cost: 1000,
        },
        {
          type: 'expense',
          category: '식비',
          cost: 1000,
        },
        {
          type: 'income',
          category: '용돈',
          cost: 1000,
        },
      ],
    },
  },
  [STORE_IDS.STORE_2]: {
    days: [
      {
        day: 1,
        hasIncome: true,
        hasExpense: true,
      },
      {
        day: 10,
        hasExpense: true,
      },
    ],
    chart: {
      totalIncome: 1000,
      totalExpense: 2000,
      categories: [
        {
          type: 'expense',
          category: '기타',
          cost: 1000,
        },
        {
          type: 'expense',
          category: '식비',
          cost: 1000,
        },
        {
          type: 'income',
          category: '용돈',
          cost: 1000,
        },
      ],
    },
  },
  [STORE_IDS.STORE_3]: {
    days: [
      {
        day: 1,
        hasIncome: true,
        hasExpense: true,
      },
      {
        day: 10,
        hasExpense: true,
      },
    ],
    chart: {
      totalIncome: 1000,
      totalExpense: 2000,
      categories: [
        {
          type: 'expense',
          category: '기타',
          cost: 1000,
        },
        {
          type: 'expense',
          category: '식비',
          cost: 1000,
        },
        {
          type: 'income',
          category: '용돈',
          cost: 1000,
        },
      ],
    },
  },
};

export const ledgerCalendarHandler = [
  http.get('/ledger/:storeId/calendar', ({ params, request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    // 유효성 검사
    if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
      return new HttpResponse(null, {
        status: 400,
        statusText: '유효하지 않은 년도 또는 월입니다.',
      });
    }

    const storeId = params.storeId as string;
    const storeCalendar = MOCK_STORE_CALENDAR[storeId];

    // 스토어 ID 유효성 검사
    if (!storeCalendar) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '존재하지 않는 스토어입니다.',
      });
    }

    return HttpResponse.json({
      year: Number(year),
      month: Number(month),
      ...storeCalendar,
    });
  }),
];
