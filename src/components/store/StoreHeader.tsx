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
    <header className='flex w-[300px] items-end justify-between'>
      <h2 className='text-2xl font-semibold text-caption'>
        전체 스토어 ({storeCount})
      </h2>
      {storeCount > 0 && (
        <button
          type='button'
          className='text-red/70 transition-colors duration-200 hover:font-semibold hover:text-red'
          onClick={onToggleDeleteMode}
        >
          {isDeleteMode ? '완료하기' : '삭제하기'}
        </button>
      )}
    </header>
  );
};

export default StoreHeader;
