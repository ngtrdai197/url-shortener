import { lazy } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import '../../design/styles/index.scss';
import PATHES from '../constants/pathes';
import { loadFromLocalStorage } from '../utils/utils';

const Login = lazy(async () => await import('../pages/login/index'));
const Register = lazy(async () => await import('../pages/register/index'));
const Home = lazy(async () => await import('../pages/home/index'));

const App: React.FC = () => {
  const isLoggedIn = loadFromLocalStorage('access_token');

  return (
    <Routes>
      {/* <AuthRoute isAuthenticated={true} path="/homee" redirectTo="/home" element={<Register />} /> */}
      <Route path={PATHES.ROOT_PAGE} element={<Navigate to={PATHES.HOME_PAGE} replace />} />
      <Route path={PATHES.HOME_PAGE} element={<Home />} />
      <Route path={PATHES.LOGIN_PAGE} element={isLoggedIn ? <Navigate to={PATHES.HOME_PAGE} replace /> : <Login />} />
      <Route path={PATHES.REGISTRATION_PAGE} element={<Register />} />
    </Routes>
  );
};

export default App;
