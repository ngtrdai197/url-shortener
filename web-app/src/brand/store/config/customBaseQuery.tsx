import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { environment } from '../../env/env';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      isExternalAPI?: boolean;
      isAuth?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, isExternalAPI, isAuth }) => {
    try {
      const result = await axios({
        url: isExternalAPI
          ? url
          : `${environment.VITE_BASE_ENDPOINT}:${isAuth ? `${environment.AUTH_PORT}/api/auth` : environment.API_PORT}` +
            url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
