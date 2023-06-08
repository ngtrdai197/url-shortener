import { Dispatch, createContext, useContext } from "react";
import { AppContextState } from ".";
import { AuthActions, authReducer } from "./authReducer";
import { URLActions, urlReducer } from "./urlReducer";

export const initialState: AppContextState = {
  urls: [],
  authenticate: null,
};

const AppContext = createContext<{
  state: AppContextState;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const rootReducer = (
  { urls, authenticate }: AppContextState,
  actions: AuthActions | URLActions
) => ({
  auth: authReducer(authenticate, actions),
  url: urlReducer(urls, actions),
});

if (!AppContext) {
  throw new Error("useAppContext has to be used within <AppContext.Provider>");
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
