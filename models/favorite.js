'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    business: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.favorite.belongsTo(models.user)
      }
    }
  });
  return favorite;
};