// // bcrypt allows you to safly store user data https://www.npmjs.com/package/bcrypt

// const bcrypt = require("bcrypt");
// // const saltRounds = 10;
// // const myPlaintextPassword = "s0//P4$$w0rD";
// // const someOtherPlaintextPassword = "not_bacon";

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });

//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };

//   User.addHook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(
//       user.password,
//       bcrypt.genSaltSync(10),
//       null
//     );
//   });

//   User.associate = function(models) {
//     models.User.hasMany(models.Favorites);
//   };

//   return User;
// };

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
