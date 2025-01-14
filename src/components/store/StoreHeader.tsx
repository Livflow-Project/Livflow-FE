type StoreHeaderProps = {
  storeCount: number;
  isDeleteMode: boolean;
  onDeleteModeToggle: () => void;
};

const StoreHeader = ({
  storeCount,
  isDeleteMode,
  onDeleteModeToggle,
}: StoreHeaderProps) => {
  return (
    <header className='mb-10 flex w-[400px] items-end justify-between pl-[60px]'>
      <h1 className='text-3xl font-semibold text-caption'>
        전체 스토어 ({storeCount})
      </h1>
      {storeCount > 0 && (
        <button
          type='button'
          className='text-lg text-red hover:font-semibold'
          onClick={onDeleteModeToggle}
        >
          {isDeleteMode ? '취소하기' : '삭제하기'}
        </button>
      )}
    </header>
  );
};

export default StoreHeader;
