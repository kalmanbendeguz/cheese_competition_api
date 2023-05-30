const check_message_authenticated = function (req, res, next) {
  try {
    //console.log('check_authenticated')

    if (!req.isAuthenticated?.() ?? true)
      return res.redirect("/message_unauthenticated");

    res.locals.user = req.user;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = check_message_authenticated;
