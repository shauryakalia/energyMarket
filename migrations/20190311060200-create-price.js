'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shape: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.BIGINT
      },
      contract: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.FLOAT
      },
      loadZone: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prices');
  }
};