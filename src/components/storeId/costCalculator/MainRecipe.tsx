const MainRecipe = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <ul className='grid grid-cols-4 gap-x-20 gap-y-10'>
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className='border-gray h-[250px] w-[200px] rounded-lg border border-opacity-20 bg-white shadow-xl'
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default MainRecipe;
