import { status } from '@grpc/grpc-js'
import { RpcException } from '@nestjs/microservices'

export class NotFoundRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.NOT_FOUND })
  }
}

export class InternalRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.INTERNAL })
  }
}

export class BadRequestRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.INVALID_ARGUMENT })
  }
}

export class UnsupportedMediaTypeRpcException extends RpcException {
  constructor(message: string) {
    super({
      message,
      code: status.UNKNOWN,
    })
  }
}

export class ForbiddenRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.PERMISSION_DENIED })
  }
}

export class ConflictRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.ALREADY_EXISTS })
  }
}

export class RequestTimeoutRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.DEADLINE_EXCEEDED })
  }
}

export class UnauthorizedRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.UNAUTHENTICATED })
  }
}

export class NotImplementedRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.UNIMPLEMENTED })
  }
}

export class PayloadTooLargeRpcException extends RpcException {
  constructor(message: string) {
    super({ message, code: status.OUT_OF_RANGE })
  }
}

export class ValidationRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({ message, code: status.FAILED_PRECONDITION })
  }
}

export class ServiceUnavailableRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({ message, code: status.UNAVAILABLE })
  }
}
