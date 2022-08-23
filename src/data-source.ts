import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import dotenv from 'dotenv'
import { Flash } from './entity/Flash'
import * as PostgressConnectionStringParser from 'pg-connection-string'

dotenv.config()
const databaseUrl: string = process.env.DATABASE_URL
const connectionOptions =PostgressConnectionStringParser.parse(databaseUrl)
export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  // host: connectionOptions.host,
  // port: parseInt(connectionOptions.port),
  // username: connectionOptions.user,
  // password:connectionOptions.password,
  // database: connectionOptions.database,
  synchronize: false,
  // logging: true,
  entities: [User, Flash],
  migrations: ['./src/migration/**/*{.ts,.js}', './build/dist/migration/**/*.js'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  },
  // subscribers: [],
})
