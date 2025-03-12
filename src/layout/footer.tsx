import { Link } from 'react-router-dom';
import { logoWhale } from '@/assets/assets';

const Footer = () => {
  return (
    <footer className='bg-gray-800 py-8 text-white'>
      <div className='container mx-auto px-4'>
        {/* 상단 섹션 */}
        <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
          {/* 로고 */}
          <div className='mb-4 md:mb-0'>
            <img src={logoWhale} alt='로고' className='h-10' />
          </div>

          {/* 로그인/회원가입 CTA */}
          <div className='flex space-x-4'>
            <Link
              to='/login'
              className='rounded-full bg-main/60 px-5 py-2 text-white transition duration-300 hover:bg-primary'
            >
              로그인
            </Link>
          </div>
        </div>

        {/* 기능 소개 섹션 */}
        <div className='mb-6 grid grid-cols-1 gap-4 border-t border-gray-700 pt-6 text-center md:grid-cols-4 md:text-left'>
          <div>
            <h3 className='mb-2 font-semibold text-white'>가게 통합 관리</h3>
            <p className='text-sm text-gray-300'>
              다양한 가게의 정보를 한 곳에서 효율적으로 관리하세요.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold text-white'>스마트 가계부</h3>
            <p className='text-sm text-gray-300'>
              수익과 지출을 직관적으로 관리하고 분석하세요.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold text-white'>재료 관리 시스템</h3>
            <p className='text-sm text-gray-300'>
              모든 재료를 한눈에 관리하고 재고를 실시간으로 파악하세요.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold text-white'>원가 계산기</h3>
            <p className='text-sm text-gray-300'>
              정확한 가격 책정으로 수익성을 최적화하세요.
            </p>
          </div>
        </div>

        {/* 연락처 정보 섹션 (새로 추가) */}
        <div className='mb-6 border-t border-gray-700 pt-6 text-center md:text-left'>
          <h3 className='mb-2 font-semibold text-white'>연락처</h3>
          <p className='text-sm text-gray-300'>
            문의사항이 있으시면 이메일로 연락해주세요 :
          </p>
          <div className='mt-2 flex flex-col items-center justify-start space-y-1 md:flex-row md:items-start md:space-x-4 md:space-y-0'>
            <a
              href='mailto:dudrknd1642@gmail.com'
              className='text-gray-300 hover:text-white'
            >
              dudrknd1642@gmail.com
            </a>
            <a
              href='mailto:second-email@example.com'
              className='text-gray-300 hover:text-white'
            >
              guswwn1925@gmail.com
            </a>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className='flex flex-col items-center justify-between border-t border-gray-700 pt-6 md:flex-row'>
          <p className='text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} Livflow. 포트폴리오 프로젝트
          </p>
          <div className='mt-4 flex space-x-4 md:mt-0'>
            <Link
              to='/privacy'
              className='text-sm text-gray-400 hover:text-white'
            >
              개인정보 처리방침
            </Link>
            <Link
              to='/terms'
              className='text-sm text-gray-400 hover:text-white'
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
