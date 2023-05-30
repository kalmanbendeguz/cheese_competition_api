const check_message_unauthenticated = function (req, res, next) {
  try {
    //console.log('check_message_unauthenticated')

    if (req.isAuthenticated?.() ?? false)
      return res.redirect("/message_authenticated");

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = check_message_unauthenticated;
