import { Id, ToastOptions, toast } from 'react-toastify';

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

const toastIds: { [key: string]: Id | null } = {
  success: null,
  warn: null,
  error: null,
};

const showToast = (
  message: string,
  type: 'success' | 'warn' | 'error',
  options?: Partial<ToastOptions>
) => {
  if (toastIds[type]) {
    toast.update(toastIds[type]!, {
      render: message,
      ...toastConfig,
      ...options,
    });
  } else {
    toastIds[type] = toast[type](message, {
      ...toastConfig,
      ...options,
      onClose: () => {
        toastIds[type] = null;
      },
    });
  }
};

export const showSuccessToast = (
  message: string,
  options?: Partial<ToastOptions>
) => showToast(message, 'success', options);

export const showWarnToast = (
  message: string,
  options?: Partial<ToastOptions>
) => showToast(message, 'warn', options);

export const showErrorToast = (
  message: string,
  options?: Partial<ToastOptions>
) => showToast(message, 'error', options);
