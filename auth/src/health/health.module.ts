import { HealthController } from '@/health/health.controller'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
