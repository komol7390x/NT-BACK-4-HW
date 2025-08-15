import { Sequelize } from 'sequelize';
import { env } from '../config/env.config.js';

export const sequelize = new Sequelize(
  env.DATABASE.database, 
  env.DATABASE.user,  
  env.DATABASE.pass,
  {
    host: env.DATABASE.host, 
    dialect: env.DATABASE.dialect,
    port: env.DATABASE.port,
    logging: false
  }
);