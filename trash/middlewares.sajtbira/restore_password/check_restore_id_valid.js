const check_restore_id_valid = async function (req, res, next) {
  try {
    //console.log('check_restore_id_valid')

    res.locals.active_password_reset =
      await req.app.models.judge_active_password_reset.findOne({
        restore_id: req.body.restore_id,
      });

    if (res.locals.active_password_reset) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang]
        .restore_password_id_invalid_since_opening
    );

    return res.redirect("/message_unauthenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_restore_id_valid;
