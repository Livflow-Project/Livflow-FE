// type MainCostCalculatorProps = {
//   storeId: string;
// };

import Button from '@/components/common/Button';
import { imageIcon } from '@/assets/assets';

// const MainCostCalculator = ({ storeId }: MainCostCalculatorProps) => {

const MainCostCalculator = () => {
  return (
    <>
      <div className='flex h-full justify-between px-[35px] py-[30px]'>
        <div className='flex h-full w-[70%] flex-col justify-between'>
          <header className='flex h-[60px] w-full items-center justify-evenly rounded-lg bg-white text-xl'>
            <div className='w-[45%]'>
              <span>메뉴 이름 : </span>
              <input />
            </div>
            <div className='h-[40px] w-[1px] bg-caption'></div>
            <div className='w-[45%]'>
              <span>판매 가격 : </span>
              <input />
              <span>원</span>
            </div>
          </header>

          <article className='h-[calc(100%-80px)] w-full rounded-xl bg-white'>
            <ul className='flex h-[65px] w-full items-center border-b border-underline text-center text-xl font-semibold text-main'>
              <li className='w-[20%] min-w-20'>사용 재료</li>

              <li className='w-[15%]'>재고</li>

              <li className='w-[20%]'>사용량</li>

              <li className='w-[10%]'>단위</li>

              <li className='w-[20%]'>재료 원가</li>

              <li className='w-[15%]'>원가 비율</li>
            </ul>
          </article>
        </div>

        <div className='flex h-full w-[28%] flex-col justify-between'>
          <article className='h-[30%] w-full rounded-xl bg-white/50'>
            <ul className='flex h-full flex-col items-start justify-evenly px-5 text-xl font-semibold text-main'>
              <li>총 재료 원가 : </li>
              <li>생산 수량 : </li>
              <li>생산 단가 </li>
            </ul>
          </article>

          <article className='h-[58%] w-full rounded-xl bg-white/50'>
            <ul className='flex h-full flex-col items-start justify-between gap-5 p-5 text-xl font-semibold text-main'>
              <li>메뉴 이미지 등록</li>
              <li className='flex h-full w-full items-center justify-center'>
                <img
                  src={imageIcon}
                  alt='이미지 아이콘'
                  className='cursor-pointer opacity-70 hover:opacity-100'
                />
              </li>
            </ul>
          </article>

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
