'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts_tags = sequelize.define('posts_tags', {
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  posts_tags.associate = function(models) {
    // associations can be defined here
  };
  return posts_tags;
};