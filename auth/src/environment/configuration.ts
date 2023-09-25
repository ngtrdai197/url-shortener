export default () => ({
  api_port: process.env.PUBLIC_API_PORT,
  env: process.env.APP_ENV,
  logger: {
    level: process.env.LOG_LEVEL,
  },
  db: {
    is_logging: process.env.DB_LOGGING ? +process.env.DB_LOGGING : 0,
    master: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    slave: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
  token: {
    access_token_duration: process.env.ACCESS_TOKEN_DURATION,
    refresh_token_duration: process.env.REFRESH_TOKEN_DURATION,
  },
  grpc: {
    url: process.env.GRPC_URL,
  },
})
