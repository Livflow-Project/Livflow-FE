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
