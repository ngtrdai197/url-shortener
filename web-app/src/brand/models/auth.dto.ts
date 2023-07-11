import { Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { type UserDto } from './user.dto';

export class LoginRequestDto {
  @Expose()
  username!: string;

  @Expose()
  password!: string;
}

export class RegisterRequestDto extends LoginRequestDto {
  @Expose({ name: 'full_name' })
  fullName!: string;
}

export class AuthenticateResponseDto {
  @Expose({ name: 'session_id' })
  sessionId!: string;

  @Expose({ name: 'access_token' })
  accessToken!: string;

  @Expose({ name: 'access_token_expires_at' })
  accessTokenExpiresAt!: Date;

  @Expose({ name: 'refresh_token' })
  refreshToken!: string;

  @Expose({ name: 'refresh_token_expires_at' })
  refreshTokenExpiresAt!: Date;

  @Expose({ name: 'full_name' })
  @ValidateNested({ each: true })
  user!: UserDto;
}
