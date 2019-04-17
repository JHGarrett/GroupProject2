// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;

// var db = require("../models");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // console.log(`id: ${id}`);
//   User.findById(id)
//     .then(user => {
//       done(null, user);
//     })
//     .catch(error => {
//       console.log(`Error: ${error}`);
//     });
// });

// // lets passport know that we want to sign in locally with a user name or email and passwork
// passport.use(
//   new LocalStrategy(
//     // sign in using an username
//     {
//       usernameField: "username"
//     },
//     function(username, password, done) {
//       // attempting to sign in
//       console.log("accesing database");
//       db.User.findOne({
//         where: {
//           username: username
//         }
//       }).then(function(dbUser) {
//         // invalid user login username
//         if (!dbUser) {
//           console.log("no email given");
//           return done(null, false, {
//             message: "Incorrect username."
//           });
//         }
//         // invalid user password
//         else if (!dbUser.validPassword(password)) {
//           console.log("wrong password");
//           return done(null, false, {
//             message: "Incorrect password."
//           });
//         }
//         // good to go
//         console.log("returning user");
//         return done(null, dbUser);
//       });
//     }
//   )
// );

// // passport needs to serialize everyuser for http issues. this will
// // assign them one and remove it if needed.
// // passport.serializeUser(function(user, cb) {
// //   cb(null, user);
// // });

// // passport.deserializeUser(function(obj, cb) {
// //   cb(null, obj);
// // });

// // Exporting passport
// module.exports = passport;

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var db = require("../models");

//what we are doing to log in

passport.use(
  new localStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        if (!dbUser) {
          return done(null, false, { message: "Incorrect Email" });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, { message: "Incorrect Password" });
        } else {
          done(null, dbUser);
        }
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

module.exports = passport;
