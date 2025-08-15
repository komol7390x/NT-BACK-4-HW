import { DataTypes } from 'sequelize';
import { sequelize } from '../database/databasa.js';

export const startModel = sequelize.define('start', {
  menu: { type: DataTypes.STRING, allowNull: false, unique: true },
  setting: { type: DataTypes.STRING, allowNull: false, unique: true },
  help: { type: DataTypes.STRING, allowNull: false, unique: true },
  history: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: 'start', // kichik harf bilan yozish
  timestamps: false
});