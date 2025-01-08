import { Category } from '../store/store.type';

export type StoreIDResponse = {
  store_id: string;
  name: string;
  address?: string;
  chart: {
    expense: Category[];
    income: Category[];
  };
};

export type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

export type DayInfo = {
  day: number;
  day_info: DayTransaction;
};

export type DayTransaction = {
  expense: DayDetailTransaction[];
  income: DayDetailTransaction[];
};

export type DayDetailTransaction = {
  id: string;
  category: string;
  detail: string;
  cost: number;
};

// id를 제외한 DayDetailTransaction 타입
export type AddDayDetailTransaction = Omit<DayDetailTransaction, 'id'>;

export type StoreDetailParams = {
  year: number;
  month: number;
};

// 거래 추가를 위한 요청 타입
export type AddTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: {
    expense?: AddDayDetailTransaction[];
    income?: AddDayDetailTransaction[];
  };
};

// 거래 수정을 위한 요청 타입
export type UpdateTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: {
    expense?: DayDetailTransaction[];
    income?: DayDetailTransaction[];
  };
};

// 거래 삭제를 위한 요청 타입
export type DeleteTransactionParams = {
  year: number;
  month: number;
  day: number;
  transactionType: 'expense' | 'income';
  transactionId: string;
};
