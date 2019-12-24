
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RECs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.STRING,
    },
    RECType: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.FLOAT,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('RECs'),
};
