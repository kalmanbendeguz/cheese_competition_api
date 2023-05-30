const check_password_correct = function () {
  const bcrypt = require("bcrypt");

  return async function (req, res, next) {
    console.log("check_password_correct");

    const is_password_valid = await bcrypt.compare(
      req.body.password,
      res.locals.user.hashed_password
    );

    if (is_password_valid) return next();
    (res.locals.errors ||= []).push("Hibás jelszó!");
    return res.render("login", { email: req.body.email });
  };
};

module.exports = check_password_correct;
