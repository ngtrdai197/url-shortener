import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'viewport-extra';
import '../../design/styles/index.scss';
import App from '../routes';
import { store } from '../store';
import { HttpInterceptor } from '../utils/libs/http-interceptor';
import { ActionToast } from '../../design/components/action-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ActionToast />
    <BrowserRouter>
      <Provider store={store}>
        <HttpInterceptor />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
