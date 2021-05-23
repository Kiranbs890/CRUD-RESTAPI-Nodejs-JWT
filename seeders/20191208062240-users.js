'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
        {
          "username": "admin",
          "password": "$2a$08$d8cBoqvwH/nNmr00uc3cJu.euCGa/66APz8zesrArEl",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users');
  }
};
