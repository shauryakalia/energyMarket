'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    shape: DataTypes.STRING,
    time: DataTypes.BIGINT,
    contract: DataTypes.STRING,
    value: DataTypes.FLOAT,
    loadZone: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.BIGINT
  }, {});
  Price.associate = function (models) {
    // associations can be defined here
  };
  return Price;
};