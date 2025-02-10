import ErrorPage from '../status/errorPage';
import LoadingPage from '../status/loadindPage';
import NotfoundPage from '../status/notFoundIcon';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialLoginCallbackMutation } from '@/api/login/login.hooks';

const LoginHandlerPage = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const provider = url.pathname.split('/').pop();

  const navigate = useNavigate();

  // code가 없는 경우 404 페이지 렌더링
  if (!code) {
    return <NotfoundPage />;
  }

  const {
    mutate: socialLoginMutation,
    isPending,
    error,
  } = useSocialLoginCallbackMutation({
    onSuccess: () => {
      navigate('/store');
    },
    onError: (error) => {
      toast.dismiss();

      toast.error('로그인 중 오류가 발생하였습니다.');
      console.log(error);
    },
  });

  useEffect(() => {
    if (provider && code) {
      console.log(provider, code);
      socialLoginMutation({ provider, code });
    }
  }, [provider, code, socialLoginMutation]);

  if (isPending) return <LoadingPage />;

  if (error) {
    return (
      <ErrorPage
        error={error as Error}
        resetError={() => {
          if (provider && code) {
            socialLoginMutation({ provider, code });
          } else {
            navigate('/login');
          }
        }}
      />
    );
  }
};

export default LoginHandlerPage;
