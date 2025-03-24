import {
  AddTransactionParams,
  TransactionRequest,
  TransactionResponse,
} from '@/api/storeId/ledger/transactions/transactions.type';
import { Controller, useForm } from 'react-hook-form';

import FormField from '@/components/common/FormField';
import Modal from '@/components/common/Modal';
import { TRANSACTION_CATEGORIES } from './categories';
import { getChangedFields } from '@/utils/formUtils';
import { showWarnToast } from '@/utils/toast';
import { twMerge } from 'tailwind-merge';
import { useTransactionsQuery } from '@/api/storeId/ledger/transactions/transactions.hooks';

type LedgerModalProps = {
  onClose: () => void;
  storeId: string;
  selectedDate: string | null;
  isEditMode?: boolean;
  initialData?: TransactionResponse;
};

const LedgerModal = ({
  onClose,
  selectedDate,
  storeId,
  isEditMode = false,
  initialData,
}: LedgerModalProps) => {
  const { useAddTransaction, useUpdateTransaction } = useTransactionsQuery();
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TransactionRequest>({
    defaultValues: getDefaultValues(isEditMode, initialData),
    mode: 'onSubmit',
  });

  // 폼 제출 처리
  const onSubmit = (data: TransactionRequest) => {
    if (!selectedDate) {
      showWarnToast('날짜를 선택해주세요.');
      return;
    }

    // 카테고리 검증
    if (!data.category || data.category.trim() === '') {
      setError('category', {
        type: 'required',
        message: '카테고리를 선택해주세요.',
      });
      showWarnToast('카테고리를 선택해주세요.');
      return;
    }

    // 금액 검증
    if (!data.cost || data.cost === 0) {
      setError('cost', {
        type: 'required',
        message: '금액을 입력해주세요.',
      });
      showWarnToast('금액을 입력해주세요.');
      return;
    }

    if (isEditMode && initialData) {
      handleUpdate(data, initialData);
    } else {
      handleAdd(data, selectedDate);
    }

    onClose();
  };

  // 데이터 추가 처리
  const handleAdd = (data: TransactionRequest, selectedDate: string) => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const addTransactionData: AddTransactionParams = {
      date: { year, month, day },
      ...data,
    };
    addTransaction({ storeId: storeId, data: addTransactionData });
  };

  // 데이터 업데이트 처리
  const handleUpdate = (
    data: TransactionRequest,
    initialData: TransactionResponse
  ) => {
    const changedFields = getChangedFields(data, {
      type: initialData.type,
      category: initialData.category,
      detail: initialData.detail,
      cost: initialData.cost,
    });

    // 변경된 필드가 없으면 서버에 요청하지 않고 모달만 닫기
    if (Object.keys(changedFields).length === 0) {
      return;
    }

    updateTransaction({
      storeId: storeId,
      transactionId: initialData.transaction_id,
      data: {
        transaction_id: initialData.transaction_id,
        ...data,
      },
    });
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <li className='flex items-center justify-between'>
        <div className='relative flex items-center gap-2'>
          <label className='input_label'>카테고리</label>
          <span className='absolute -right-1.5 -top-2 text-red'>*</span>
        </div>
        <select
          {...register('category', { required: true })}
          className={twMerge('input_box', errors.category && 'error-input')}
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
          <label className='input_label'>지출 / 수입</label>
          <span className='absolute -right-1.5 -top-2 text-red'>*</span>
        </div>
        <div className='flex h-[42px] w-[60%] items-center justify-around'>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    value='expense'
                    checked={field.value === 'expense'}
                    onChange={() => field.onChange('expense')}
                    className='h-5 w-5'
                  />
                  <span className='ml-2 text-lg text-main'>지출</span>
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    value='income'
                    checked={field.value === 'income'}
                    onChange={() => field.onChange('income')}
                    className='h-5 w-5'
                  />
                  <span className='ml-2 text-lg text-main'>수입</span>
                </label>
              </>
            )}
          />
        </div>
      </li>

      <FormField
        label='금액'
        register={register('cost', {
          required: true,
          valueAsNumber: true,
          min: 0,
        })}
        type='number'
        placeholder='숫자만 입력해 주세요.'
        required={true}
        className={twMerge('number_input', errors.cost && 'error-input')}
      />

      <FormField
        label='상세정보'
        register={register('detail')}
        placeholder='상세 정보를 입력해 주세요.'
      />
    </Modal>
  );
};

// 폼 기본값 설정
const getDefaultValues = (
  isEditMode: boolean,
  initialData?: TransactionResponse
): Partial<TransactionRequest> => {
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
    cost: undefined,
  };
};

export default LedgerModal;
