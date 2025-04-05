import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

type ErrorResponse = {
  message?: string;
};

type CustomErrorResponse = {
  status: number;
  message: string;
  originalError: AxiosError<ErrorResponse>;
};

const { VITE_BASE_REQUEST_URL } = import.meta.env;

export const createAxiosInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('access_token=')
      );

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1].trim();
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const handleError = (
        status: number,
        defaultMessage: string
      ): Promise<CustomErrorResponse> => {
        const errorMessages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          401: '인증에 실패했습니다.',
          403: '접근 권한이 없습니다.',
          404: '요청한 리소스를 찾을 수 없습니다.',
          500: '서버 내부 오류가 발생했습니다.',
        };

        const message =
          error.response?.data?.message ||
          errorMessages[status] ||
          defaultMessage;

        return Promise.reject<CustomErrorResponse>({
          status,
          message,
          originalError: error,
        });
      };

      switch (error.response?.status) {
        case 400:
          return handleError(400, '잘못된 요청입니다.');
        case 401:
          return handleError(401, '인증에 실패했습니다.');
        case 403:
          return handleError(403, '접근 권한이 없습니다.');
        case 404:
          return handleError(404, '리소스를 찾을 수 없습니다.');
        case 500:
          return handleError(500, '서버 내부 오류');
        default:
          return Promise.reject(error);
      }
    }
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInterceptor(
  axios.create({
    baseURL: VITE_BASE_REQUEST_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
);

export default axiosInstance;
