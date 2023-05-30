const validate_secret_id = function () {
  return function (req, res, next) {
    console.log("validate_secret_id");

    if (req.query.secret_id.trim() === "") {
      (res.locals.messages ||= []).push("Kérlek adj meg egy azonosítót.");
      res.locals.back_target = "/";
      return res.render("authenticated_message");
    }

    return next();
  };
};

module.exports = validate_secret_id;
