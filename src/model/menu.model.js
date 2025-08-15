import { DataTypes } from 'sequelize';
import { sequelize } from '../database/databasa.js';

export const menuModel = sequelize.define('menu', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.INTEGER, allowNull: false},
    image: { type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'menu',
    timestamps: false
});