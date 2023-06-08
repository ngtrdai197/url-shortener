import { AuthenticateResponseDto, LoginRequestDto } from "../models/auth.dto";
import { ActionMap, RootActions } from ".";

export enum AUTH_ACTION {
  LOGIN = "AUTH_LOGIN",
}

type AuthPayload = {
  [AUTH_ACTION.LOGIN]: LoginRequestDto;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (
  state: AuthenticateResponseDto | null,
  action: RootActions
) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN:
      // TODO: should we need call api right here ?
      return state;
    default:
      return state;
  }
};
