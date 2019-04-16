// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// login info page
var $loginForm = $("#login-btn");
var $signupForm = $("#signup-btn");
var $loginSubmit = $("#login-submit");
var $signupSubmit = $("#signup-submit");

// A form that allows existing users to log in
$loginForm.on("click", function() {
  $("#signup-form").hide();
  $("#login-form").show();
});

// A form that allow new users to sign up for the app
$signupForm.on("click", function() {
  $("#login-form").hide();
  $("#signup-form").show();
});

// allow user to go to the users page

$loginSubmit.on("click", function(event) {
  event.preventDefault();
  var login = {
    username: $("#usernameLogin")
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
      window.location.replace("/users");
    })
    .catch(function(err) {
      alert("Sorry, username or password is incorrect.");
      console.log(err);
    });
});

// checks to make sure that new sign up is all valid
// if it is then it will take them to the users page
$signupSubmit.on("click", function(event) {
  event.preventDefault();

  // user must enter password twice to make sure there is no typo

  var pass1 = $("#userPasswordSignup")
    .val()
    .trim();
  var pass2 = $("#confirmPassword")
    .val()
    .trim();

  if (pass1 !== pass2) {
    $("#passwordMatch").text("Your passwords don't match!");
  } else {
    console.log($("#passwordLogin").val());
    var signup = {
      username: $("#usernameSignup")
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
        return alert("Usersname is already in use.");
      }

      console.log("Taking you to main page");
      window.location.replace("/users");
    });
  }
});

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
