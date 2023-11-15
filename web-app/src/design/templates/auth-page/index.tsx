import React from 'react';
import { useAppSelector } from '../../../brand/store/hook';
import { LoadingSpinner } from '../../components/loading-spinner';

interface AuthPageProps {
  children: React.ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
  const { isLoading } = useAppSelector(state => state.loadingSpinner);

  return (
    <main>
      {children}
      <LoadingSpinner open={isLoading} />
    </main>
  );
};

export default AuthPage;
