import {
  AddTransactionParams,
  TransactionRequest,
  TransactionResponse,
} from '@/api/storeId/ledger/transactions/transactions.type';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useState } from 'react';
import { useTransactionsQuery } from '@/api/storeId/ledger/transactions/transactions.hooks';

type CalendarModalProps = {
  onClose: () => void;
  storeId: string;
  selectedDate: string | null;
  isEditMode?: boolean;
  initialData?: TransactionResponse;
};

const TRANSACTION_CATEGORIES = [
  // 수입 관련
  { value: '급여', label: '급여' },
  { value: '부수입', label: '부수입' },
  { value: '투자수익', label: '투자수익' },
  { value: '정부지원금', label: '정부지원금' },
  { value: '매출', label: '매출' },

  // 주거 관련
  { value: '주거비', label: '주거비' },
  { value: '월세', label: '월세' },
  { value: '관리비', label: '관리비' },
  { value: '수도광열비', label: '수도광열비' },
  { value: '인터넷통신비', label: '인터넷통신비' },
  { value: '수리비', label: '수리비' },
  { value: '인테리어비', label: '인테리어비' },
  { value: '난방비', label: '난방비' },
  { value: '냉방비', label: '냉방비' },

  // 식비 관련
  { value: '식료품', label: '식료품' },

  // 교통 관련
  { value: '자동차유지비', label: '자동차유지비' },
  { value: '자동차보험', label: '자동차보험' },
  { value: '주유비', label: '주유비' },

  // 생활 필수품
  { value: '생활용품', label: '생활용품' },
  { value: '가전제품', label: '가전제품' },
  { value: '가구', label: '가구' },
  { value: '계절재고구매', label: '계절재고구매' },

  // 의료/건강
  { value: '의료비', label: '의료비' },
  { value: '약품비', label: '약품비' },
  { value: '건강관리', label: '건강관리' },

  // 세금 관련
  { value: '소득세', label: '소득세' },
  { value: '부가가치세', label: '부가가치세' },
  { value: '재산세', label: '재산세' },
  { value: '사업자보험', label: '사업자보험' },

  // 보험/금융
  { value: '보험료', label: '보험료' },
  { value: '저축', label: '저축' },
  { value: '투자', label: '투자' },
  { value: '대출상환', label: '대출상환' },
  { value: '금융수수료', label: '금융수수료' },

  // 교육/자기계발
  { value: '전문교육비', label: '전문교육비' },
  { value: '세미나컨퍼런스', label: '세미나컨퍼런스' },

  // 사업 관련
  { value: '직원급여', label: '직원급여' },
  { value: '사무용품', label: '사무용품' },
  { value: '포장용품', label: '포장용품' },
  { value: '재료비', label: '재료비' },
  { value: '마케팅비', label: '마케팅비' },
  { value: '임대료', label: '임대료' },
  { value: '설비유지비', label: '설비유지비' },
  { value: '배송비', label: '배송비' },
  { value: '소프트웨어', label: '소프트웨어' },
  { value: '전문서비스', label: '전문서비스' },

  // 온라인 사업 관련
  { value: '웹호스팅서버', label: '웹호스팅서버' },
  { value: '온라인광고비', label: '온라인광고비' },
  { value: '플랫폼수수료', label: '플랫폼수수료' },

  // 기타
  { value: '기타', label: '기타' },
];

const CalendarModal = ({
  onClose,
  selectedDate,
  storeId,
  isEditMode = false,
  initialData,
}: CalendarModalProps) => {
  const { useAddTransaction, useUpdateTransaction } = useTransactionsQuery();
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();

  const [transaction, setTransaction] = useState<TransactionRequest>(() => {
    if (isEditMode && initialData) {
      return {
        type: initialData.type,
        category: initialData.category,
        detail: initialData.detail,
        cost: initialData.cost,
      };
    }
    return {
      type: 'expense',
      category: '',
      detail: '',
      cost: 0,
    };
  });

  const [costInput, setCostInput] = useState(() => {
    if (isEditMode && initialData) {
      return initialData.cost.toString();
    }
    return '';
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate) {
      showWarnToast('날짜를 선택해주세요.');
      return;
    }

    if (!transaction.category || transaction.cost === 0) {
      showWarnToast('필수 입력 정보를 모두 입력해 주세요.');
      return;
    }

    if (isEditMode && initialData) {
      updateTransaction({
        storeId: storeId,
        transactionId: initialData.transaction_id,
        data: {
          transaction_id: initialData.transaction_id,
          ...transaction,
        },
      });
    } else {
      const [year, month, day] = selectedDate!.split('-').map(Number);
      const addTransactionData: AddTransactionParams = {
        date: { year, month, day },
        ...transaction,
      };
      addTransaction({ storeId: storeId, data: addTransactionData });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit}>
      <li className='flex items-center justify-between'>
        <div className='relative flex items-center gap-2'>
          <label className='input_label'>카테고리</label>
          <span className='absolute -right-1.5 -top-2 text-red'>*</span>
        </div>
        <select
          value={transaction.category}
          onChange={(e) =>
            setTransaction({ ...transaction, category: e.target.value })
          }
          className='input_box'
        >
          <option value='' disabled className='text-center text-caption'>
            카테고리 선택
          </option>
          {TRANSACTION_CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </li>

      <li className='flex items-center justify-between'>
        <div className='relative flex items-center gap-2'>
          <span className='input_label'>지출 / 수입</span>
          <span className='absolute -right-1.5 -top-2 text-red'>*</span>
        </div>
        <div className='flex h-[42px] w-[60%] items-center justify-around'>
          <label className='flex items-center'>
            <input
              type='radio'
              name='transactionType'
              value='expense'
              checked={transaction.type === 'expense'}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  type: e.target.value as 'expense' | 'income',
                })
              }
              className='h-5 w-5'
            />
            <span className='ml-2 text-lg text-main'>지출</span>
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='transactionType'
              value='income'
              checked={transaction.type === 'income'}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  type: e.target.value as 'expense' | 'income',
                })
              }
              className='h-5 w-5'
            />
            <span className='ml-2 text-lg text-main'>수입</span>
          </label>
        </div>
      </li>

      <li className='flex items-center justify-between'>
        <div className='relative flex items-center gap-2'>
          <label className='input_label'>금액</label>
          <span className='absolute -right-1.5 -top-2 text-red'>*</span>
        </div>
        <input
          type='number'
          value={costInput}
          onChange={(e) => {
            const value = e.target.value;
            setCostInput(value);
            setTransaction({
              ...transaction,
              cost: value ? Number(value) : 0,
            });
          }}
          placeholder='숫자만 입력해 주세요.'
          className='input_box number_input'
        />
      </li>

      <li className='flex items-center justify-between'>
        <div className='relative flex items-center gap-2'>
          <label className='input_label'>상세정보</label>
        </div>
        <input
          type='text'
          value={transaction.detail}
          onChange={(e) =>
            setTransaction({ ...transaction, detail: e.target.value })
          }
          placeholder='상세 정보를 입력해 주세요.'
          className='input_box'
        />
      </li>
    </Modal>
  );
};

export default CalendarModal;
