import FormField from '@/components/common/FormField';
import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStoreQuery } from '@/api/store/store.hooks';

type AddStoreModalProps = {
  onClose: () => void;
};

type StoreFormData = {
  name: string;
  address: string;
};

const AddStoreModal = ({ onClose }: AddStoreModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<StoreFormData>({
    defaultValues: {
      name: '',
      address: '',
    },
    mode: 'onSubmit',
  });

  const { useCreateStore } = useStoreQuery();
  const createStoreMutation = useCreateStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('name');
    }, 100);

    return () => clearTimeout(timer);
  }, [setFocus]);

  const onSubmit = async (data: StoreFormData) => {
    if (!data.name.trim()) {
      setError('name', {
        type: 'required',
        message: '스토어 이름은 필수 입니다.',
      });
      showWarnToast('스토어 이름은 필수 입니다.');

      setTimeout(() => {
        setFocus('name');
      }, 100);
      return;
    }

    await createStoreMutation.mutateAsync({
      name: data.name,
      address: data.address,
    });

    reset();
    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label='스토어 이름'
        register={register('name')}
        placeholder='이름을 입력해 주세요.'
        required={true}
        className={errors.name && 'error-input'}
      />

      <FormField
        label='주소'
        register={register('address')}
        placeholder='주소를 입력해 주세요.'
      />
    </Modal>
  );
};

export default AddStoreModal;
