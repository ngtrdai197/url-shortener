import type { RouteObject } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Login from '../views/pages/Login';
import Registration from '../views/pages/Register';

const routes: RouteObject[] = [
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
export default routes;
