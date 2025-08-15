import { sequelize } from '../database/databasa.js';
import { startModel } from '../model/start.model.js';
import { menuModel } from '../model/menu.model.js';
export const createDatabasa = async () => {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to database');
      await sequelize.sync({ force: true });

      const start = {
        menu: 'Menu',
        setting: 'Sozlamalar',
        help: 'Yordam',
        history: 'Buyurtmalar tarixi'
      }
      const result = await startModel.create(start);
      const menu = [
        { name: 'Osh 0.5', price: 30000, image: 'osh.jpg' },
        { name: 'Manpar ', price: 35000, image: 'manpar.jpg' },
        { name: 'Lagman 0.5', price: 28000, image: 'lagman.jpg' },
        { name: 'Do\'lma', price: 32000, image: 'dolma.jpg' },
      ]
      for (let i = 0; i < menu.length; i++) {
        console.log(menu[i]);

        await menuModel.create(menu[i]);
      }
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