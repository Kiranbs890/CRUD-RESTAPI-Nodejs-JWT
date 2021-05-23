'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tower', [
      {
        "name": "Silver Tower",
        "location": "Business Bay",
        "floors": "15",
        "offices": "30",
        "rating": "7",
        "latitude": "10.9",
        "longitude": "111.6",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tower');
  }
};
