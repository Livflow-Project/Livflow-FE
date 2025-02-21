// type MainCostCalculatorProps = {
//   storeId: string;
// };

import Button from '@/components/common/Button';
import CostCalculatorHeader from './components/Header';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SummaryInfo from './components/SummaryInfo';

// const MainCostCalculator = ({ storeId }: MainCostCalculatorProps) => {

const MainCostCalculator = () => {
  return (
    <>
      <div className='flex h-full justify-between px-[35px] py-[30px]'>
        <div className='flex h-full w-[70%] flex-col justify-between'>
          <Header />

          <article className='h-[calc(100%-80px)] w-full rounded-xl bg-white'>
            <CostCalculatorHeader />
          </article>
        </div>

        <div className='flex h-full w-[28%] flex-col justify-between'>
          <SummaryInfo />

          <ImageUploader />

          <div className='flex items-center justify-between'>
            <Button children={' 취소하기'} />
            <Button children={'메뉴 저장하기'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCostCalculator;
