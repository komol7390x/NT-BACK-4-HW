import { DataTypes } from 'sequelize';
import { sequelize } from '../database/databasa.js';

export const userModel = sequelize.define('users', {
    user_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    lang: { type: DataTypes.STRING, allowNull: false },
    is_bot: { type: DataTypes.BOOLEAN, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    // -------------------------------------------------------------
    //  second
    phone_number: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    map: { type: DataTypes.STRING },
}, {
    tableName: 'users',
    timestamps: false,
});
