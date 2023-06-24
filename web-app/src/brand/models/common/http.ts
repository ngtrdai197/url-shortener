export interface IHttpResponse<T> {
  resultCode: number;
  message: string;
  data: T;
}
