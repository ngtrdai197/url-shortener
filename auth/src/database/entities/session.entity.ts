import { BOOLEAN_NUMBER } from '@/common/constants'
import { Expose } from 'class-transformer'
import { IsEnum } from 'class-validator'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'session' })
export class Session {
  @PrimaryColumn()
  id: string

  @Expose({ name: 'user_id' })
  @Column({ name: 'user_id' })
  userId: number

  @Expose({ name: 'refresh_token' })
  @Column({ name: 'refresh_token' })
  refreshToken: string

  @Expose({ name: 'is_blocked' })
  @Column({ name: 'is_blocked', default: BOOLEAN_NUMBER.NO, type: 'smallint' })
  @IsEnum(BOOLEAN_NUMBER)
  isBlocked: BOOLEAN_NUMBER

  @Expose({ name: 'expires_at' })
  @Column({ name: 'expires_at', default: new Date() })
  expiresAt: Date

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date
}
