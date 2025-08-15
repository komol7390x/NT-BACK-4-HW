import { sequelize } from '../database/databasa.js';
import { DataTypes } from 'sequelize';

export const startModel = sequelize.define('start', {
  menu: { type: DataTypes.STRING, allowNull: false },
  setting: { type: DataTypes.STRING, allowNull: false },
  help: { type: DataTypes.STRING, allowNull: false },
  history: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'start',
  timestamps: false
});