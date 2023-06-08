import { createContext, useContext } from "react";
import { IUrl } from "../models/url.interface";
import { IAuthenticateResponse } from "../models/auth.interface";

interface AppContextState {
  urls: IUrl[];
  authenticate: IAuthenticateResponse | null;
}

const AppContext = createContext<AppContextState>({
  urls: [],
  authenticate: null,
});

if (!AppContext) {
  throw new Error("useAppContext has to be used within <AppContext.Provider>");
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
