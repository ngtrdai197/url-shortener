import {
  AuthPayloadDto,
  LoginRequestDto,
  LoginResponseDto,
  RenewAccessTokenResponse,
} from '@/auth/dto/auth.dto'
import { IAuthPayload } from '@/auth/interface/payload.interface'
import { AUTH_SERVICE_CONNECTION } from '@/database/constants'
import { Session, User } from '@/database/entities'
import { EnvironmentService } from '@/environment/environment.service'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { CreateUserDto, UserResponseDto } from '@/user/user.dto'
import { genSalt, hashSync } from 'bcryptjs'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import * as fs from 'fs'
import { join } from 'path'

@Injectable()
export class AuthService {
  private publicKey: string
  private privateKey: string

  constructor(
    private readonly envService: EnvironmentService,
    private readonly jwtService: JwtService,

    @InjectRepository(User, AUTH_SERVICE_CONNECTION)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session, AUTH_SERVICE_CONNECTION)
    private readonly sessionRepository: Repository<Session>,
  ) {
    this.publicKey = fs.readFileSync(join('jwt_key', 'jwt.key.pub')).toString()
    this.privateKey = fs.readFileSync(join('jwt_key', 'jwt.key')).toString()
  }

  public async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    })

    if (existingUser) {
      throw new BadRequestException('This username is already taken')
    }

    const salt = await genSalt(10)
    const hashedPassword = hashSync(dto.password, salt)

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        username: dto.username,
        fullName: dto.fullName,
        salt,
        hashedPassword,
      }),
    )

    const response = new UserResponseDto()
    response.createdAt = newUser.createdAt
    response.id = newUser.id
    response.fullName = newUser.fullName
    response.username = newUser.username
    return response
  }

  public async renewToken(refreshToken: string) {
    const refreshPayload = await this.verifyToken(refreshToken)

    const session = await this.sessionRepository.findOne({
      where: { id: refreshPayload.id, userId: refreshPayload.userId },
    })
    if (!session) {
      throw new UnauthorizedException('Invalid refresh token')
    }
    if (session.isBlocked) {
      throw new UnauthorizedException('User is blocked')
    }
    const accessTokenPayload = plainToInstance(AuthPayloadDto, {
      id: session.id,
      user_id: session.userId,
      expires_at: new Date(
        new Date().getTime() +
          this.envService.get<number>('token.access_token_duration') * 1000,
      ),
    })
    const accessToken = await this.createToken(
      accessTokenPayload,
      this.envService.get<number>('token.access_token_duration'),
    )
    return plainToInstance(RenewAccessTokenResponse, {
      access_token: accessToken,
      access_token_expires_at: accessTokenPayload.expiresAt,
    })
  }

  public async login(dto: LoginRequestDto) {
    const user = await this.userRepository.findOneBy({ username: dto.username })
    if (!user) {
      throw new BadRequestException('Invalid username or password')
    }
    const isValid = await user.validatePassword(dto.password)
    if (!isValid) {
      throw new BadRequestException('Invalid username or password')
    }

    const sessionId = uuidv4()

    const tokenPayload = {
      id: sessionId,
      user_id: user.id,
      expires_at: new Date(
        new Date().getTime() +
          this.envService.get<number>('token.refresh_token_duration') * 1000,
      ),
    }

    const refreshTokenPayload = plainToInstance(AuthPayloadDto, tokenPayload)
    const accessTokenPayload = plainToInstance(AuthPayloadDto, {
      ...tokenPayload,
      expires_at: new Date(
        new Date().getTime() +
          this.envService.get<number>('token.access_token_duration') * 1000,
      ),
    })

    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(
        accessTokenPayload,
        this.envService.get<number>('token.access_token_duration'),
      ),
      this.createToken(
        refreshTokenPayload,
        this.envService.get<number>('token.refresh_token_duration'),
      ),
    ])
    await this.sessionRepository.save(
      this.sessionRepository.create({
        id: sessionId,
        refreshToken: refreshToken,
        userId: user.id,
        expiresAt: refreshTokenPayload.expiresAt,
      }),
    )
    return plainToInstance(LoginResponseDto, {
      session_id: sessionId,
      access_token: accessToken,
      access_token_expires_at: accessTokenPayload.expiresAt,
      refresh_token: refreshToken,
      refresh_token_expires_at: refreshTokenPayload.expiresAt,
    })
  }

  public async logout(sessionId: string) {
    await this.sessionRepository.delete({ id: sessionId })
  }

  /**
   * Creates a token for a user with the specified ID and duration.
   *
   * @param {number} userId - The ID of the user.
   * @param {number} duration - The duration of the token in seconds.
   * @return {Promise<{payload: IAuthPayload, token: string}>} - The generated token and its payload.
   */
  private async createToken(payload: AuthPayloadDto, duration: number) {
    return await this.jwtService.signAsync(instanceToPlain(payload), {
      algorithm: 'RS256',
      expiresIn: `${duration}s`,
      privateKey: this.privateKey,
      issuer: 'url-shortener application',
    })
  }

  private async verifyToken(token: string) {
    return this.jwtService
      .verifyAsync<IAuthPayload>(token, {
        publicKey: this.publicKey,
      })
      .catch(() => {
        throw new UnauthorizedException()
      })
  }
}
