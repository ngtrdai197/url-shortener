import { IUser } from "./user.interface";

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignupRequest extends ILoginRequest {
  full_name: string;
}

export interface IAuthenticateResponse {
  session_id: string;
  access_token: string;
  access_token_expires_at: Date;
  refresh_token: string;
  refresh_token_expires_at: Date;
  user: IUser;
}
