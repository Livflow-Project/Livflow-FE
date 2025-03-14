import { ToastOptions, toast } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const showSuccessToast = (
  message: string,
  options?: Partial<ToastOptions>
) => toast.success(message, { ...toastConfig, ...options });

export const showWarnToast = (
  message: string,
  options?: Partial<ToastOptions>
) => toast.warn(message, { ...toastConfig, ...options });

export const showErrorToast = (
  message: string,
  options?: Partial<ToastOptions>
) => toast.error(message, { ...toastConfig, ...options });
