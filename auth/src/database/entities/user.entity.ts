import { hash } from 'bcryptjs'
import { IsNotEmpty, IsString } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'username', unique: true })
  @IsString()
  @IsNotEmpty()
  username: string

  @Column({ name: 'full_name' })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @Column({ name: 'hashed_password' })
  @IsString()
  @IsNotEmpty()
  hashedPassword: string

  @Column({ name: 'salt' })
  @IsString()
  @IsNotEmpty()
  salt: string

  public async validatePassword(password: string) {
    if (!this.salt || !this.hashedPassword) {
      throw new Error('Cannot validate password without salt or hashedPassword')
    }
    const hashed = await hash(password, this.salt)
    return this.hashedPassword === hashed
  }

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date
}
