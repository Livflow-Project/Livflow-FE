import { mapIcon, storeIcon } from '@/assets/assets';

import { toast } from 'react-toastify';
import { useState } from 'react';
import useUsersStore from '@/store/useUsersStore';

interface AddStoreModalProps {
  onClose: () => void;
}

const AddStoreModal: React.FC<AddStoreModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const addStore = useUsersStore((state) => state.addStore);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.warn('스토어 이름은 필수 입력 요소입니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    addStore({ name, address });

    setName('');
    setAddress('');

    onClose();
    toast.dismiss();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      toast.dismiss();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <div className='modal_div w-[520px]' onClick={(e) => e.stopPropagation()}>
        <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
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

          <div className='button_gap'>
            <button
              type='button'
              onClick={onClose}
              className='choice_button opacity-70'
            >
              취소
            </button>
            <button type='submit' className='choice_button'>
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoreModal;
