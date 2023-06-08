import "./App.scss";
import AppContext from "./context/appContext";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  return (
    <AppContext.Provider value={{ urls: [] }}>{element}</AppContext.Provider>
  );
}

export default App;
