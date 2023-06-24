import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../../design/styles/index.scss';
import App from '../routes';
import { store } from '../store';
import { HttpInterceptor } from '../utils/libs/http-interceptor';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HttpInterceptor>
          <App />
        </HttpInterceptor>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
