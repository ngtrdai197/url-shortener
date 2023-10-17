import { createApi } from '@reduxjs/toolkit/query/react';
import { plainToInstance } from 'class-transformer';
import { HTTP_METHOD } from '../enums/http-method.enum';
import { AuthenticateResponseDto, LoginRequestDto } from '../models/auth.dto';
import { axiosBaseQuery } from '../store/config/customBaseQuery';
import { saveToLocalStorage } from '../utils/utils';
import { HttpObject } from '../models/common/http';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<AuthenticateResponseDto, LoginRequestDto>({
      query: req => ({ url: '/login', method: HTTP_METHOD.POST, data: req, isAuth: true }),
      transformResponse: (res: HttpObject<AuthenticateResponseDto>) => {
        const { data, resultCode } = plainToInstance(HttpObject<AuthenticateResponseDto>, res);
        const responseInstance = plainToInstance(AuthenticateResponseDto, data);

        if (resultCode === 1) {
          const { accessToken, refreshToken } = responseInstance;

          saveToLocalStorage('access_token', accessToken);
          saveToLocalStorage('refresh_token', refreshToken);
        }

        return responseInstance;
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
