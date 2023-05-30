const hash_set_password = function () {
  const bcrypt = require("bcrypt");

  return async function (req, res, next) {
    console.log("hash_set_password");
    try {
      const salt = await bcrypt.genSalt();
      res.locals.hashed_password = await bcrypt.hash(
        req.body.new_password,
        salt
      );
      return next();
    } catch {
      req.app.push_cookie_array(req, res, "errors", "Bcrypt hiba történt.");
      return res.redirect("/settings/password");
    }
  };
};

module.exports = hash_set_password;
