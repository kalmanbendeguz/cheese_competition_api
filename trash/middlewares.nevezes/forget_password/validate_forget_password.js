const validate_forget_password = function (req, res, next) {
  try {
    const validator = require("email-validator");
    if (validator.validate(req.body.email)) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].invalid_email
    );
    req.app.set_session_contexts(req.session, req.body);

    return res.redirect("/forget_password");
  } catch (err) {
    return next(err);
  }
};

module.exports = validate_forget_password;
