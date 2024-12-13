import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { socialLoginAPI } from './loginAPI';

export const socialLoginQueries = createQueryKeyStore({
  login: {
    redirectToProvider: (provider: string) => ({
      queryKey: ['login', provider],
      queryFn: () => socialLoginAPI.getRedirectToSocialLogin(provider),
    }),
  },
});
