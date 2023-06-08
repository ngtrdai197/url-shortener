import { AuthenticateResponseDto } from "../models/auth.dto";
import { URLDto } from "../models/url.dto";
import { AuthActions } from "./authReducer";
import { URLActions } from "./urlReducer";

export type ActionMap<M extends { [key: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface AppContextState {
  urls: URLDto[];
  authenticate: AuthenticateResponseDto | null;
}

export type RootActions = URLActions | AuthActions;
