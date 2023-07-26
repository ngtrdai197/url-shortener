import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorMessage } from '../../../design/components/error-message';
import { AuthForm } from '../../../design/templates/auth-form';
import { LoginRequestDto } from '../../models/auth.dto';
import { useLoginMutation } from '../../services/auth.service';

const schema = yup.object().shape({
  username: yup.string().required('User name is required').min(6, 'Username must be at least 6 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const { control, handleSubmit } = useForm<LoginRequestDto>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  // const { VITE_BASE_ENDPOINT } = environment;

  const onSubmit = (data: LoginRequestDto) => {
    login(data)
      .unwrap()
      .then()
      .catch(() => {});
  };

  return (
    <AuthForm type="sign-in" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error } }) => (
          <div className="mb-2">
            <label htmlFor={field.name} className="block text-sm font-semibold dark:text-white">
              User name
            </label>
            <input
              {...field}
              id={field.name}
              type="text"
              autoComplete="off"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white dark:text-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <div className="mb-2">
            <label htmlFor={field.name} className="block text-sm font-semibold dark:text-white">
              Password
            </label>
            <input
              {...field}
              id={field.name}
              type="password"
              autoComplete="new-password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 dark:text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
    </AuthForm>
  );
};

export default Login;
