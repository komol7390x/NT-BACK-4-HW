import { sequelize } from "../database/databasa.js";
class Database {
    create = async (data, model) => {
        try {
            await sequelize.authenticate();
            console.log('✅ Connected to database');
            await sequelize.sync({ force: true });
            const result = await model.create(data)
            return result
        } catch (error) {
            return console.log(error.message);
        }
    }
}

export default new Database()