import { setupSwagger } from '@/common/utils/swagger'
import { EnvironmentService } from '@/environment/environment.service'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const env = app.get(EnvironmentService)

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: env.get<string>('grpc.url'),
        loader: {
          keepCase: true,
        },
        package: ['user'],
        protoPath: [join(__dirname, '..', '/proto/user.service.v1.proto')],
      },
    },
    { inheritAppConfig: true },
  )

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  if (env.get('env') === 'development') {
    app.enableCors()
    setupSwagger(app)
  }

  await app.startAllMicroservices()
  Logger.log(`GRPC is running on: ${env.get<string>('grpc.url')}`)

  await app.listen(env.get('api_port'))
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
