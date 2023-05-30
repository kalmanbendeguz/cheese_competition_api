const validate_login = function () {
  const validator = require("email-validator");

  return function (req, res, next) {
    console.log("validate_login");

    res.locals.login = req.body;

    if (typeof req.body === "undefined") {
      (res.locals.messages ||= []).push("Request does not have a body!");
      return res.render("unauthenticated_message");
    }

    if (typeof req.body.email === "undefined") {
      (res.locals.errors ||= []).push("Kérlek adj meg egy e-mail címet.");
      return res.render("login");
    }

    if (!validator.validate(req.body.email)) {
      (res.locals.errors ||= []).push("Invalid e-mail cím!");
      return res.render("login");
    }

    if (typeof req.body.password === "undefined") {
      (res.locals.errors ||= []).push("Kérlek adj meg egy jelszót.");
      return res.render("login");
    }

    if (req.body.password.length === 0) {
      (res.locals.errors ||= []).push("Üres jelszó!");
      return res.render("login");
    }

    return next();
  };
};

module.exports = validate_login;
