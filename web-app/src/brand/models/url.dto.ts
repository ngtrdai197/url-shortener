import { Expose } from 'class-transformer';

export class URLDto {
  @Expose()
  id!: number;

  @Expose({ name: 'user_id' })
  userId!: number;

  @Expose({ name: 'short_url' })
  shortURL!: string;

  @Expose({ name: 'long_url' })
  longURL!: string;

  @Expose({ name: 'created_at' })
  createdAt!: Date;
}

export class CreateUrlRequestDto {
  @Expose({ name: 'long_url' })
  longURL!: string;
}
