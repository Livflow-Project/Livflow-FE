import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContextProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/status/errorPage';
import Router from './router';
import { StoreProvider } from './contexts/StoreContext';
import { ToastContainer } from 'react-toastify';
import { showErrorToast } from './utils/toast';

const App = () => {
  return (
    <>
      <ToastContainer />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorPage error={error} resetError={resetErrorBoundary} />
        )}
        onError={(error) => {
          <ErrorPage error={error} resetError={() => {}} />;

          console.error('에러바운더리가 잡은 에러:', error);
          showErrorToast('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }}
      >
        <AuthProvider>
          <StoreProvider>
            <Router />
          </StoreProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
