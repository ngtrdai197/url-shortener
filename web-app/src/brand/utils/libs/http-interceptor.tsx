import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';

import { environment } from '../../env/env';
import { useAppDispatch } from '../../store/hook';
import { launchSpinner, stopSpinner } from '../../store/slices/loadingSpinner';
import { loadFromCookies, loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../utils';

axios.defaults.timeout = 120000; // 120s

axios.defaults.baseURL = `${environment.VITE_BASE_ENDPOINT}:${environment.API_PORT}`;

// Handle token refresh & queue pending requests
type failedQueueTypes = {
  reject: (error: Error) => void;
  resolve: (value?: unknown) => void;
};

export type AxiosConfigWithInterceptedSetting = AxiosRequestConfig & {
  _retry?: boolean;
  url?: string;
};

// token update process handling
// See https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f
let isTokenRefreshing = false;
let failedQueue: failedQueueTypes[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

export const HttpInterceptor: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  axios.interceptors.request.use(
    config => {
      dispatch(launchSpinner());

      const accessToken = loadFromLocalStorage('access_token');

      if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    async error => await Promise.reject(error)
  );

  axios.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: AxiosResponse<any>) => {
      dispatch(stopSpinner());

      return response;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as AxiosConfigWithInterceptedSetting;
      let status = error.response ? error.response.status : error.code;
      status = status === 'ECONNABORTED' ? 'timeout' : status;
      const errStatus: string = (status ?? '').toString();

      if (errStatus === '401') {
        const accessToken = loadFromLocalStorage('access_token');

        // TODO: Should return login page
        if (!accessToken) {
          return;
        }

        if (originalRequest._retry) {
          return await Promise.reject(error);
        }

        if (isTokenRefreshing) {
          return await new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          })
            .then(async () => {
              return await axios(originalRequest);
            })
            .catch(async () => {
              return await Promise.reject(error);
            });
        }

        originalRequest._retry = true;
        isTokenRefreshing = true;

        return await new Promise((resolve, reject) => {
          const refreshToken = loadFromCookies('refresh_token');

          // Note: Handle refresh token
          axios
            .post(`${environment.VITE_BASE_ENDPOINT}:${environment.AUTH_PORT}/api/auth/renew-token`, {
              refresh_token: refreshToken,
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then(({ data }: any) => {
              if (data.status === 200) {
                saveToLocalStorage('access_token', data.token);
                setTimeout(() => {
                  processQueue(null);
                  resolve(axios(originalRequest));
                }, 100);
              } else removeFromLocalStorage('access_token');
            })
            .catch(err => {
              processQueue(err);
              reject(err);
            })
            .finally(() => {
              isTokenRefreshing = false;
              dispatch(stopSpinner());
            });
        });
      } else if (errStatus === '500') {
        // navigate(PATH.ERROR_500_PAGE);
      }
      dispatch(stopSpinner());

      return await Promise.reject(error);
    }
  );

  return null;
};
