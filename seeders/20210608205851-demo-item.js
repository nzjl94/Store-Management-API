'use strict';
const faker = require('faker');
const fs    = require('fs');
var path    = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const category_id = (await queryInterface.sequelize.query(
      'SELECT * FROM categories where deleted_at is null', 
      {type: queryInterface.sequelize.QueryTypes.SELECT}
    )).map(a => a.id);

    const items = [...Array(150)].map((item) => {
        const recent_date = faker.date.between('2021-06-01', '2021-07-01');
        const filename    = Date.now()+ Math.round(Math.random() * 1E9);
        fs.copyFile(
          path.join(path.resolve(__dirname), "../",`uploads/fake/${faker.datatype.number({ min: 1, max: 10 })}.jpeg`)
          , 
          path.join(path.resolve(__dirname), "../",`uploads/item/${filename}.jpeg`
          ), (err) => {
          if (err) 
            throw err;
        });
        return {
            name: faker.name.jobDescriptor(),
            imagePath:`uploads/item/${filename}.jpeg`,
            note: faker.name.jobDescriptor(),
            categoryId:faker.random.arrayElement(category_id),
            price:faker.finance.amount(250,1000000,2),
            created_at: recent_date,
            updated_at: recent_date
        }
    });
    return queryInterface.bulkInsert('items', items, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};