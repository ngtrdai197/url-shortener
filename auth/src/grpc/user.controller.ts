import { Public } from '@/common/decorators/is-public.decorator'
import { BaseResponseDto } from '@/common/dto/base-response.dto'
import { GrpcValidationPipe } from '@/grpc/grpc-validation.pipe'
import { GrpcInterceptor } from '@/grpc/grpc.interceptor'
import { GrpcGetUserRequestDto } from '@/grpc/user.dto'
import { UserService } from '@/user/user.service'
import { Controller, UseInterceptors, UsePipes } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { plainToInstance } from 'class-transformer'

@Controller()
@UseInterceptors(GrpcInterceptor)
@UsePipes(GrpcValidationPipe)
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  @Public()
  async getUser(request: GrpcGetUserRequestDto) {
    // FIXME: with keepCase: true, request still snake case. We need to use plainToInstance to convert it to camel case
    const dto = plainToInstance(GrpcGetUserRequestDto, request)

    return new BaseResponseDto(
      await this.userService.getProfile(dto.userId),
      1,
      'Get profile success',
    ).toPlain()
  }
}
