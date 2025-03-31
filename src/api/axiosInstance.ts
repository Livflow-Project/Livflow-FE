import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import { showErrorToast } from '@/utils/toast';

// 서버로부터 받는 에러 응답의 타입 정의
type ErrorResponse = {
  message?: string;
};

// 커스텀 에러 응답의 타입 정의
type CustomErrorResponse = {
  status: number;
  message: string;
  originalError: AxiosError<ErrorResponse>;
};

// 환경변수에서 API 기본 URL 가져오기
const { VITE_BASE_REQUEST_URL } = import.meta.env;

// 토큰 갱신을 위한 별도의 axios 인스턴스 생성
// withCredentials: true로 설정하여 쿠키 자동 전송
const refreshTokenInstance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
});

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    await refreshTokenInstance.post('/auth/token/refresh/');
  } catch (error) {
    throw error;
  }
};

// axios 인스턴스에 인터셉터를 추가하는 함수
export const createAxiosInterceptor = (axiosInstance: AxiosInstance) => {
  // 요청 인터셉터 설정
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // FormData인 경우 multipart/form-data로 설정
      // 그 외에는 application/json으로 설정
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponse>) => {
      // 원본 요청 설정을 가져오고 재시도 플래그 추가
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      // 401 에러이고 아직 재시도하지 않은 경우
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          // 토큰 갱신 시도
          await refreshAccessToken();
          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
          showErrorToast('서버 내부 오류가 발생하였습니다.');
          console.log('토큰 갱신 오류 :', refreshError);

          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // HTTP 상태 코드별 에러 처리 함수
      const handleError = (
        status: number,
        defaultMessage: string
      ): Promise<CustomErrorResponse> => {
        // 상태 코드별 에러 메시지 정의
        const errorMessages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          401: '인증에 실패했습니다.',
          403: '접근 권한이 없습니다.',
          404: '요청한 리소스를 찾을 수 없습니다.',
          500: '서버 내부 오류가 발생했습니다.',
        };

        // 서버 응답의 메시지 또는 기본 메시지 사용
        const message =
          error.response?.data?.message ||
          errorMessages[status] ||
          defaultMessage;

        // 커스텀 에러 객체 반환
        return Promise.reject<CustomErrorResponse>({
          status,
          message,
          originalError: error,
        });
      };

      // HTTP 상태 코드별 에러 처리
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

// 인터셉터가 적용된 기본 axios 인스턴스 생성
const axiosInstance = createAxiosInterceptor(
  axios.create({
    baseURL: VITE_BASE_REQUEST_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
);

export default axiosInstance;
