const hash_restore_password = function () {
  const bcrypt = require("bcrypt");

  return async function (req, res, next) {
    console.log("hash_restore_password");

    try {
      const salt = await bcrypt.genSalt();
      res.locals.hashed_password = await bcrypt.hash(
        req.body.new_password,
        salt
      );
      return next();
    } catch {
      req.app.push_cookie_array(req, res, "errors", "Bcrypt hiba történt.");
      return res.redirect("/unauthenticated_message");
    }
  };
};

module.exports = hash_restore_password;
