import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { LoginRequestDto } from '../../models/auth.dto';
import { useLoginMutation } from '../../services/auth.service';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(6, 'Username must be at least 6 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginRequestDto>({
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
    const res = login(data)
      .unwrap()
      .then(response => {
        console.log(response);
      })
      .catch(rejected => {
        console.error(rejected);
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">Sign in</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Username</label>
            <Controller
              control={control}
              name="username"
              render={({ field: { value, name, onChange, onBlur, ref }, fieldState: { error } }) => (
                <>
                  <input
                    ref={ref}
                    name={name}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                  {error && <p>{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Password</label>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, name, onChange, onBlur, ref }, fieldState: { error } }) => (
                <>
                  <input
                    ref={ref}
                    name={name}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                  {error && <p>{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="mt-6">
            <button
              disabled={!isValid}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          <span className="font-medium">
            Do not have an account ?{' '}
            <span className=" text-purple-600 hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
