const hash_password = function () {
  const bcrypt = require("bcrypt");

  return async function (req, res, next) {
    console.log("hash_password");
    try {
      const salt = await bcrypt.genSalt();
      res.locals.hashed_password = await bcrypt.hash(req.body.password, salt);
      return next();
    } catch {
      (res.locals.errors ||= []).push("Bcrypt hiba történt.");
      res.locals.registration = req.body;
      return res.render("registration");
    }
  };
};

module.exports = hash_password;
