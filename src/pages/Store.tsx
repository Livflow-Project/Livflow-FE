import Add_Store from '../components/Add_Store';
import My_Store from '../components/My_Store';
import useUsers_Store from '../Store/useUsers_Store';

const Store = () => {
  const { stores } = useUsers_Store();

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1116px]'>
        <div className='text-caption mb-10 text-3xl font-semibold'>
          전체 스토어 ({stores.length})
        </div>
        <div className='flex items-center gap-12'>
          {stores.map((store, index) => (
            <My_Store
              key={index}
              id={store.id}
              name={store.name}
              address={store.address}
            />
          ))}
          <Add_Store />
        </div>
      </div>
    </div>
  );
};

export default Store;
