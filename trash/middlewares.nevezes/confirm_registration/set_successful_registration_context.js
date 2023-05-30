const set_successful_registration_context = function (req, res, next) {
  try {
    //console.log('set_successful_registration_context')

    req.app.set_session_context(
      req.session,
      "successes",
      req.app.locals.dict[res.locals.lang].successful_registration_confirmation
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = set_successful_registration_context;
