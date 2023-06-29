import { createApi } from '@reduxjs/toolkit/query/react';
import { HTTP_METHOD } from '../enums/http-method.enum';
import { AuthenticateResponseDto, LoginRequestDto } from '../models/auth.dto';
import { axiosBaseQuery } from '../store/config/customBaseQuery';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<AuthenticateResponseDto, LoginRequestDto>({
      query: req => ({ url: '/auth/login', method: HTTP_METHOD.POST, data: req }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
