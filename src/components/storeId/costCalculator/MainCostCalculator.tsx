// type MainCostCalculatorProps = {
//   storeId: string;
// };

// const MainCostCalculator = ({ storeId }: MainCostCalculatorProps) => {

const MainCostCalculator = () => {
  return (
    <>
      <div className='flex h-full justify-between px-[35px] py-[30px]'>
        <div className='flex h-full w-[70%] flex-col justify-between'>
          <header className='h-[60px] w-full rounded-lg bg-white'></header>
          <article className='h-[calc(100%-70px)] w-full rounded-xl bg-white'></article>
        </div>

        <ul className='flex h-full w-[28%] flex-col justify-between'>
          <li className='h-[50%] w-full rounded-xl bg-white/50'></li>
          <li className='h-[48%] w-full rounded-xl bg-white/50'></li>
        </ul>
        {/* <div className='flex items-center'>
          {!isEditMode && (
            <Button onClick={handleModalOpen}>메뉴 추가하기</Button>
          )}
          <div className={`${isEditMode ? '' : 'ml-5'} flex gap-5`}>
            <Button onClick={toggleEditMode}>
              {isEditMode ? '완료하기' : '삭제하기'}
            </Button>
          </div>
        </div> */}
      </div>

      {/* {isModalOpen && (
        <CostCalculatorModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingIngredient(null);
          }}
          storeId={storeId}
          isEditMode={!!editingIngredient}
          initialData={editingIngredient || undefined}
        />
      )} */}
    </>
  );
};

export default MainCostCalculator;
