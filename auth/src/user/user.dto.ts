import { Expose } from 'class-transformer'

export class CreateUserDto {
  @Expose({ name: 'username' })
  username: string

  @Expose({ name: 'password' })
  password: string

  @Expose({ name: 'full_name' })
  fullName: string
}

export class UserResponseDto {
  @Expose({ name: 'username' })
  username: string

  @Expose({ name: 'full_name' })
  fullName: string

  @Expose({ name: 'createdAt' })
  createdAt: string

  @Expose({ name: 'id' })
  id: number
}
