// import Footer from '../components/layout/Footer';
import Start_Btn from '../components/Start_Btn';

const Home = () => {
  return (
    <div className='h- flex h-[calc(100vh-75px)] items-center justify-center'>
      <div className='flex items-center gap-5'>
        <img
          src='../../public/LogoWhale.svg'
          alt='메인 로고'
          className='animate-smoothWaveAndSlide h-[200px]'
        />
        <img
          src='../../public/LogoText.svg'
          alt='메인 로고'
          className='h-[70px]'
        />
      </div>

      <Start_Btn />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
