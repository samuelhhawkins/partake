'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    wants: DataTypes.STRING,

  }, {});
  posts.associate = function(models) {
    // associations can be defined here
    models.posts.belongsTo(models.user)
    models.posts.belongsToMany(models.tags, {
  through: 'posts_tags',
  onDelete: 'CASCADE'
})
    models.posts.belongsToMany(models.pics, {
  through: 'posts_pics',
  onDelete: 'CASCADE'
})

  };
  return posts;
};
