
module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    contactName: DataTypes.STRING,
    title: DataTypes.STRING,
    phone: DataTypes.STRING,
    signetAccount: DataTypes.STRING,
    creditLimit: DataTypes.INTEGER,
    creditAvailable: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Buyer.associate = function (models) {
    // associations can be defined here
    Buyer.belongsTo(models.User);
  };
  return Buyer;
};
