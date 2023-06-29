import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthenticateResponseDto, LoginRequestDto } from '../models/auth.dto';
import { axiosBaseQuery } from '../store/config/customBaseQuery';

export const authenAPI = createApi({
  reducerPath: 'authenAPI',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<AuthenticateResponseDto, LoginRequestDto>({
      query: req => ({ url: '/auth/login', method: 'POST', data: req }),
    }),
  }),
});

export const { useLoginMutation } = authenAPI;
