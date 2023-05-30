const check_password_correct = async function (req, res, next) {
  try {
    //console.log('check_password_correct')
    const bcrypt = require("bcrypt");

    const is_password_valid = await bcrypt.compare(
      req.body.password,
      res.locals.user.hashed_password
    );

    if (is_password_valid) return next();

    const { password, ...body_without_password } = req.body;
    req.app.set_session_contexts(req.session, body_without_password);
    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].wrong_password
    );
    return res.redirect("/login");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_password_correct;
