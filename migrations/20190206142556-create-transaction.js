
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: Sequelize.BIGINT,
    },
    RECVolume: {
      type: Sequelize.INTEGER,
    },
    RECAmount: {
      type: Sequelize.INTEGER,
    },
    EnergyVolume: {
      type: Sequelize.INTEGER,
    },
    EnergyAmount: {
      type: Sequelize.INTEGER,
    },
    recieptNumber : {
      type: Sequelize.STRING
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions'),
};
