import { useReducer } from "react";
import "./App.scss";
import AppContext, { initialState, rootReducer } from "./context/appContext";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const appRoutes = useRoutes(routes);
  // TODO: should fix any
  const [state, dispatch] = useReducer(rootReducer as any, initialState);
  return (
    <AppContext.Provider value={{ state: state as any, dispatch }}>
      {appRoutes}
    </AppContext.Provider>
  );
}

export default App;
