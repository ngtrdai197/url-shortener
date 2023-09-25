import { HEADER_AUTH_UID } from '@/common/constants'
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class AccessLogInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(AccessLogInterceptor.name)
    private readonly logger: PinoLogger,
  ) {}

  /**
   * @param context
   * @param next
   *
   * Sample AccessLog:
   * ip: ::ffff:172.21.0.1
   * responseCode: 200
   * responseTime: 16ms
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass().name
    const method = context.getHandler().name
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest()
    const now = Date.now()

    if (request.hasOwnProperty('httpVersion')) {
      let header = {}
      if (HEADER_AUTH_UID in request.headers) {
        header = {
          [HEADER_AUTH_UID]: request.headers[HEADER_AUTH_UID],
        }
      }
      this.logger.debug({
        ...header,
        controller: controller,
        method: method,
        msg: 'request info',
      })
    } else {
      this.logger.debug({
        body: context.switchToRpc().getData(),
        class: controller,
        method: method,
        msg: 'request info',
      })
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logger.debug({
            msg: 'response info',
            responseTime: `${Date.now() - now}ms`,
            data: data,
          })
        },
        error: (err) => {
          const bodyError = {
            msg: 'response info',
            controller: controller,
            method: method,
            errors: err.response,
            msgErr: err.message,
            responseTime: `${Date.now() - now}ms`,
          }
          this.shouldLogError(err)
            ? this.logger.error(bodyError)
            : this.logger.warn(bodyError)
        },
      }),
    )
  }

  private shouldLogError(error: Record<string, any>): boolean {
    if (
      Number(error.status) &&
      error.status >= HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      return true
    }
    return false
  }
}
