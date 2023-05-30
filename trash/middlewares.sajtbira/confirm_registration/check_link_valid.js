const check_link_valid = async function (req, res, next) {
  try {
    //console.log('check_link_valid')

    res.locals.temporary_registration =
      await req.app.models.judge_temporary_registration.findOne({
        confirm_id: req.query.confirm_id,
      });

    if (res.locals.temporary_registration) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].confirm_link_invalid
    );

    return res.redirect("/message_unauthenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_link_valid;
