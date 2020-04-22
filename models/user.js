'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Oof, you forgot a first name'
        }
      }
    },
    lastname: DataTypes.STRING,
    password:  {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Oof, you forgot a password'
        }
      }
    },,
    email: {
      DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'please give a valid email address'
        }
      }
    },
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
