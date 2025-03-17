import FeaturesCardSection from '@/components/home/FeaturesCardSection';
import Footer from '@/layout/footer';
import GettingStartedSection from '@/components/home/GettingStartedSection';
import HeroSection from '@/components/home/HeroSection';
import ProblemSolutionSection from '@/components/home/ProblemSolutionSection';
import StartBtn from '@/components/home/StartBtn';
import VideoFeaturesSection from '@/components/home/VideoFeaturesSection';

const Home = () => {
  return (
    <>
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 제품 Video 섹션 */}
      <VideoFeaturesSection />

      {/* 문제-해결 섹션 */}
      <ProblemSolutionSection />

      {/* 시작하기 단계 섹션 */}
      <GettingStartedSection />

      {/* 기능 카드 섹션 */}
      <FeaturesCardSection />

      {/* 푸터 */}
      <Footer />

      {/* 시작하기 버튼 */}
      <StartBtn />
    </>
  );
};

export default Home;
