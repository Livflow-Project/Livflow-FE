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
  }) => {
    const { provider, code } = params;
    const response = await axiosInstance.post(
      `/users/${provider}/login/callback/`,
      {
        code,
      }
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
