import Add_Store from '../components/Add_Store';
import My_Store from '../components/My_Store';

const Store = () => {
  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1116px]'>
        <div className='text-caption mb-10 text-3xl font-semibold'>
          전체 스토어 (0)
        </div>
        <div className='flex items-center gap-12'>
          <My_Store />
          <My_Store />
          <Add_Store />
        </div>
      </div>
    </div>
  );
};

export default Store;
