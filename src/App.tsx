import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContextProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/status/errorPage';
import Router from './router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPage error={error} resetError={resetErrorBoundary} />
      )}
      onError={(error) => {
        error;
      }}
    >
      <AuthProvider>
        <ToastContainer />
        <Router />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
