type StoreHeaderProps = {
  storeCount: number;
  isDeleteMode: boolean;
  onToggleDeleteMode: () => void;
};

const StoreHeader = ({
  storeCount,
  isDeleteMode,
  onToggleDeleteMode,
}: StoreHeaderProps) => {
  return (
    <header className='flex w-[340px] items-end justify-between'>
      <h1 className='text-3xl font-semibold text-caption'>
        전체 스토어 ({storeCount})
      </h1>
      {storeCount > 0 && (
        <button
          type='button'
          className='text-lg text-red hover:font-semibold'
          onClick={onToggleDeleteMode}
        >
          {isDeleteMode ? '완료하기' : '삭제하기'}
        </button>
      )}
    </header>
  );
};

export default StoreHeader;
