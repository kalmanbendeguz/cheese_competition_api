const set_successful_restore_email_sent = function (req, res, next) {
  try {
    //console.log('set_successful_restore_email_sent')

    req.app.set_session_context(
      req.session,
      "successes",
      req.app.locals.dict[res.locals.lang].successful_restore_email_sent_text
    );
    req.app.set_session_contexts(req.session, req.body);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = set_successful_restore_email_sent;
