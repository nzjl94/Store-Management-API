'use strict';
const faker = require('faker');
const bcrypt= require("bcrypt");

const users = [...Array(10)].map((user) => {
  const recent_date=faker.date.between('2021-06-01', '2021-07-01');
  return {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("SSyAseYAbYA9$", 12),
      status:faker.random.arrayElement(['active','inactive']),
      type:faker.random.arrayElement(['normal','admin','developer']),
      created_at: recent_date,
      updated_at: recent_date
  }
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
