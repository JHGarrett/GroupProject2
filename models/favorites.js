var User = require("./user.js");

module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    title: DataTypes.STRING,
    isLiked: DataTypes.BOOLEAN
  });

  Favorites.associate = function(models) {
    models.Favorites.belongsTo(models.User);
  };
  return Favorites;
};

console.log(User);
