$(document).ready(function() {
  // login info page
  var $loginSubmit = $("#login-submit");
  var $signupSubmit = $("#signup-submit");

  // allow user to go to the users page

  $loginSubmit.on("click", function(event) {
    event.preventDefault();

    var login = {
      email: $("#usernameLogin")
        .val()
        .trim(),
      password: $("#userPasswordLogin")
        .val()
        .trim()
    };

    $.ajax("/api/login/", {
      method: "POST",
      data: login
    })
      .then(function(res) {
        console.log(res);
        console.log("Taking you to main page");
        window.location.replace("/mainpage");
        // $("#nameHeader").text(User.name);
      })
      .catch(function(err) {
        alert("Sorry, email or password is incorrect.");
        console.log(err);
      });
  });

  // checks to make sure that new sign up is all valid
  // if it is then it will take them to the users page
  $signupSubmit.on("click", function(event) {
    event.preventDefault();

    var signup = {
      name: $("#nameSignup")
        .val()
        .trim(),
      lastName: $("#lastNameSignup")
        .val()
        .trim(),
      email: $("#usernameSignup")
        .val()
        .trim(),
      password: $("#userPasswordSignup")
        .val()
        .trim()
    };

    $.ajax("/api/signup", {
      method: "POST",
      data: signup
    }).then(function(res) {
      console.log(res);
      if (res.errors) {
        return alert("Email is already in use.");
      }

      console.log("Taking you to main page");
      window.location.replace(res);
    });
  });
});
