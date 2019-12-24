
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {type :DataTypes.STRING , Unique : true},
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here

  };
  return User;
};
