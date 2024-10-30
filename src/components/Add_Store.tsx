import Plus_Button from '../assets/Plus_Button.svg';
import { useState } from 'react';

const Add_Store = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleConfirm = (name: string, address: string) => {
    toggleModal();
  };

  return (
    <>
      <div className='store_box flex items-center justify-center'>
        <div
          className='flex cursor-pointer flex-col items-center justify-between gap-9'
          onClick={toggleModal}
        >
          <img src={Plus_Button} alt='플러스 이미지' className='w-[53px]' />
          <div className='text-caption text-xl font-normal'>
            스토어 추가하기
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className='bg-m_background/70 fixed inset-0 z-50 flex items-center justify-center'
          onClick={toggleModal}
        >
          <div
            className='w-[400px] rounded-lg bg-white p-8 text-center shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='mb-4 text-xl font-bold'>스토어 정보 입력</h2>
            <input
              type='text'
              placeholder='상점 이름'
              className='mb-2 w-full border p-2'
            />
            <input
              type='text'
              placeholder='상점 주소'
              className='mb-4 w-full border p-2'
            />
            <div className='flex justify-between'>
              <button
                onClick={toggleModal}
                className='choice_button opacity-70'
              >
                취소
              </button>
              <button
                onClick={() => handleConfirm('상점 이름', '상점 주소')}
                className='choice_button'
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add_Store;
