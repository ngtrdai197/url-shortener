import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'viewport-extra';
import '../../design/styles/index.scss';
import AppRoutes from '../routes';
import { store } from '../store';
import { HttpInterceptor } from '../utils/libs/http-interceptor';
import { ActionToast } from '../../design/components/action-toast';
import { ThemeModeProvider } from '../contexts/theme-mode';
import { LoadingSpinner } from '../../design/components/loading-spinner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ActionToast />
    <BrowserRouter>
      <Provider store={store}>
        <HttpInterceptor />
        <ThemeModeProvider>
          <Suspense fallback={<LoadingSpinner open />}>
            <AppRoutes />
          </Suspense>
        </ThemeModeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
