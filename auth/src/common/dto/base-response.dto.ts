import {
  ClassTransformOptions,
  Expose,
  instanceToPlain,
} from 'class-transformer'

export class BaseResponseDto<T> {
  @Expose({ name: 'result_code' })
  resultCode: number

  @Expose({ name: 'message' })
  message: string

  @Expose()
  data: T

  constructor(data: T, resultCode: number, message: string) {
    this.resultCode = resultCode
    this.data = data
    this.message = message
  }

  public toPlain(
    options?: ClassTransformOptions,
  ): Record<string | number, unknown> {
    return instanceToPlain(this, options)
  }
}
