export interface IHttpResponse<T> {
  resultCode: number;
  message: string;
  data: T | null;
}

export abstract class HttpObject<T> implements IHttpResponse<T> {
  resultCode!: number;
  message!: string;
  data!: T | null;
}
