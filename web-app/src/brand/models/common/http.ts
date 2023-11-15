import { Expose } from 'class-transformer';

export class IHttpDataErrorResponse {
  message!: string;

  path!: string;

  @Expose({ name: 'status_code' })
  statusCode!: number;

  timestamp!: string;
}

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
