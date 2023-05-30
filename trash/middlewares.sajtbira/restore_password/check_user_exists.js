const check_user_exists = async function (req, res, next) {
  try {
    //console.log('check_user_exists')

    res.locals.user = await req.app.models.judge_user.findOne({
      email: res.locals.active_password_reset.email,
    });

    if (res.locals.user) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang]
        .restore_password_link_user_does_not_exist
    );

    return res.redirect("/message_unauthenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_user_exists;
