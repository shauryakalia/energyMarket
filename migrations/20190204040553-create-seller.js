
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sellers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    companyName: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    contactName: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    signetAccount: {
      type: Sequelize.STRING,
    },
    agreementType: {
      type: Sequelize.STRING,
    },
    plantPhotos: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    creditLimit: {
      type: Sequelize.INTEGER,
    },
    creditAvailable: {
      type: Sequelize.INTEGER,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sellers'),
};
