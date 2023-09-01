import {
  BadRequestException,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  CallHandler,
  NestInterceptor,
} from '@nestjs/common/interfaces/features/nest-interceptor.interface'
import { RpcException } from '@nestjs/microservices'
import { Observable, catchError, throwError } from 'rxjs'

import {
  BadRequestRpcException,
  ConflictRpcException,
  ForbiddenRpcException,
  InternalRpcException,
  NotFoundRpcException,
  RequestTimeoutRpcException,
  ServiceUnavailableRpcException,
  UnauthorizedRpcException,
} from '@/grpc/grpc.exception'

@Injectable()
export class GrpcInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        const rpcException =
          exception instanceof RpcException
            ? exception
            : this.convertHttpToRpcException(exception)

        return throwError(() => rpcException)
      }),
    )
  }

  private convertHttpToRpcException(exception: unknown) {
    if (exception instanceof BadRequestException) {
      return new BadRequestRpcException(exception.message)
    }
    if (exception instanceof NotFoundException) {
      return new NotFoundRpcException(exception.message)
    }
    if (exception instanceof ForbiddenException) {
      return new ForbiddenRpcException(exception.message)
    }
    if (exception instanceof ConflictException) {
      return new ConflictRpcException(exception.message)
    }
    if (exception instanceof RequestTimeoutException) {
      return new RequestTimeoutRpcException(exception.message)
    }
    if (exception instanceof UnauthorizedException) {
      return new UnauthorizedRpcException(exception.message)
    }
    if (exception instanceof ServiceUnavailableException) {
      return new ServiceUnavailableRpcException(exception.message)
    }
    return new InternalRpcException((exception as any)?.message)
  }
}
