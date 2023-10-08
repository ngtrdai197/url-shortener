import { AuthService } from '@/auth/auth.service'
import {
  LoginRequestDto,
  LoginResponseDto,
  RenewAccessTokenResponse,
  RenewTokenRequestDto,
} from '@/auth/dto/auth.dto'
import { IAuthPayload } from '@/auth/interface/payload.interface'
import { FromRequest } from '@/common/decorators/header.decorator'
import { Public } from '@/common/decorators/is-public.decorator'
import { BaseResponseDto } from '@/common/dto/base-response.dto'
import { ApiBaseResponse } from '@/common/utils/swagger'
import { CreateUserDto, UserResponseDto } from '@/user/user.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBaseResponse(UserResponseDto)
  @Public()
  public async createUser(@Body() dto: CreateUserDto) {
    return new BaseResponseDto(
      await this.authService.createUser(dto),
      1,
      'Register success',
    )
  }

  @Post('login')
  @ApiBaseResponse(LoginResponseDto)
  @Public()
  public async login(@Body() dto: LoginRequestDto) {
    return new BaseResponseDto(
      await this.authService.login(dto),
      1,
      'Login success',
    )
  }

  @Post('logout')
  @ApiBaseResponse(Object)
  @ApiBearerAuth()
  public async logout(@FromRequest('user') authPayload: IAuthPayload) {
    await this.authService.logout(authPayload.id)
    return new BaseResponseDto({}, 1, 'Logout success')
  }

  @Post('renew-token')
  @ApiBaseResponse(RenewAccessTokenResponse)
  @Public()
  public async refresh(@Body() dto: RenewTokenRequestDto) {
    return new BaseResponseDto(
      await this.authService.renewToken(dto.refreshToken),
      1,
      'Refresh success',
    )
  }
}
