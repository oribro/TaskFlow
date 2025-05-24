import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import Signin from './Signin';

const Login: React.FC = () => {
  const { login, isAuthenticated, user, logout } = useAuth();

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Welcome to TaskFlow</h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={login}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </div>
        {isAuthenticated ? (
          <>
            <p className="mt-4 text-center">Welcome, {user.name}!</p>
            <button
              onClick={logout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="mt-4 text-center">Please log in</p>
        )}
      </div>
    </div>
    <Signin />
    </>
  );
};

export default Login; 