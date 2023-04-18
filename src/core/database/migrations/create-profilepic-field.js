'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users',
        'profilepic',
        Sequelize.BLOB
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users',
        'profilepic'
    )
  }
};