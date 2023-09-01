import { AuthModule } from '@/auth/auth.module'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { AuthGuard } from '@/common/guards/auth.guard'
import { GrpcModule } from '@/grpc/grpc.module'
import { HealthModule } from '@/health/health.module'
import { UserModule } from '@/user/user.module'
import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { DatabaseModule } from './database/database.module'
import { EnvironmentModule } from './environment/environment.module'

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    DatabaseModule.forRoot(),
    HealthModule,
    JwtModule,
    UserModule,
    AuthModule,
    GrpcModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
