import { plusButton } from '@/assets/assets';

type AddStoreProps = {
  onOpenModal: () => void;
};

const AddStore = ({ onOpenModal }: AddStoreProps) => {
  return (
    <button
      type='button'
      className='store_box flex items-center justify-center'
      onClick={onOpenModal}
    >
      <div className='flex flex-col items-center justify-between gap-9'>
        <img
          src={plusButton}
          alt='플러스 이미지'
          className='w-[53px]'
          width={53}
          height={53}
        />
        <span className='text-xl font-normal text-caption'>
          스토어 추가하기
        </span>
      </div>
    </button>
  );
};

export default AddStore;
