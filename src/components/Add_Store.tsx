import Map_Icon from '../assets/Map_Icon.svg';
import Plus_Button from '../assets/Plus_Button.svg';
import ReactDOM from 'react-dom';
import Store_Icon from '../assets/Store_Icon.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useUsers_Store from '../store/useUsers_Store';

const Add_Store = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const addStore = useUsers_Store((state) => state.addStore);

  const toggleModal = () => {
    toast.dismiss();
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.warn('스토어 이름은 필수 입력 요소입니다.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    addStore({
      name,
      address,
    });
    setName('');
    setAddress('');
    toggleModal();
  };

  const storeModalContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={toggleModal}
    >
      <div
        className='w-[520px] rounded-xl bg-white p-[40px] text-center shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <form className='flex flex-col gap-7' onSubmit={handleConfirm}>
          <ul className='flex flex-col gap-4'>
            <li className='flex items-center justify-between'>
              <div className='relative flex items-center gap-2'>
                <img src={Store_Icon} alt='상점 이미지' />
                <label
                  htmlFor='store_name'
                  className='text-xl font-medium text-main'
                >
                  스토어 이름
                </label>
                <span className='absolute -right-1.5 -top-1 text-red'>*</span>
              </div>
              <input
                id='store_name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='이름를 입력해 주세요.'
                className='w-[60%] rounded-lg border px-3 py-2'
              />
            </li>
            <li className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <img src={Map_Icon} alt='주소 이미지' />
                <label
                  htmlFor='store_address'
                  className='text-xl font-medium text-main'
                >
                  주소
                </label>
              </div>
              <input
                id='store_address'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='주소를 입력해 주세요.'
                className='w-[60%] rounded-lg border px-3 py-2'
              />
            </li>
          </ul>
          <div className='flex justify-between px-14'>
            <button
              type='button'
              onClick={toggleModal}
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

  return (
    <div className='store_box flex items-center justify-center'>
      <div
        className='flex cursor-pointer flex-col items-center justify-between gap-9'
        onClick={toggleModal}
      >
        <img src={Plus_Button} alt='플러스 이미지' className='w-[53px]' />
        <div className='text-xl font-normal text-caption'>스토어 추가하기</div>
      </div>

      {isModalOpen && ReactDOM.createPortal(storeModalContent, document.body)}
    </div>
  );
};

export default Add_Store;
