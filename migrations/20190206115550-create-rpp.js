
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RPPs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    deliveryTimeFrom: {
      type: Sequelize.BIGINT,
    },
    deliveryTimeTo: {
      type: Sequelize.BIGINT,
    },
    shape: {
      type: Sequelize.STRING,
    },
    volume: {
      type: Sequelize.INTEGER,
    },
    primaryPowerSource: {
      type: Sequelize.STRING,
    },
    RECVolume: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    RECAttribute: {
      type: Sequelize.STRING,
      allowNull: true
    },
    initialResponseBy: {
      type: Sequelize.BIGINT,
    },
    timezone: {
      type: Sequelize.STRING,
    },
    totalEstimateEnergyValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    totalEstimateEnergyMonthlyValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    totalEstimateRECValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    totalEstimateRECMonthlyValue: {
      type: Sequelize.DECIMAL(10,2),
    },
    // adminFee: {
    //   type: Sequelize.DECIMAL(10,2),
    // },
    energyFee: {
      type: Sequelize.DECIMAL(10,2),
    },
    RECFee: {
      type: Sequelize.DECIMAL(10,2),
    },
    maxHourPeak: {
      type: Sequelize.DECIMAL(10,2),
    },
    status: {
      type: Sequelize.STRING,
    },
    escrowReciepts: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    sellerRanking: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    escrowDueBy: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    lastPaymentToSellerOn: {
      type: Sequelize.BIGINT,
    },
    createdAt: { 
      type: Sequelize.DATE
    },
    updatedAt: { 
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('RPPs'),
};
