import { Cookies } from 'react-cookie';
import axiosInstance from '../axiosInstance';

export const socialLoginAPI = {
  getRedirectToSocialLogin: async (provider: string) => {
    const response = await axiosInstance.get(`/auth/login/${provider}`);
    return response.data;
  },

  postSocialLoginCallBack: async (params: {
    provider: string;
    code: string;
    state?: string;
  }) => {
    const { provider, code, state } = params;

    // 네이버 로그인인 경우 state 파라미터 추가
    const requestBody =
      provider === 'naver' && state ? { code, state } : { code };

    const response = await axiosInstance.post(
      `/users/${provider}/login/callback/`,
      requestBody
    );

    // 응답으로 받은 토큰을 쿠키에 저장
    const cookies = new Cookies();
    cookies.set('access_token', response.data.access, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    return response.data;
  },
};
