import { calculator, ingredient, ledger, store } from '@/assets/assets';

import FeatureCard from '@/components/home/featureCard';

const MainLanding = () => {
  return (
    <div className='flex w-full flex-col items-center justify-start bg-gray-100 py-24'>
      <h1 className='mb-16 text-3xl font-bold text-main'>
        모든 비즈니스 관리를 한 곳에서
      </h1>

      <div className='flex w-full flex-col items-center gap-36'>
        <FeatureCard
          image={store}
          title='가게 통합 관리'
          description1='다양한 가게의 정보를 한 곳에서 효율적으로 확인하고 관리하세요.'
          description2='한 계정에 여러 개의 스토어를 등록하여 각 가게의 관리가 번거롭지 않게 도와줍니다.'
        />

        <FeatureCard
          image={ledger}
          title='스마트 가계부'
          description1='수익과 지출을 직관적으로 관리하고 분석하세요.'
          description2='자동화된 분류 기능으로 보다 쉽게 사업 현황을 파악할 수 있습니다.'
        />

        <FeatureCard
          image={ingredient}
          title='재료 관리 시스템'
          description1='모든 재료를 한눈에 관리하세요.'
          description2='실시간 재고 파악과 재료 관리를 효율적으로 할 수 있습니다.'
        />

        <FeatureCard
          image={calculator}
          title='원가 계산기'
          description1='정확한 가격 책정으로 수익성을 최적화하세요.'
          description2='레시피 등록 시 자동으로 원가를 계산해 드립니다.'
        />
      </div>
    </div>
  );
};

export default MainLanding;
