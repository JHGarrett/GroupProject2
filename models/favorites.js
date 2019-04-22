var User = require("./user.js");

module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER(100)
  });

  Favorites.associate = function(models) {
    models.Favorites.belongsTo(models.User);
  };
  return Favorites;
};

console.log(User.id);
