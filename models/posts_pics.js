'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts_pics = sequelize.define('posts_pics', {
    picId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  posts_pics.associate = function(models) {
    // associations can be defined here
  };
  return posts_pics;
};