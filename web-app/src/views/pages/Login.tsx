import React, { useState } from 'react';

import { plainToInstance } from 'class-transformer';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { AUTH_ACTION } from '../../context/authReducer';
import { environment } from '../../env';
import { LoginRequestDto } from '../../models/auth.dto';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state: _, dispatch } = useAppContext();

  const { VITE_BASE_ENDPOINT } = environment;
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /**
     * Example endpoint
     * axios
        .get(`${VITE_BASE_ENDPOINT}/urls?page=1&limit=10`, {
          headers: {
            Authorization:
              'Bearer v2.local.E0BXfnfOeRdbTd7z1sDRW4xVzwpVGnV7zIL6VhaPBRmf2XHlgEwqEZQbxLJipjPMphSRC8-0RWaiQDOXoSxlNUagOm0cIZXDptD25jMwK3IZpMkklVexWxCrr2pqL7unbh6scWpz-PYSTgx38Q4Ecq6By_ZrDqbFU0LpUFVbUBtnlfCsGv23t13v7MOPZOXR-KifGd33rhSxy0AfCnXOrCIQy7LRxw_tY87KJr-Q_CdQeI30ceyT2jb3ADo.bnVsbA',
          },
        })
        .then(result => {
          console.log('result', result);
        })
        .catch(error => {
          console.error(error);
        });
     */
    dispatch({
      type: AUTH_ACTION.LOGIN,
      payload: plainToInstance(LoginRequestDto, { username, password }),
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">Sign in</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Username</label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mt-6">
            <button
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
              <Link to="/signup">Sign up</Link>
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
