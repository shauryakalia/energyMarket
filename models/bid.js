
module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    timestamp: DataTypes.BIGINT,
    energyValue : DataTypes.FLOAT,
    RECValue : DataTypes.FLOAT,
    totalValue: DataTypes.FLOAT,
    active: DataTypes.BOOLEAN,
    RPPId : DataTypes.INTEGER,
    sellerId : DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Bid.associate = function (models) {
    // associations can be defined here
    Bid.belongTo(models.RPP);
    Bid.belongsTo(models.Seller);
  };
  return Bid;
};
