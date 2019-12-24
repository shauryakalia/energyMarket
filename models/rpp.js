module.exports = (sequelize, DataTypes) => {
  const RPP = sequelize.define(
    "RPP",
    {
      deliveryTimeFrom: DataTypes.BIGINT,
      deliveryTimeTo: DataTypes.BIGINT,
      shape: DataTypes.STRING,
      volume: DataTypes.INTEGER,
      primaryPowerSource: DataTypes.STRING,
      RECVolume: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      RECAttribute: {
        type: DataTypes.STRING,
        allowNull: true
      },
      initialResponseBy: DataTypes.BIGINT,
      timezone: DataTypes.STRING,
      totalEstimateEnergyValue: DataTypes.INTEGER,
      totalEstimateEnergyMonthlyValue: DataTypes.INTEGER,
      totalEstimateRECValue: DataTypes.INTEGER,
      totalEstimateRECMonthlyValue: DataTypes.INTEGER,
      // adminFee: DataTypes.INTEGER,
      energyFee: DataTypes.INTEGER,
      RECFee: DataTypes.INTEGER,
      maxHourPeak: DataTypes.INTEGER,
      status: DataTypes.STRING,
      escrowReciepts: DataTypes.ARRAY(DataTypes.TEXT),
      escrowDueBy: DataTypes.BIGINT,
      lastPaymentToSellerOn: DataTypes.BIGINT,
      sellerRanking: DataTypes.ARRAY(DataTypes.INTEGER),
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      ISOzoneId: DataTypes.INTEGER,
      RECId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  RPP.associate = function(models) {
    // associations can be defined here
    RPP.belongsTo(models.Buyer);
    RPP.belongsTo(models.Seller);
    RPP.belongsTo(models.Zone);
    RPP.belongsTo(models.REC);
  };
  return RPP;
};
