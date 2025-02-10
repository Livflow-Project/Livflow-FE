import LoadingPage from '@/pages/status/loadindPage';
import { showErrorToast } from '@/utils/toast';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isInitialized } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      showErrorToast('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [isLoggedIn, isInitialized, navigate]);

  if (!isInitialized) {
    return <LoadingPage />;
  }

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
