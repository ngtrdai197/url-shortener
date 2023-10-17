import { Expose } from 'class-transformer';

export interface IHttpResponse<T> {
  resultCode: number;
  message: string;
  data: T | null;
}

export class HttpObject<T> implements IHttpResponse<T> {
  @Expose({ name: 'result_code' })
  resultCode!: number;

  message!: string;

  data!: T | null;
}
