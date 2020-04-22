'use strict';
let bcrypt = require('bcryptjs')


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
    },
    email: {
      type:  DataTypes.STRING,
      validate: {
       isEmail: {
           msg: 'please give a valid email address'
        }
      }
    },
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
    hooks: {
        beforeCreate: pendingUser => {
          //hash the passwords // can be done in one line
          let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
          //reassign the hashed Password (overwrite the plane text password)
          pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
