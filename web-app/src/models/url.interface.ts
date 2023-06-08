export interface IUrl {
  id: string;
  user_id: number;
  short_url: string;
  long_url: string;
  created_at: Date;
}

export interface ICreateUrlRequest {
  long_url: string;
}
