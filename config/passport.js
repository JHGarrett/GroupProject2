var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// lets passport know that we want to sign in locally with a user name or email and passwork
passport.use(new LocalStrategy(
    // sign in using an username
    {
        usernameField: "username",
        
    },
    function(username, password, done) {
    // attempting to sign in
        console.log("accesing database");
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
            
            // invalid user login username
            if (!dbUser) {
                console.log("no email given");
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            // invalid user password
            else if (!dbUser.validPassword(password)) {
                console.log("wrong password");
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // good to go
            console.log("returning user");
            return done(null, dbUser);
        });
    }
));

// passport needs to serialize everyuser for http issues. this will
// assign them one and remove it if needed. 
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;