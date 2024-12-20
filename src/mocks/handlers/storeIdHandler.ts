import { Category } from './storeHandler';

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
  day_info: DayTransaction[];
};

type DayTransaction = {
  category: string;
  detail: string;
  cost: number;
};

const MOCK_STORE_ID: StoreIDResponse = {
  store_id: 1,
  name: 'Store A',
  chart: {
    expense: [{ category: '식비', cost: 30000 }],
    income: [{ category: '급여', cost: 2000000 }],
  },
  date_info: [
    {
      day: 1,
      day_info: [{ category: '식비', detail: '점심', cost: 10000 }],
    },
    {
      day: 2,
      day_info: [
        { category: '교통비', detail: '택시', cost: 15000 },
        { category: '식비', detail: '저녁', cost: 20000 },
      ],
    },
  ],
};
