import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../brand/store/hook';
import { LoadingSpinner } from '../components/loading-spinner';

function Layout() {
  const { isLoading } = useAppSelector(state => state.loadingSpinner);

  return (
    <main>
      <LoadingSpinner open={isLoading} />
      <Outlet />
    </main>
  );
}

export default Layout;
