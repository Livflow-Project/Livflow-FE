import { ReactNode, createContext, useContext, useState } from 'react';

import { Cookies } from 'react-cookie';
import LoadingPage from '@/pages/status/loadindPage';

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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isInitialized, setIsInitialized] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInitialized, setIsInitialized] = useState(true);

  const cookies = new Cookies();

  // // 초기 로그인 상태 체크
  // useEffect(() => {
  //   const initializeAuth = () => {
  //     try {
  //       const accessToken = cookies.get('access_token');
  //       if (accessToken) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('토큰 검증 중 오류 발생:', error);
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsInitialized(true);
  //     }
  //   };

  //   initializeAuth();
  // }, []);

  const login = () => {
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    try {
      cookies.remove('access_token', {
        path: '/',
        domain: window.location.hostname,
        secure: true,
        sameSite: 'strict',
      });
      setIsLoggedIn(false);
      window.location.href = '/';
    } catch (error) {
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
