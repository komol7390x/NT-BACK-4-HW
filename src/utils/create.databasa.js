// src/bot.js
import { sequelize } from '../database/databasa.js';
import { startModel } from '../model/start.model.js';

export const createDatabasa = async () => {
  const start = {
    menu: 'Menu',
    setting: 'Sozlamalar',
    help: 'Yordam',
    history: 'Buyurtmalar tarixi'
  };
  await startModel.create(start);
  console.log('Initial data inserted');
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');

    // ❗ Birinchi marta ishlaganda force:true qo‘llash
    await sequelize.sync({ alter: true });
    console.log('Models synced');

    await createDatabasa();

  } catch (err) {
    console.error('DB error:', err);
  } finally {
    await sequelize.close();
  }
})();
