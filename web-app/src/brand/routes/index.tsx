import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from '../../design/components/templates/index';
import '../../design/styles/index.scss';
import Login from '../pages/login-page/index';
import Registration from '../pages/register-page/index';

const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Registration />,
      },
    ],
  },
];

const App: React.FC = () => {
  const routes = useRoutes(appRoutes);

  return <>{routes}</>;
};

export default App;
