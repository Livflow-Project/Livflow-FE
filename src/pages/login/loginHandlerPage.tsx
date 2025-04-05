import ErrorPage from '../status/errorPage';
import LoadingPage from '../status/loadindPage';
import NotfoundPage from '../status/notFoundIcon';
import { showErrorToast } from '@/utils/toast';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialLoginCallbackMutation } from '@/api/login/login.hooks';

const LoginHandlerPage = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') ?? undefined;
  const provider = url.pathname.split('/').pop();

  const { login } = useAuth();

  const navigate = useNavigate();

  if (!code) {
    return <NotfoundPage />;
  }

  const {
    mutate: socialLoginMutation,
    isPending,
    error,
  } = useSocialLoginCallbackMutation();

  useEffect(() => {
    if (provider && code) {
      socialLoginMutation(
        { provider, code, state },
        {
          onSuccess: () => {
            login();
          },
          onError: (error) => {
            showErrorToast('로그인 중 오류가 발생하였습니다.');
            console.error('로그인 실패:', error);
          },
        }
      );
    }
  }, [provider, code, state, socialLoginMutation, login, navigate]);

  if (isPending) return <LoadingPage />;

  if (error) {
    return (
      <ErrorPage
        error={error as Error}
        resetError={() => {
          if (provider && code) {
            socialLoginMutation({ provider, code, state });
          } else {
            navigate('/login');
          }
        }}
      />
    );
  }
};

export default LoginHandlerPage;
