import { Expose, plainToInstance } from 'class-transformer';

export class Environment {
  @Expose()
  VITE_APP_TITLE = 'URL Shortener';

  @Expose()
  AUTH_PORT = '3333';

  @Expose()
  API_PORT = '8080';

  @Expose()
  VITE_BASE_ENDPOINT = 'http://localhost';

  public toInstance() {
    return plainToInstance(Environment, import.meta.env, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}

export const environment = new Environment().toInstance();
