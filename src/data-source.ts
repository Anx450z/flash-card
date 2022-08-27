import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Flash } from './entity/Flash'
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config()
const environment = process.env.NODE_ENV
console.log(environment)
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: environment !== 'development' ? process.env.DATABASE_URL : null,

  host: environment === 'development' ? process.env.HOST : null,
  port: environment === 'development' ? 5432 : null,
  username: environment === 'development' ? process.env.USERNAME : null,
  password: environment === 'development' ? process.env.PASSWORD : null,
  database: environment === 'development' ? process.env.DATABASE : null,
  logging: environment === 'development' ? true : false,

  synchronize: false,
  entities: [User, Flash],
  migrations: [join(__dirname, '**/migration', '*.{ts,js}')],
  extra:
    environment !== 'development'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : null,
  // subscribers: [],
})
