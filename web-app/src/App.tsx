import React, { useReducer } from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import AppContext, { initialState, rootReducer } from './context/appContext';
import routes from './routes';

const App: React.FC = () => {
  const appRoutes = useRoutes(routes);
  const [state, dispatch] = useReducer(rootReducer as any, initialState);

  return <AppContext.Provider value={{ state: state as any, dispatch }}>{appRoutes}</AppContext.Provider>;
};

export default App;
