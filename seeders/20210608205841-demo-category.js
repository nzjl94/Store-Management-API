'use strict';
const faker           = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const store_id = (await queryInterface.sequelize.query(
      'SELECT * FROM stores where deleted_at is null', 
      {type: queryInterface.sequelize.QueryTypes.SELECT}
    )).map(a => a.id);
    const categories = [...Array(32)].map((category) => {
      const recent_date=faker.date.between('2021-06-01', '2021-07-01');
      return {
          name: faker.name.firstName(),
          note: faker.name.jobDescriptor(),
          storeId:faker.random.arrayElement(store_id),
          created_at: recent_date,
          updated_at: recent_date
      }
    });
    return queryInterface.bulkInsert('categories', categories, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
