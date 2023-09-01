import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { User } from '@/database/entities/user.entity'
import { UserController } from '@/user/user.controller'
import { UserService } from '@/user/user.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User], AUTH_SERVICE_CONNECTION)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
