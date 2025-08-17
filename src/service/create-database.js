import { sequelize } from "../database/databasa.js";

class Database {
    create = async (data, model) => {
        try {
            await sequelize.authenticate();
            console.log("✅ Connected to database");

            await sequelize.sync({ alter: true });

            const result = await model.create(data);
            return result;
        } catch (error) {
            console.error("❌ Create error:", error.message);
            throw error;
        }
    };

    findOne = async (user_id, model) => {
        try {
            const result = await model.findOne({
                where: { user_id }, // 👈 bu yer ham muhim
            });
            return result;
        } catch (error) {
            console.error("❌ FindOne error:", error.message);
            throw error;
        }
    };
}

export default new Database();
