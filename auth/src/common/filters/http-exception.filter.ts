import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Something went wrong'

    if (exception instanceof HttpException) {
      const response = exception.getResponse()
      status = exception.getStatus()
      message =
        typeof response === 'string'
          ? response
          : (response as Record<string, string | string[]>).message
    }

    httpAdapter.reply(
      ctx.getResponse(),
      {
        status_code: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      },
      status,
    )
  }
}
