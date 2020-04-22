'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};