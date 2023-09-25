import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { User } from '@/database/entities/user.entity'
import { UserResponseDto } from '@/user/user.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, AUTH_SERVICE_CONNECTION)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getProfile(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })

    if (!user) {
      throw new BadRequestException()
    }

    const response = new UserResponseDto()
    response.id = user.id
    response.username = user.username
    response.fullName = user.fullName
    response.createdAt = user.createdAt
    return response
  }
}
