import { DynamicModule, Module } from '@nestjs/common'
import { LoggerModule, Params, PinoLogger } from 'nestjs-pino'

import { APP_ENV } from '@/common/constants'
import { EnvironmentService } from '@/environment/environment.service'
import pino, { Level } from 'pino'
import { Options } from 'pino-http'

export function loggerOptions(
  environment: APP_ENV,
  level: Level = 'debug',
  context: string,
): Options {
  const isLocal = environment === APP_ENV.DEV
  if (!['fatal', 'error', 'warn', 'info', 'debug', 'trace'].includes(level)) {
    level = 'debug'
  }

  return {
    logger: pino({
      formatters: {
        level: (label) => {
          return { level: label }
        },
        log(object) {
          if (Object.keys(object).length) {
            return {
              app: context,
              data: object,
            }
          }
          return {}
        },
      },
      base: undefined,
      timestamp: isLocal
        ? () => `,"time": "${new Date(Date.now()).toISOString()}"`
        : undefined,
      transport: isLocal
        ? {
            target: 'pino-pretty',
            options: {
              colorize: isLocal,
              ignore: 'pid,hostname',
              singleLine: true,
            },
          }
        : undefined,
      level: level,
    }),
    autoLogging: false,
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
      }),
    },
  }
}

@Module({})
export class PinoLoggerModule {
  static forRootAsync(context: string): DynamicModule {
    return {
      module: PinoLoggerModule,
      global: true,
      imports: [
        LoggerModule.forRootAsync({
          useFactory: (envService: EnvironmentService) => {
            const params: Params = {
              pinoHttp: loggerOptions(
                envService.get<APP_ENV>('env'),
                envService.get<Level>('logger.level'),
                context,
              ),
            }
            return params
          },
          inject: [EnvironmentService],
        }),
      ],
      providers: [PinoLogger],
      exports: [PinoLogger],
    }
  }
}
