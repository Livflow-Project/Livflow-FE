import VideoFeatureCard from './VideoFeatureCard';
import costCalculatorMp4 from '@/assets/home/mp4/costCalculatorMp4.mp4';
import ingredientMp4 from '@/assets/home/mp4/ingredientMp4.mp4';
import ledgerMp4 from '@/assets/home/mp4/ledgerMp4.mp4';
import { motion } from 'framer-motion';
import storeManagementMp4 from '@/assets/home/mp4/storeManagementMp4.mp4';
import { useRef } from 'react';

const featuresData = [
  {
    title: '가게 통합 관리',
    description: '여러 지점을 한 번에 관리하고 성과를 한눈에 파악하세요',
    videoSrc: storeManagementMp4,
    alt: '가게 통합 관리',
  },
  {
    title: '스마트 가계부',
    description:
      '수입과 지출을 자동으로 분류하고 분석하여 재무 상태를 명확히 파악하세요',
    videoSrc: ledgerMp4,
    alt: '스마트 가계부',
  },
  {
    title: '재료 관리 시스템',
    description: '재고 현황을 실시간으로 추적하고 발주 시점을 놓치지 마세요',
    videoSrc: ingredientMp4,
    alt: '재료 관리 시스템',
  },
  {
    title: '원가 계산기',
    description:
      '정확한 원가 계산으로 최적의 가격 설정과 수익성 분석이 가능합니다',
    videoSrc: costCalculatorMp4,
    alt: '원가 계산기',
  },
];

const VideoFeaturesSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <div id='features' className='container mx-auto px-4 py-20'>
      <motion.h2
        className='mb-6 text-center text-3xl font-bold text-main'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        비즈니스 관리의 새로운 기준
      </motion.h2>

      <motion.p
        className='mx-auto mb-16 max-w-2xl text-center text-base text-gray-600 md:text-lg'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        간편하고 직관적인 인터페이스로 비즈니스 관리가 얼마나 쉬워지는지
        확인하세요
      </motion.p>

      <div className='mx-auto grid grid-cols-1 gap-14 md:grid-cols-2'>
        {featuresData.map((item, index) => (
          <VideoFeatureCard
            key={index}
            {...item}
            index={index}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            onMouseEnter={() => videoRefs.current[index]?.play()}
            onMouseLeave={() => {
              const video = videoRefs.current[index];
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFeaturesSection;
