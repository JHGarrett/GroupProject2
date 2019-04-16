// This is middleware for passport.js. doesnt allow the user to see info unless logged in and only allows them to see their stuff
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the  route
    if (req.user) {
        // console.log(""+ next);
        return next();
    }

    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/");
};