
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bids', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    timestamp: {
      type: Sequelize.BIGINT,
    },
    energyValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    RECValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    totalValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Bids'),
};
