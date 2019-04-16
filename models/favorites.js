var User = require("./user.js");

module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    type: DataTypes.STRING,
    title: DataTypes.STRING
  });

  Favorites.associate = function(models) {
    models.Favorite.belongsTo(models.User);
  };
  return Favorites;
};

console.log(User);
