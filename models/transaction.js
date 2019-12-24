
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    timestamp: DataTypes.BIGINT,
    RECVolume: DataTypes.INTEGER,
    RECAmount: DataTypes.INTEGER,
    EnergyVolume: DataTypes.INTEGER,
    EnergyAmount: DataTypes.INTEGER,
    RPPId : DataTypes.INTEGER,
    recieptNumber : DataTypes.STRING,
    fromAdminId : DataTypes.INTEGER,
    toSellerId : DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.RPP);
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Seller);
  };
  return Transaction;
};
