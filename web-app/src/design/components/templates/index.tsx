import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../brand/store/hook';
import { LoadingSpinner } from '../loading-spinner';
import Main from '../organisms/';

function Layout() {
  const { isLoading } = useAppSelector(state => state.loadingSpinner);

  return (
    <Main>
      <LoadingSpinner open={isLoading} />
      <Outlet />
    </Main>
  );
}

export default Layout;
