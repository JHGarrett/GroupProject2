var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

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

  app.post("/api/signup", function(req, res) {
    db.User.create(req.body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  //find user if login exists
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    //redirect them to page..
    res.json("/mainpage");
  });
};
