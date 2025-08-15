import { Sequelize } from 'sequelize';
import { env } from '../config/env.config.js';

export const sequelize = new Sequelize(
  env.DATABASE.database, // 'market2'
  env.DATABASE.user,     // 'postgres'
  env.DATABASE.pass,     // '1234'
  {
    host: env.DATABASE.host,   // 'localhost'
    dialect: env.DATABASE.dialect, // 'postgres'
    port: env.DATABASE.port,   // '5432'
    logging: false
  }
);