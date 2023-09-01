import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { Session, User } from '@/database/entities'
import { EnvironmentService } from '@/environment/environment.service'
import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      imports: [
        TypeOrmModule.forRootAsync({
          name: AUTH_SERVICE_CONNECTION,
          useFactory: async (envService: EnvironmentService) => {
            return {
              name: AUTH_SERVICE_CONNECTION,
              type: 'postgres',
              entities: [User, Session],
              replication: {
                master: envService.master,
                slaves: envService.slaves,
              },
              autoLoadEntities: false,
              synchronize: false,
              logging: !!envService.get<number>('db.is_logging'),
            }
          },
          inject: [EnvironmentService],
        }),
      ],
    }
  }
}
