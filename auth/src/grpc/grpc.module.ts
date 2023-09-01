import { UserGrpcController } from '@/grpc/user.controller'
import { UserModule } from '@/user/user.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserModule],
  controllers: [UserGrpcController],
})
export class GrpcModule {}
