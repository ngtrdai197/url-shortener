import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { environment } from '../../env/env';
import { NotifyToast, Toaster } from '../../../design/components/action-toast';
import { IHttpDataErrorResponse } from '../../models/common/http';
import { plainToInstance } from 'class-transformer';

interface AxiosBaseQueryProps {
  isExternalAPI?: boolean;
  isAuth?: boolean;
  options: AxiosRequestConfig;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryProps, unknown, unknown> =>
  async ({ options, isExternalAPI, isAuth }) => {
    try {
      const result = await axios({
        url: isExternalAPI
          ? options.url
          : `${environment.VITE_BASE_ENDPOINT}:${isAuth ? `${environment.AUTH_PORT}/api/auth` : environment.API_PORT}` +
            options.url,
        ...options,
      });

      if (result?.data?.message) {
        NotifyToast(<Toaster>{result.data.message}</Toaster>, 'success');
      }

      return { data: result.data };
    } catch (axiosError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = axiosError as AxiosError<IHttpDataErrorResponse, any>;

      if (!err.response)
        return {
          error: {
            status: err.status,
            data: err.message,
          },
        };

      const data = err.response.data;
      const dataInstance = plainToInstance(IHttpDataErrorResponse, data);

      NotifyToast(<Toaster>{dataInstance.message}</Toaster>, 'error');

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };
