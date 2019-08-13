'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stores', [{
      name: 'Bobs Games',
      phoneNumber: 5555555555,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Billys Games',
      phoneNumber: 5555555556,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stores', null, {})
  }
};
