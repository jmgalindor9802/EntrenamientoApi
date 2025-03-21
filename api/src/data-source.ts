import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { environments } from './environments';

const currentEnv = process.env.NODE_ENV;
const envFile = environments[currentEnv];

dotenv.config({path: envFile});

const source = new DataSource({
  type: 'mssql',
  host: process.env.SQL_SERVER ,
  database: process.env.SQL_DATABASE ,
  username: process.env.SQL_USER ,
  password: process.env.SQL_PASSWORD ,
  port: parseInt(process.env.SQL_PORT, 10),
  extra: {
    trustServerCertificate: true,
    encrypt: process.env.SQL_ENCRYPT === 'true',
  },
  dropSchema: false,
  synchronize: true,
  entities: [join(__dirname, '**', '**', '*.entity.{ts,js}')],
  migrations: ['./src/databases/migrations/*.ts'],
});

export default source;
