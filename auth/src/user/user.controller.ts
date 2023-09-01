import { IAuthPayload } from '@/auth/interface/payload.interface'
import { FromRequest } from '@/common/decorators/header.decorator'
import { BaseResponseDto } from '@/common/dto/base-response.dto'
import { ApiBaseResponse } from '@/common/utils/swagger'
import { UserResponseDto } from '@/user/user.dto'
import { UserService } from '@/user/user.service'
import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiBaseResponse(UserResponseDto)
  public async getProfile(@FromRequest('user') authPayload: IAuthPayload) {
    return new BaseResponseDto(
      await this.userService.getProfile(authPayload.userId),
      1,
      'Get profile success',
    )
  }
}
