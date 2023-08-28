import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Get environment variable
   * @param key
   * @returns T if key is defined, otherwise throw an error
   */
  public get<T>(key: string): T {
    const result = this.configService.get<T>(key)
    if (result === undefined || result === null) {
      throw new Error(`Environment variable ${key} is not defined`)
    }
    return result
  }

  public get master(): PostgresConnectionCredentialsOptions {
    return {
      host: this.configService.get<string>('db.master.host'),
      port: this.configService.get<number>('db.master.port'),
      username: this.configService.get<string>('db.master.username'),
      password: this.configService.get<string>('db.master.password'),
      database: this.configService.get<string>('db.master.database'),
    }
  }

  public get slaves(): Array<PostgresConnectionCredentialsOptions> {
    return [
      {
        host: this.configService.get<string>('db.slave.host'),
        port: this.configService.get<number>('db.slave.port'),
        username: this.configService.get<string>('db.slave.username'),
        password: this.configService.get<string>('db.slave.password'),
        database: this.configService.get<string>('db.slave.database'),
      },
    ]
  }
}
