import { mapIcon, storeIcon } from '@/assets/assets';

import Modal from '@/components/common/Modal';
import { showWarnToast } from '@/utils/toast';
import { useState } from 'react';
import { useStoreQuery } from '@/api/store/store.hooks';

type AddStoreModalProps = {
  onClose: () => void;
};

const AddStoreModal: React.FC<AddStoreModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const { useCreateStore } = useStoreQuery();
  const createStoreMutation = useCreateStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      showWarnToast('스토어 이름은 필수 입력 요소입니다.');
      return;
    }

    await createStoreMutation.mutateAsync({
      name,
      address,
    });

    setName('');
    setAddress('');
    onClose();
  };

  return (
    <Modal onClose={onClose} onSubmit={handleSubmit}>
      <ul className='flex flex-col gap-4'>
        <li className='flex items-center justify-between'>
          <div className='relative flex items-center gap-2'>
            <img src={storeIcon} alt='상점 이미지' />
            <label htmlFor='store_name' className='input_label'>
              스토어 이름
            </label>
            <span className='absolute -right-1.5 -top-1 text-red'>*</span>
          </div>
          <input
            id='store_name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='이름을 입력해 주세요.'
            className='input_box'
          />
        </li>

        <li className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <img src={mapIcon} alt='주소 이미지' />
            <label htmlFor='store_address' className='input_label'>
              주소
            </label>
          </div>
          <input
            id='store_address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='주소를 입력해 주세요.'
            className='input_box'
          />
        </li>
      </ul>
    </Modal>
  );
};

export default AddStoreModal;
