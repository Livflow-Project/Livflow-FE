import { plusButton } from '@/assets/assets';

interface AddStoreProps {
  onOpenModal: () => void;
}

const AddStore = ({ onOpenModal }: AddStoreProps) => {
  return (
    <div className='store_box flex items-center justify-center'>
      <div
        className='flex cursor-pointer flex-col items-center justify-between gap-9'
        onClick={onOpenModal}
      >
        <img src={plusButton} alt='플러스 이미지' className='w-[53px]' />
        <div className='text-xl font-normal text-caption'>스토어 추가하기</div>
      </div>
    </div>
  );
};

export default AddStore;
