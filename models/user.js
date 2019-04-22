// bcrypt hides the sensative user data in our database. It will also block out the character input when typing in your password
const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //check if password matches
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //encrypting passwords user input
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = function(models) {
    models.User.hasMany(models.Favorites);
  };
  return User;
};
