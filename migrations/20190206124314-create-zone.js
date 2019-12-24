
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Zones', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ISO: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    EDC: {
      type: Sequelize.STRING,
    },
    loadZone: {
      type: Sequelize.STRING,
    },
    ICEdescription: {
      type: Sequelize.STRING,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Zones'),
};
