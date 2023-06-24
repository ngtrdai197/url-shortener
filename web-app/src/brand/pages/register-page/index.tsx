import React from 'react';
import { Link } from 'react-router-dom';

const Registration: React.FC = () => (
  <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">Sign up</h1>
      <form className="mt-6">
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">Username</label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">Full name</label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">Password</label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">Confirm Password</label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-8 text-xs font-light text-center text-gray-700">
        <span className="font-medium ">
          Already have an account ?{' '}
          <span className="text-purple-600 hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </span>
      </p>
    </div>
  </div>
);

export default Registration;
