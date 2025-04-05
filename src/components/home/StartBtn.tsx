import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { rightArrow } from '@/assets/assets';
import { twMerge } from 'tailwind-merge';

const StartBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = window.innerHeight - 65;

      if (window.scrollY > heroSectionHeight * 0.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={twMerge(
        'pointer-events-none fixed bottom-9 z-50 flex w-[100%] justify-center transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
    >
      <Link to='/login' className='pointer-events-auto'>
        <button className='relative h-[62px] w-[274px] rounded-[96px] bg-button text-xl text-white shadow-md transition-all hover:bg-button_hover'>
          Livflow 시작하기
          <img
            src={rightArrow}
            alt='Arrow Icon'
            className='absolute right-8 top-1/2 -translate-y-1/2 transform'
          />
        </button>
      </Link>
    </div>
  );
};

export default StartBtn;
