import { DataTypes } from 'sequelize';
import { sequelize } from '../database/databasa.js';

export const userModel = sequelize.define('menu', {
    user_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    lang: { type: DataTypes.INTEGER, allowNull: false },
    is_bot: { type: Boolean, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone_number: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    map: { type: DataTypes.STRING }
}, {
    tableName: 'menu',
    timestamps: false
});