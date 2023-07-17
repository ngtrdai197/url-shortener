import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../brand/store/hook';
import { LoadingSpinner } from '../../components/loading-spinner';

const AuthPage: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.loadingSpinner);

  return (
    <main>
      <Outlet />
      <LoadingSpinner open={isLoading} />
    </main>
  );
}

export default AuthPage;
