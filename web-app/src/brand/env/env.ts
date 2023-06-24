import { Expose, plainToInstance } from 'class-transformer';

export class Environment {
  @Expose()
  VITE_APP_TITLE = 'URL Shortener';

  @Expose()
  VITE_BASE_ENDPOINT = 'http://localhost:8088';

  public toInstance() {
    return plainToInstance(Environment, import.meta.env, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}

export const environment = new Environment().toInstance();
