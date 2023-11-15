import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { ThemeSwitcher } from '../../components/theme-switcher';

import PATHES from '../../../brand/constants/pathes';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, children, onSubmit }) => (
  <div className="t-auth-form relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="t-auth-form__container w-full p-6 m-auto bg-white dark:bg-slate-800 rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>
      <h1 className="text-3xl font-semibold text-center text-purple-700">
        {type === 'sign-in' ? 'Welcome back' : 'Registration'}
      </h1>
      <form className="mt-6" onSubmit={onSubmit}>
        {children}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            {type === 'sign-in' ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </form>
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        <span className="font-medium dark:text-white">
          {type === 'sign-in' ? 'Do not have an account? ' : 'Already have an account? '}
          <span className=" text-purple-600 hover:underline dark:text-sky-500">
            <Link to={type === 'sign-in' ? PATHES.REGISTRATION_PAGE : PATHES.LOGIN_PAGE}>
              {type === 'sign-in' ? 'Register' : 'Login'}{' '}
            </Link>
          </span>
        </span>
      </p>
    </div>
  </div>
);
