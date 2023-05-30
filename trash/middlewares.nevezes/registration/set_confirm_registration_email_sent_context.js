const set_confirm_registration_email_sent_context = function (req, res, next) {
  try {
    //console.log('set_confirm_registration_email_sent_context')

    req.app.set_session_context(
      req.session,
      "successes",
      req.app.locals.dict[res.locals.lang].confirm_registration_email_sent_text
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = set_confirm_registration_email_sent_context;
