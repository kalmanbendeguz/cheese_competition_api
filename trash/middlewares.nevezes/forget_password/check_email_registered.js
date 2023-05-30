const check_email_registered = async function (req, res, next) {
  try {
    //console.log('check_email_registered')

    const user = await req.app.models.user.findOne({ email: req.body.email });

    if (user) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].email_not_registered
    );
    req.app.set_session_contexts(req.session, req.body);

    return res.redirect("/forget_password");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_email_registered;
