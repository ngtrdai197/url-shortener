import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from '../../design/components/loading-spinner';
import '../../design/styles/index.scss';
import { ThemeModeProvider } from '../contexts/theme-mode';

const Login = lazy(async () => await import('../pages/login/index'));
const Register = lazy(async () => await import('../pages/register/index'));

const App: React.FC = () => (
  <ThemeModeProvider>
    <Suspense fallback={<LoadingSpinner open />}>
      <Routes>
        {/* <AuthRoute isAuthenticated={true} path="/homee" redirectTo="/home" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </Suspense>
  </ThemeModeProvider>
);

export default App;
