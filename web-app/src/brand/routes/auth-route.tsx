import { Navigate, Route } from 'react-router-dom';

interface AuthRouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
  element: React.ReactNode;
  path: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ isAuthenticated, redirectTo, element, ...routeProps }) => {
  if (isAuthenticated) return <Route {...routeProps} element={element} />;
  else return <Navigate to={redirectTo} replace />;
};

export default AuthRoute;
