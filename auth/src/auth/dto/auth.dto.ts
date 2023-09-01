import { IAuthPayload } from '@/auth/interface/payload.interface'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

export class AuthPayloadDto implements IAuthPayload {
  @Expose()
  id: string

  @Expose({ name: 'user_id' })
  userId: number

  @Expose({ name: 'expires_at' })
  expiresAt: Date
}

export class BaseAuthDto {
  @Expose()
  @MinLength(6)
  username: string

  @Expose()
  @MinLength(6)
  password: string
}

export class LoginRequestDto extends BaseAuthDto {}

export class AccessTokenDto {
  @ApiProperty({ name: 'access_token' })
  @Expose({ name: 'access_token' })
  @IsString()
  accessToken: string

  @ApiProperty({ name: 'access_token_expires_at' })
  @Expose({ name: 'access_token_expires_at' })
  @IsString()
  accessTokenExpiresAt: Date
}

export class LoginResponseDto extends AccessTokenDto {
  @ApiProperty({ name: 'session_id' })
  @Expose({ name: 'session_id' })
  @IsString()
  sessionId: string

  @ApiProperty({ name: 'refresh_token' })
  @Expose({ name: 'refresh_token' })
  @IsString()
  refreshToken: string

  @ApiProperty({ name: 'refresh_token_expires_at' })
  @Expose({ name: 'refresh_token_expires_at' })
  @IsString()
  refreshTokenExpiresAt: Date
}

export class RenewTokenRequestDto {
  @Expose({ name: 'refresh_token' })
  @ApiProperty({ name: 'refresh_token' })
  @IsString()
  refreshToken: string
}

export class RenewAccessTokenResponse extends AccessTokenDto {}
