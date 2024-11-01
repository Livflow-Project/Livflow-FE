import Add_Store from '../components/Add_Store';
import My_Store from '../components/My_Store';
import useUsers_Store from '../Store/useUsers_Store';

const Store = () => {
  const { stores, isDeleteMode, toggleDeleteMode } = useUsers_Store();

  const handleDeleteModeToggle = () => {
    toggleDeleteMode();
  };

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='max-w-[1116px]'>
        <div className='mb-10 flex items-end justify-between'>
          <span className='text-caption text-3xl font-semibold'>
            전체 스토어 ({stores.length})
          </span>
          {stores.length !== 0 ? (
            <button
              className='text-red text-lg hover:font-semibold'
              onClick={handleDeleteModeToggle}
            >
              {isDeleteMode ? '취소하기' : '삭제하기'}
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='flex items-center gap-12'>
          <Add_Store />
          {stores.map((store, index) => (
            <My_Store
              key={index}
              id={store.id}
              name={store.name}
              address={store.address}
              isDeleteMode={isDeleteMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
