
module.exports = (sequelize, DataTypes) => {
  const REC = sequelize.define('REC', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    state: DataTypes.STRING,
    RECType: DataTypes.STRING,
    year: DataTypes.STRING,
    value: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  REC.associate = function (models) {
    // associations can be defined here
  };
  return REC;
};
