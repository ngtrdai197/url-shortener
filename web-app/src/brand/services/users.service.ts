import { createApi } from '@reduxjs/toolkit/query/react';
import { instanceToPlain } from 'class-transformer';
import { HTTP_METHOD } from '../enums/http-method.enum';
import { RegisterRequestDto } from '../models/auth.dto';
import { IHttpResponse } from '../models/common/http';
import { axiosBaseQuery } from '../store/config/customBaseQuery';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    register: builder.mutation<IHttpResponse<null>, RegisterRequestDto>({
      query: req => ({ url: '/users', method: HTTP_METHOD.POST, data: instanceToPlain(req) }),
    }),
  }),
});

export const { useRegisterMutation } = usersAPI;
