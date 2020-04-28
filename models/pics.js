'use strict';
module.exports = (sequelize, DataTypes) => {
  const pics = sequelize.define('pics', {
    file: DataTypes.STRING
  }, {});
  pics.associate = function(models) {
    // associations can be defined here
    models.pics.belongsTo(models.posts, {
  through: 'posts_pics',
  onDelete: 'CASCADE'
})
  };
  return pics;
};
