import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import dotenv from 'dotenv'
import { Flash } from './entity/Flash'
// import * as PostgressConnectionStringParser from 'pg-connection-string'

dotenv.config()
const databaseUrl: string = process.env.DATABASE_URL
// const connectionOptions =PostgressConnectionStringParser.parse(databaseUrl)
export const AppDataSource = new DataSource({
  // url: process.env.DATABASE_URL,
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  logging: true,
  
  synchronize: false,
  entities: [User, Flash],
  // migrations: ['./src/migration/**/*{.ts,.js}', './build/dist/migration/**/*.js'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  },
  // subscribers: [],
})
