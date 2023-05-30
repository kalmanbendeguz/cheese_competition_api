const validate_registration = function (req, res, next) {
  try {
    //console.log('validate_registration')
    const validator = require("email-validator");

    let problems = [];

    if (typeof req.body === "undefined") {
      problems.push(
        req.app.locals.dict[res.locals.lang].request_does_not_have_a_body
      );
    }

    if (!validator.validate(req.body.email)) {
      problems.push(req.app.locals.dict[res.locals.lang].invalid_email);
    }

    if (req.body.password.length < 8) {
      problems.push(req.app.locals.dict[res.locals.lang].password_too_short);
    }

    if (req.body.password.length > 25) {
      problems.push(req.app.locals.dict[res.locals.lang].password_too_long);
    }

    if (req.body.password === req.body.password.toUpperCase()) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_lowercase
      );
    }

    if (req.body.password === req.body.password.toLowerCase()) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_uppercase
      );
    }

    const hasNumber = /\d/;
    if (!hasNumber.test(req.body.password)) {
      problems.push(
        req.app.locals.dict[res.locals.lang].password_must_contain_number
      );
    }

    if (req.body.password !== req.body.confirm_password) {
      problems.push(req.app.locals.dict[res.locals.lang].passwords_dont_match);
    }

    if (req.body.full_name.length === 0) {
      problems.push(req.app.locals.dict[res.locals.lang].full_name_field_empty);
    }

    if (problems.length === 0) return next();

    const { password, confirm_password, ...body_without_password } = req.body;
    req.app.set_session_contexts(req.session, body_without_password);
    for (const problem of problems) {
      req.app.set_session_context(req.session, "errors", problem);
    }

    return res.redirect("/registration");
  } catch (err) {
    return next(err);
  }
};

module.exports = validate_registration;
