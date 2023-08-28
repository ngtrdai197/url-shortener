import { EnvironmentService } from '@/environment/environment.service'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  const env = app.get(EnvironmentService)
  await app.listen(env.get('api_port'))
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
