import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { InjectDataSource } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,

    @InjectDataSource(AUTH_SERVICE_CONNECTION)
    private connection: Connection,
  ) {}

  @Get()
  @HealthCheck()
  public async check() {
    return this.health.check([
      () =>
        this.database.pingCheck('database', {
          connection: this.connection,
        }),
    ])
  }
}
