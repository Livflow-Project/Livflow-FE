type MyStoreProps = {
  storeCount: number;
  isDeleteMode: boolean;
  onDeleteModeToggle: () => void;
};

const StoreHeader = ({
  storeCount,
  isDeleteMode,
  onDeleteModeToggle,
}: MyStoreProps) => {
  return (
    <div className='mb-10 flex w-[400px] items-end justify-between pl-[60px]'>
      <span className='text-3xl font-semibold text-caption'>
        전체 스토어 ({storeCount})
      </span>
      {storeCount !== 0 && (
        <button
          className='text-lg text-red hover:font-semibold'
          onClick={onDeleteModeToggle}
        >
          {isDeleteMode ? '취소하기' : '삭제하기'}
        </button>
      )}
    </div>
  );
};

export default StoreHeader;
