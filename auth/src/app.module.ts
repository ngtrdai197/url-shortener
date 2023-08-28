import { HealthModule } from '@/health/health.module'
import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { EnvironmentModule } from './environment/environment.module'

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    DatabaseModule.forRoot(),
    HealthModule,
  ],
})
export class AppModule {}
