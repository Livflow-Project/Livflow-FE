import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import LoadingPage from '@/pages/status/loadindPage';
import axiosInstance from '@/api/axiosInstance';
import { showErrorToast } from '@/utils/toast';

type AuthContextType = {
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 로그인 상태 체크
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await axiosInstance.post('/users/token/verify/');
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error);
        setIsLoggedIn(false);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async () => {
    try {
      const response = await axiosInstance.post('/users/token/verify/');
      if (response.status === 200) {
        setIsLoggedIn(true);
        window.location.href = '/store';
      }
    } catch (error) {
      showErrorToast('로그인 중 오류가 발생하였습니다.');
      console.error('로그인 중 오류 발생:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post('/users/logout/');
      if (response.status === 200) {
        // 쿠키에서 액세스 토큰 삭제
        document.cookie =
          'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // axios 인터셉터의 인증 헤더 제거
        delete axiosInstance.defaults.headers.common['Authorization'];

        setIsLoggedIn(false);
        window.location.href = '/';
      }
    } catch (error) {
      showErrorToast('로그아웃에 실패하였습니다.');
      console.error('로그아웃 중 오류 발생:', error);
      throw error;
    }
  };

  const value = {
    isLoggedIn,
    isInitialized,
    login,
    logout,
  };

  if (!isInitialized) {
    return <LoadingPage />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth Hook은 AuthProvider 내부에서만 사용할 수 있습니다.' +
        '컴포넌트가 AuthProvider로 감싸져 있는지 확인해주세요.'
    );
  }
  return context;
};
