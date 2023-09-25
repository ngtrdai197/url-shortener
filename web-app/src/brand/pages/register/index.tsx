import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorMessage } from '../../../design/components/error-message';
import { AuthForm } from '../../../design/templates/auth-form';
import { RegisterRequestDto } from '../../models/auth.dto';
import { useRegisterMutation } from '../../services/users.service';

const schema = yup.object().shape({
  username: yup.string().required('User name is required').min(6, 'Username must be at least 6 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  fullName: yup.string().required('Full name is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

interface FormValues extends RegisterRequestDto {
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const [register] = useRegisterMutation();
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  // const { VITE_BASE_ENDPOINT } = environment;

  const onSubmit = (data: FormValues) => {
    const req = new RegisterRequestDto();
    req.fullName = data.fullName;
    req.password = data.password;
    req.username = data.username;

    // TODO: Need to be refactored to be more clean!!!
    register(req)
      .unwrap()
      .then()
      .catch(() => {});
  };

  return (
    <AuthForm type="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error } }) => (
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">User name</label>
            <input
              {...field}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="fullName"
        render={({ field, fieldState: { error } }) => (
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Full name</label>
            <input
              {...field}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
            <label className="block text-sm font-semibold text-gray-800">Password</label>
            <input
              {...field}
              type="password"
              autoComplete="new-password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState: { error } }) => (
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Confirm password</label>
            <input
              {...field}
              type="password"
              autoComplete="new-password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
    </AuthForm>
  );
};

export default Registration;
