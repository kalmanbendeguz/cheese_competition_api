const check_not_authenticated = function (req, res, next) {
  try {
    //console.log('check_not_authenticated')

    if (req.isAuthenticated?.() ?? false) return res.redirect("/landing");

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = check_not_authenticated;
