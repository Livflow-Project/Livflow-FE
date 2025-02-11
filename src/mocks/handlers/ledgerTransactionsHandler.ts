import { HttpResponse, http } from 'msw';

type TransactionResponse = {
  transaction_id: string; // UUID
  type: 'expense' | 'income';
  category: string;
  detail: string;
  cost: number;
};

// id를 제외한 DayDetailTransaction 타입
type TransactionRequest = Omit<TransactionResponse, 'transaction_id'>;

type AddTransactionParams = {
  date: {
    year: number;
    month: number;
    day: number;
  };
} & TransactionRequest;

const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

const MOCK_STORE_TRANSACTION: Record<
  string,
  Record<number, TransactionResponse[]>
> = {
  [STORE_IDS.STORE_1]: {
    1: [
      {
        transaction_id: crypto.randomUUID(),
        type: 'expense',
        category: '기타',
        detail: '다이소',
        cost: 1000,
      },
      {
        transaction_id: crypto.randomUUID(),
        type: 'income',
        category: '용돈',
        detail: '아빠가 준 용돈',
        cost: 1000,
      },
    ],
    10: [
      {
        transaction_id: crypto.randomUUID(),
        type: 'expense',
        category: '식비',
        detail: '친구랑 밥',
        cost: 1000,
      },
    ],
  },
};

export const ledgerTransactionsHandler = [
  // 전체 거래 정보 조회
  http.get('/ledger/:storeId/transactions', ({ params, request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');
    const day = url.searchParams.get('day');

    if (
      !year ||
      !month ||
      !day ||
      isNaN(Number(year)) ||
      isNaN(Number(month)) ||
      isNaN(Number(day))
    ) {
      return new HttpResponse(null, {
        status: 400,
        statusText: '유효하지 않은 년도 또는 월 또는 일입니다.',
      });
    }

    const storeId = params.storeId as string;
    const storeTransactions = MOCK_STORE_TRANSACTION[storeId];

    if (!storeTransactions) {
      return new HttpResponse(null, { status: 404 });
    }

    const selectedDay = Number(day);
    return HttpResponse.json(storeTransactions[selectedDay] || []);
  }),

  // 특정 거래 정보 조회
  http.get('/ledger/:storeId/transactions/:transactionId', ({ params }) => {
    const storeId = params.storeId as string;
    const storeTransactions = MOCK_STORE_TRANSACTION[storeId];

    if (!storeTransactions) {
      return new HttpResponse(null, { status: 404 });
    }

    let transaction = null;
    Object.values(storeTransactions).some((dayTransactions) => {
      transaction = dayTransactions.find(
        (t) => t.transaction_id === params.transactionId
      );
      return transaction !== undefined;
    });

    if (!transaction) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '해당 거래를 찾을 수 없습니다.',
      });
    }

    return HttpResponse.json(transaction);
  }),

  // 스토어 지출, 수입 정보 추가
  http.post('/ledger/:storeId/transactions', async ({ params, request }) => {
    const transactionData = (await request.json()) as AddTransactionParams;
    const storeId = params.storeId as string;
    const storeTransactions = MOCK_STORE_TRANSACTION[storeId];

    if (!storeTransactions) {
      return new HttpResponse(null, { status: 404 });
    }

    const newTransaction = {
      transaction_id: crypto.randomUUID(),
      type: transactionData.type,
      category: transactionData.category,
      detail: transactionData.detail,
      cost: transactionData.cost,
    };

    const day = transactionData.date.day;
    if (!storeTransactions[day]) {
      storeTransactions[day] = [];
    }
    storeTransactions[day].push(newTransaction);

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 추가되었습니다.',
      data: newTransaction,
    });
  }),

  // 스토어 지출, 수입 정보 수정
  http.put(
    '/ledger/:storeId/transactions/:transactionId',
    async ({ params, request }) => {
      const storeId = params.storeId as string;
      const transactionId = params.transactionId as string;
      const updateData = (await request.json()) as TransactionRequest;
      const storeTransactions = MOCK_STORE_TRANSACTION[storeId];

      if (!storeTransactions) {
        return new HttpResponse(null, { status: 404 });
      }

      let isUpdated = false;
      Object.values(storeTransactions).forEach((dayTransactions) => {
        const transactionIndex = dayTransactions.findIndex(
          (t) => t.transaction_id === transactionId
        );
        if (transactionIndex !== -1) {
          dayTransactions[transactionIndex] = {
            transaction_id: transactionId,
            ...updateData,
          };
          isUpdated = true;
        }
      });

      if (!isUpdated) {
        return new HttpResponse(null, {
          status: 404,
          statusText: '해당 거래를 찾을 수 없습니다.',
        });
      }

      return HttpResponse.json({
        success: true,
        message: '거래가 성공적으로 수정되었습니다.',
      });
    }
  ),

  // 스토어 지출, 수입 정보 삭제
  http.delete('/ledger/:storeId/transactions/:transactionId', ({ params }) => {
    const storeId = params.storeId as string;
    const storeTransactions = MOCK_STORE_TRANSACTION[storeId];

    if (!storeTransactions) {
      return new HttpResponse(null, { status: 404 });
    }

    let isDeleted = false;
    Object.entries(storeTransactions).forEach(([day, transactions]) => {
      const filteredTransactions = transactions.filter(
        (t) => t.transaction_id !== params.transactionId
      );
      if (filteredTransactions.length !== transactions.length) {
        isDeleted = true;
        if (filteredTransactions.length === 0) {
          delete storeTransactions[Number(day)];
        } else {
          storeTransactions[Number(day)] = filteredTransactions;
        }
      }
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
    });
  }),
];
