const check_original_password_correct = async function (req, res, next) {
  try {
    //console.log('check_original_password_correct')
    const bcrypt = require("bcrypt");

    const { hashed_password } = await req.app.models.user.findOne(
      { email: req.user.email },
      `hashed_password`
    );

    const is_password_correct = await bcrypt.compare(
      req.body.password,
      hashed_password
    );

    if (is_password_correct) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].original_password_incorrect
    );
    return res.redirect("/settings/password");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_original_password_correct;
