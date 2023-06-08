import { createContext, useContext } from "react";

interface AppContextState {
  urls: [];
}

const AppContext = createContext<AppContextState>({
  urls: [],
});

if (!AppContext) {
  throw new Error("useAppContext has to be used within <AppContext.Provider>");
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
