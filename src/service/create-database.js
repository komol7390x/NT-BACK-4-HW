import { sequelize } from "../database/databasa.js";

class Database {
    // create
    create = async (data, model) => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true }); // jadval yaratib beradi
            console.log("✅ Connected & Synced");
            const result = await model.create(data);
            return result;
        } catch (error) {
            console.error("❌ Create error:", error.message);
            throw error;
        } finally {
            await sequelize.close();
        }
    };

    // findOne
    findOne = async (key, value = "", model) => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true }); // agar jadval yo‘q bo‘lsa yaratadi
            const result = await model.findOne({
                where: { [key]: value }, // 👈 bu yer to‘g‘ri
            });
            return result;
        } catch (error) {
            console.error("❌ FindOne error:", error.message);
            throw error;
        } finally {
            await sequelize.close();
        }
    };

    updateById = async (id, newData, model) => {
        try {
            // 🔹 yangilash
            const [updated] = await model.update(newData, {
                where: { id },   // faqat id bo‘yicha qidiradi
            });

            if (updated === 0) {
                console.log("❌ Update error: Bunday id topilmadi");
                return null;
            }

            // 🔹 yangilangan rowni qaytarish
            const updatedRow = await model.findByPk(id);
            return updatedRow;

        } catch (error) {
            console.error("❌ UpdateById error:", error.message);
            throw error;
        } finally {
            await sequelize.close();
        }
    };

    deleteById = async (user_id, model) => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true }); // agar jadval yo‘q bo‘lsa yaratadi
            const deleted = await model.destroy({
                where: { user_id }   // user_id bo‘yicha o‘chiradi
            });

            if (deleted === 0) {
                console.log("❌ Delete error: Bunday user_id topilmadi");
                return null;
            }
            return true;

        } catch (error) {
            console.error("❌ DeleteById error:", error.message);
            throw error;
        }
    };
}

export default new Database();
