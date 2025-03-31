import { socialLoginAPI } from './loginAPI';
import { useMutation } from '@tanstack/react-query';

export const useSocialLoginCallbackMutation = () => {
  return useMutation({
    mutationFn: ({
      provider,
      code,
      state,
    }: {
      provider: string;
      code: string;
      state?: string;
    }) => socialLoginAPI.postSocialLoginCallBack({ provider, code, state }),
  });
};
