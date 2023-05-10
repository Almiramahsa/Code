'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { name: 'almira', profession: 'admin code', role: 'admin', email: 'almiramahsa9@gmail.com', password: await bcrypt.hash('rahasia123', 10), created_at: new Date(), updated_at: new Date() },
      { name: 'farid', profession: 'backend engineer', role: 'student', email: 'farid@gmail.com', password: await bcrypt.hash('kepobeut', 10), created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
