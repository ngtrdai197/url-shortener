import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class GrpcGetUserRequestDto {
  @Expose({ name: 'user_id' })
  @IsNotEmpty()
  @IsNumber()
  userId: number
}
