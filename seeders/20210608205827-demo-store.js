'use strict';
const faker = require('faker');
const fs    = require('fs');
var path    = require('path');


const stores = [...Array(8)].map((user) => {
    const recent_date = faker.date.between('2021-06-01', '2021-07-01');
    const filename    = Date.now()+ Math.round(Math.random() * 1E9)
    fs.copyFile(
      path.join(path.resolve(__dirname), "../",`uploads/fake/${faker.datatype.number({ min: 1, max: 10 })}.jpeg`)
      , 
      path.join(path.resolve(__dirname), "../",`uploads/store/${filename}.jpeg`
      ), (err) => {
      if (err) 
        throw err;
    });


  return {
      name: faker.name.jobDescriptor(),
      imagePath:`uploads/store/${filename}.jpeg`,
      created_at: recent_date,
      updated_at: recent_date
  }
});
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', stores, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {});
  }
};