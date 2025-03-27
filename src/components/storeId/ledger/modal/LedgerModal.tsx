import {
  AddTransactionParams,
  TransactionRequest,
  TransactionResponse,
} from '@/api/storeId/ledger/transactions/transactions.type';

import CategoryField from './CategoryField';
import FormField from '@/components/common/FormField';
import Modal from '@/components/common/Modal';
import TransactionTypeField from './TransactionTypeField';
import { getChangedFields } from '@/utils/formUtils';
import { showWarnToast } from '@/utils/toast';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
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

  const {
    register,
    handleSubmit,
    control,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<TransactionRequest>({
    defaultValues: getDefaultValues(isEditMode, initialData),
    mode: 'onSubmit',
  });

  const onSubmit = (data: TransactionRequest) => {
    if (!selectedDate) {
      showWarnToast('날짜를 선택해주세요.');
      return;
    }

    if (!data.category || data.category.trim() === '') {
      setError('category', {
        type: 'required',
        message: '카테고리를 선택해주세요.',
      });
      showWarnToast('카테고리를 선택해주세요.');
      return;
    }

    if (!data.cost || data.cost === 0) {
      setError('cost', {
        type: 'required',
        message: '금액을 입력해주세요.',
      });
      showWarnToast('금액을 입력해주세요.');
      setTimeout(() => {
        setFocus('cost');
      }, 100);
      return;
    }

    if (isEditMode && initialData) {
      handleUpdate(data, initialData);
    } else {
      handleAdd(data, selectedDate);
    }

    onClose();
  };

  const handleAdd = (data: TransactionRequest, selectedDate: string) => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const addTransactionData: AddTransactionParams = {
      date: { year, month, day },
      ...data,
    };
    addTransaction({ storeId: storeId, data: addTransactionData });
  };

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
      <CategoryField control={control} errors={errors} />

      <TransactionTypeField register={register} />

      <FormField
        label='금액'
        register={register('cost', {
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
