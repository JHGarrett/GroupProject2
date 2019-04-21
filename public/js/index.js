$(document).ready(function() {
  // // Get references to page elements
  // var $exampleText = $("#example-text");
  // var $exampleDescription = $("#example-description");
  // var $submitBtn = $("#submit");
  // var $exampleList = $("#example-list");

  // var options = {
  //   animate: true,
  //   patternWidth: 95.03,
  //   patternHeight: 83.69,
  //   grainOpacity: 0.02,
  //   grainDensity: 1,
  //   grainWidth: 2.56,
  //   grainHeight: 1
  // };
  // grained("#searchJumbotron", options);

  // login info page
  // var $loginForm = $("#login-btn");
  // var $signupForm = $("#signup-btn");
  var $loginSubmit = $("#login-submit");
  var $signupSubmit = $("#signup-submit");

  // A form that allows existing users to log in
  // $loginForm.on("click", function() {
  //   $("#signup-form").hide();
  //   $("#login-form").show();
  // });

  // A form that allow new users to sign up for the app
  // $signupForm.on("click", function() {
  //   $("#login-form").hide();
  //   $("#signup-form").show();
  // });

  //allow users to logout
  // $("#logout")
  //   .on("click", function(event) {
  //     event.preventDefault();
  //   })
  //   .then(function(res) {
  //     console.log(res);
  //     console.log("user has been logged out");
  //     window.location.replace("/");
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });

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

    // user must enter password twice to make sure there is no typo

    // var pass1 = $("#userPasswordSignup")
    //   .val()
    //   .trim();
    // var pass2 = $("#confirmPassword")
    //   .val()
    //   .trim();

    // if (pass1 !== pass2) {
    //   $("#passwordMatch").text("Your passwords don't match!");
    // } else {
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
