import { sequelize } from '../database/databasa.js';
import { startModel } from '../model/start.model.js';

export const createDatabasa = async () => {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to database');
      await sequelize.sync({ force: true });

      const result = await startModel.create({
        menu: 'Menu',
        setting: 'Sozlamalar',
        help: 'Yordam',
        history: 'Buyurtmalar tarixi'
      });
      if (!result) {
        console.log('Already added');
      }
      console.log('✅ Data inserted');
    } catch (error) {
      console.error('❌ Error:', error.message);
    } finally {
      await sequelize.close();
    }
  })();
}