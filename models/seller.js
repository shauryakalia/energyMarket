
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    contactName: DataTypes.STRING,
    title: DataTypes.STRING,
    phone: DataTypes.STRING,
    signetAccount: DataTypes.STRING,
    agreementType: DataTypes.STRING,
    plantPhotos: DataTypes.ARRAY(DataTypes.TEXT),
    creditLimit: DataTypes.INTEGER,
    creditAvailable: DataTypes.INTEGER,
    userId : DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Seller.associate = function (models) {
    // associations can be defined here
    Seller.belongsTo(models.User);
  };
  return Seller;
};
