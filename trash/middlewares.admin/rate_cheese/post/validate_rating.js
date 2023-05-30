const validate_rating = function () {
  const validator = require("email-validator");

  return function (req, res, next) {
    console.log("validate_rating");

    if (typeof req.body === "undefined") {
      (res.locals.messages ||= []).push("Request does not have a body!");
      return res.render("authenticated_message");
    }

    /*if(typeof req.body.email === 'undefined') {
            (res.locals.errors ||= []).push('Kérlek adj meg egy e-mail címet.')
            return res.render('login')
        }*/

    return next();
  };
};

module.exports = validate_rating;
