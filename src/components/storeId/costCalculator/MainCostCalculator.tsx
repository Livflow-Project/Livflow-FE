import Button from '@/components/common/Button';
import CostCalculatorHeader from './components/costCalculator/costCalculatorTable/CostCalculatorHeader';
import Header from './components/costCalculator/Header';
import ImageUploader from './components/costCalculator/ImageUploader';
import SummaryInfo from './components/costCalculator/SummaryInfo';

type MainCostCalculatorProps = {
  onSave: () => void;
  onCancel: () => void;
};

const MainCostCalculator = ({ onSave, onCancel }: MainCostCalculatorProps) => {
  return (
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
          <Button onClick={onCancel}>취소하기</Button>
          <Button onClick={onSave}>메뉴 저장하기</Button>
        </div>
      </div>
    </div>
  );
};

export default MainCostCalculator;
