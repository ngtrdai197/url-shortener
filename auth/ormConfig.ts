import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: [__dirname + '/src/database/entities/**/*{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
})
