import { setupSwagger } from '@/common/utils/swagger'
import { EnvironmentService } from '@/environment/environment.service'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const env = app.get(EnvironmentService)

  if (env.get('env') === 'development') {
    app.enableCors()
    setupSwagger(app)
  }

  await app.listen(env.get('api_port'))
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
