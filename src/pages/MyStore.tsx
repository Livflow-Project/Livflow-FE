import New_Store from '../components/New_Store';

const MyStore = () => {
  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between bg-white px-[275px] py-[180px]'>
      <div className='text-caption text-3xl font-semibold'>전체 스토어 (0)</div>
      <div>
        <New_Store />
      </div>
    </div>
  );
};

export default MyStore;
