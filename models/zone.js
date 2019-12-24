
module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zone', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ISO: DataTypes.STRING,
    state: DataTypes.STRING,
    EDC: DataTypes.STRING,
    loadZone: DataTypes.STRING,
    ICEdescription: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Zone.associate = function (models) {
    // associations can be defined here
  };
  return Zone;
};
