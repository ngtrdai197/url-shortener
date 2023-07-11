import { createApi } from '@reduxjs/toolkit/query/react';
import { plainToInstance } from 'class-transformer';
import { HTTP_METHOD } from '../enums/http-method.enum';
import { AuthenticateResponseDto, LoginRequestDto } from '../models/auth.dto';
import { axiosBaseQuery } from '../store/config/customBaseQuery';
import { saveToLocalStorage } from '../utils/utils';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<AuthenticateResponseDto, LoginRequestDto>({
      query: req => ({ url: '/auth/login', method: HTTP_METHOD.POST, data: req }),
      transformResponse: (res: AuthenticateResponseDto) => {
        const responseInstance = plainToInstance(AuthenticateResponseDto, res);
        const { accessToken, refreshToken } = responseInstance;

        saveToLocalStorage('access_token', accessToken);
        saveToLocalStorage('refresh_token', refreshToken);

        return responseInstance;
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
