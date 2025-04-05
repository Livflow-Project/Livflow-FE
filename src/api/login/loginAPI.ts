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

    const requestBody =
      provider === 'naver' && state ? { code, state } : { code };

    const response = await axiosInstance.post(
      `/users/${provider}/login/callback/`,
      requestBody
    );

    const cookies = new Cookies();
    cookies.set('access_token', response.data.access, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    return response.data;
  },
};
