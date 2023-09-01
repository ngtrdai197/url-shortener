import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { MinLength } from 'class-validator'

export class CreateUserDto {
  @Expose({ name: 'username' })
  @ApiProperty({ name: 'username' })
  @MinLength(6)
  username: string

  @Expose({ name: 'password' })
  @ApiProperty({ name: 'password' })
  @MinLength(6)
  password: string

  @Expose({ name: 'full_name' })
  @ApiProperty({ name: 'full_name' })
  @MinLength(8)
  fullName: string
}

export class UserResponseDto {
  @Expose({ name: 'id' })
  @ApiProperty({ name: 'id' })
  id: number

  @Expose({ name: 'username' })
  @ApiProperty({ name: 'username' })
  username: string

  @Expose({ name: 'full_name' })
  @ApiProperty({ name: 'full_name' })
  fullName: string

  @Expose({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: Date
}
