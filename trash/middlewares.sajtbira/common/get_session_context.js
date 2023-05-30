const get_session_context = function (req, res, next) {
  try {
    //console.log('get_session_context')
    if (typeof req.session === "undefined") return next();
    if (typeof req.session.context === "undefined") return next();

    res.locals.context = req.session.context;

    delete req.session.context;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_session_context;
