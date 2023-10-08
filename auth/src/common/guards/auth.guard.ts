import { AuthPayloadDto } from '@/auth/dto/auth.dto'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { plainToInstance } from 'class-transformer'
import { Request } from 'express'
import * as fs from 'fs'
import { join } from 'path'
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  private publicKey: string
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    this.publicKey = fs.readFileSync(join('jwt_key', 'jwt.key.pub')).toString()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: this.publicKey,
      })
      request['user'] = plainToInstance(AuthPayloadDto, payload)
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
