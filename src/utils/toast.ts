import { ToastOptions, toast } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const showWarnToast = (message: string) =>
  toast.warn(message, toastConfig);

export const showErrorToast = (message: string) =>
  toast.error(message, toastConfig);
