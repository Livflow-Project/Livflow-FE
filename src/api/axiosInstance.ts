import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

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
    async (error) => {
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
