'use strict';
module.exports = (sequelize, DataTypes) => {
  const tags = sequelize.define('tags', {
    tag: DataTypes.STRING
  }, {});
  tags.associate = function(models) {
    // associations can be defined here
    models.tags.belongsToMany(models.posts, {
  through: 'posts_tags',
  onDelete: 'CASCADE'
})
  };
  return tags;
};
