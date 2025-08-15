// src/database/databasa.js
import { Sequelize } from 'sequelize';
import { env } from '../config/env.config.js';

const { DATABASE, USER, PASS, HOST, PORT, DIALECT } = env.DATABASE;

export const sequelize = new Sequelize(DATABASE, USER, PASS, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  logging:false
});
