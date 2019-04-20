var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/mainpage", function(req, res) {
    if (!req.user) {
      return res.redirect("/");
    }

    console.log(req.user.name);
    var userName = req.user.name;
    var userLastName = req.user.lastName;
    var nameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1);
    var lastNameCapitalized =
      userLastName.charAt(0).toUpperCase() + userLastName.slice(1);
    res.render("mainpage", {
      name: nameCapitalized + " " + lastNameCapitalized
    });
  });

  app.get("/profile", function(req, res) {
    res.render("profile", {});
  });

  //sign up
  app.get("/index", function(req, res) {
    res.render("signup", {});
  });
  //login
  app.get("/index", function(req, res) {
    res.render("login ", {});

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      res.render("404");
    });
  });
};
