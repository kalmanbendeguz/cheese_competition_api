const validate_restore_password = function (req, res, next) {
  try {
    //console.log('validate_restore_password')

    let problems = [];

    // kisbetű, nagybetű, szám, min 8, max 25 karakter
    if (req.body.new_password.length < 8) {
      problems.push(req.app.locals.dict[res.locals.lang].password_too_short);
    }
    if (req.body.new_password.length > 25) {
      problems.push(req.app.locals.dict[res.locals.lang].password_too_long);
    }
    if (req.body.new_password === req.body.new_password.toUpperCase()) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_lowercase
      );
    }
    if (req.body.new_password === req.body.new_password.toLowerCase()) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_uppercase
      );
    }
    const hasNumber = /\d/;
    if (!hasNumber.test(req.body.new_password)) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_number
      );
    }
    if (req.body.new_password !== req.body.confirm_new_password) {
      problems.push(req.app.locals.dict[res.locals.lang].passwords_dont_match);
    }

    if (problems.length === 0) return next();

    const { new_password, confirm_new_password, ...body_without_password } =
      req.body;
    req.app.set_session_contexts(req.session, body_without_password);
    for (const problem of problems) {
      req.app.set_session_context(req.session, "errors", problem);
    }

    return res.redirect(`/restore_password?restore_id=${req.body.restore_id}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = validate_restore_password;
