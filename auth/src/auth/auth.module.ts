import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { Session, User } from '@/database/entities'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session], AUTH_SERVICE_CONNECTION),
    JwtModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
