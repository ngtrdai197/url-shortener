import { Outlet } from 'react-router-dom';
import Main from '../views/components/Main';

function Layout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

export default Layout;
