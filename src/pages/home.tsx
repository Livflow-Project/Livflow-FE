import { logoText, logoWhale } from '@/assets/assets';

import Footer from '@/layout/footer';
import MainLanding from '@/layout/mainLanding';
import StartBtn from '@/components/home/StartBtn';
import ingredientMp4 from '@/assets/home/ingredientMp4.mp4';
import ledgerMp4 from '@/assets/home/ledgerMp4.mp4';
import { motion } from 'framer-motion';
import storeManagementMp4 from '@/assets/home/storeManagementMp4.mp4';
import { useRef } from 'react';

const Home = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <>
      {/* 히어로 섹션 */}
      <div className='relative flex h-[calc(100dvh-75px)] w-full flex-col items-center justify-center bg-gradient-to-b from-white to-main/5'>
        <motion.h1
          className='mb-2 text-center text-[40px] font-bold text-main'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          효율적인 비즈니스 관리를 위한 올인원 웹 서비스
        </motion.h1>

        <motion.p
          className='text-center text-base text-gray-600 md:text-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          복잡한 엑셀 작업은 이제 그만! 간편하고 직관적인 인터페이스로 사업
          관리의 번거로움을 줄여드립니다.
        </motion.p>

        <motion.div
          className='mt-16 flex items-center justify-center gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.img
            src={logoWhale}
            alt='메인 로고'
            className='h-[260px] drop-shadow-xl filter'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 1,
            }}
          />
          <motion.img
            src={logoText}
            alt='메인 로고'
            className='h-[70px]'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              ease: 'easeOut',
            }}
          />
        </motion.div>

        <motion.div
          className='absolute bottom-10 left-0 right-0 mx-auto w-max'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <a
            href='#features'
            className='flex flex-col items-center text-main/70 transition-colors hover:text-main'
          >
            <span className='mb-2'>더 알아보기</span>
            <svg
              className='h-6 w-6 animate-bounce'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* 제품 데모 GIF 섹션 */}
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
          {[
            {
              title: '가게 통합 관리',
              description:
                '여러 지점을 한 번에 관리하고 성과를 한눈에 파악하세요',
              videoSrc: storeManagementMp4,
              alt: '가게 통합 관리 데모',
            },
            {
              title: '스마트 가계부',
              description:
                '수입과 지출을 자동으로 분류하고 분석하여 재무 상태를 명확히 파악하세요',
              videoSrc: ledgerMp4,
              alt: '스마트 가계부 데모',
            },
            {
              title: '재료 관리 시스템',
              description:
                '재고 현황을 실시간으로 추적하고 발주 시점을 놓치지 마세요',
              videoSrc: ingredientMp4,
              alt: '재료 관리 시스템 데모',
            },
            {
              title: '원가 계산기',
              description:
                '정확한 원가 계산으로 최적의 가격 설정과 수익성 분석이 가능합니다',
              videoSrc: '/path-to-cost-calculator.gif',
              alt: '원가 계산기 데모',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className='group transform overflow-hidden rounded-xl border border-underline/20 shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-xl'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => videoRefs.current[index]?.play()}
              onMouseLeave={() => {
                const video = videoRefs.current[index];
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
              <div className='bg-gray-50 p-4 text-left'>
                <h3 className='text-xl font-semibold text-main'>
                  {item.title}
                </h3>
                <p className='mt-1 text-sm text-gray-600'>{item.description}</p>
              </div>
              <div className='relative overflow-hidden'>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.videoSrc}
                  muted
                  loop
                  playsInline
                  preload='metadata'
                  className='h-[350px] w-full scale-105 transform-gpu object-center'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-caption/30 transition-opacity duration-300 group-hover:opacity-0'>
                  <div className='rounded-full bg-white p-3 transition-transform group-hover:scale-110'>
                    <svg
                      className='h-8 w-8 text-main'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 문제-해결 섹션 */}
      <div className='w-full bg-gradient-to-br from-gray-50 to-main/5 py-24'>
        <div className='container mx-auto px-4'>
          <motion.h2
            className='mb-16 text-center text-3xl font-bold text-main'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            비즈니스 관리의 어려움, Livflow가 해결합니다
          </motion.h2>

          {/* 문제-해결 내용 */}
          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2'>
            <motion.div
              className='rounded-xl bg-white p-8 shadow-md'
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className='mb-6 flex items-center text-xl font-semibold text-red'>
                <svg
                  className='mr-2 h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
                이런 어려움을 겪고 계신가요?
              </h3>

              <ul className='space-y-4'>
                {[
                  '여러 가게의 정보를 관리하느라 시간을 낭비하고 있음',
                  '복잡한 엑셀 파일로 가계부와 재고를 관리하기 어려움',
                  '정확한 원가 계산이 어려워 수익성 분석에 문제가 있음',
                  '재료 관리가 비효율적이어서 재고 파악이 어려움',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className='flex items-start rounded-lg bg-red/5 p-3'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  >
                    <span className='mr-3 text-lg text-red'>✕</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className='rounded-xl bg-white p-8 shadow-md'
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className='mb-6 flex items-center text-xl font-semibold text-green'>
                <svg
                  className='mr-2 h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                Livflow의 해결책
              </h3>

              <ul className='space-y-4'>
                {[
                  '한 계정으로 모든 가게 정보를 한눈에 관리',
                  '직관적인 인터페이스로 손쉬운 가계부 및 재고 관리',
                  '자동화된 원가 계산으로 정확한 수익성 분석',
                  '실시간 재고 파악으로 효율적인 재료 관리',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className='flex items-start rounded-lg bg-green/5 p-3'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  >
                    <span className='mr-3 text-lg text-green'>✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 시작하기 단계 섹션 */}
      <div className='w-full bg-white py-24'>
        <div className='container mx-auto'>
          <motion.h2
            className='mb-6 text-center text-3xl font-bold text-main'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Livflow 시작하기
          </motion.h2>

          <motion.p
            className='mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            몇 가지 간단한 단계만으로 비즈니스 관리의 혁신을 경험하세요
          </motion.p>

          {/* 시작하기 단계 내용 */}
          <div className='relative mx-auto max-w-[1300px]'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              {[
                {
                  step: 1,
                  title: '계정 생성',
                  description: '소셜 로그인으로 간편하게 가입하고 시작하세요.',
                  icon: '👤',
                },
                {
                  step: 2,
                  title: '스토어 등록',
                  description: '관리할 가게 정보를 입력하고 설정하세요.',
                  icon: '🏪',
                },
                {
                  step: 3,
                  title: '기능 활용',
                  description:
                    '가계부, 재고 관리, 원가 계산 등 다양한 기능을 이용하세요.',
                  icon: '🚀',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className='flex flex-col items-center'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <div className='relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-main text-white shadow-lg'>
                    <span className='text-3xl'>{item.icon}</span>
                    <div className='absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-main shadow-md'>
                      {item.step}
                    </div>
                  </div>
                  <div className='w-full rounded-xl border border-underline/15 bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl'>
                    <h3 className='mb-2 text-xl font-semibold text-main'>
                      {item.title}
                    </h3>
                    <p className='min-h-[50px] text-[16px] text-gray-600'>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>

      {/* 메인 랜딩 섹션 */}
      <MainLanding />

      {/* 푸터 */}
      <Footer />

      {/* 시작하기 버튼 */}
      <StartBtn />
    </>
  );
};

export default Home;
