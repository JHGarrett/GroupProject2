/* eslint-disable prettier/prettier */
// Original example

// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
// };

var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
//   // find user if login exists
//   app.post("/api/login", passport.authenticate("local"), function() {
//     res.json("/members");
//   });

//   // Create a new example
//   app.post("/api/signup", function(req, res) {
//     console.log(req.body);
//     db.User.create({
//       username: req.body.username,
//       password: req.body.password
//     })
//       .then(function() {
//         // res.render("login", {});
//         res.redirect(307, "/api/login");
//       })
//       .catch(function(err) {
//         console.log(err);
//         res.json(err);
//         // res.status(422).json(err.errors[0].message);
//       });
//   });

//   app.get("/members", function(req, res){
//     res.send("this is private, you should be signed in");
//   });

//   // Route for logging out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//   // Route for data on user for server side
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       // The user is not logged in
//       res.json({});
//     } else {
//       // send back the user's email and id
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });
// };

  app.post("/api/signup", function(req, res){
    db.User.create(req.body).then(function(){
      res.redirect(307, "/api/login");
    }).catch(function(err){
      console.log(err);
      res.json(err);
    });
  });

  //find user if login exists
  app.post("/api/login", passport.authenticate("local"), function(req, res){
  //redirect them to page..
    res.json("/mainpage");
  });
};