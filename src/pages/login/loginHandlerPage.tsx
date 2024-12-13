import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialLoginCallbackMutation } from '@/api/login/login.hooks';

const LoginHandlerPage = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const provider = url.pathname.split('/').pop();

  const navigate = useNavigate();

  const {
    mutate: socialLoginMutation,
    // isPending,
    // error,
  } = useSocialLoginCallbackMutation({
    onSuccess: () => {
      navigate('/store');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (provider && code) {
      console.log(provider, code);
      socialLoginMutation({ provider, code });
    }
  }, [provider, code, socialLoginMutation]);

  // if (isPending) return <LoadingPage />;
  // if (error) return <ErrorPage />;

  return (
    <div>
      에러 페이지 입니다.
      {/* <LoadingPage /> */}
    </div>
  );
};

export default LoginHandlerPage;
