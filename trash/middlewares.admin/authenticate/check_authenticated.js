const check_authenticated = function () {
  return function (req, res, next) {
    console.log("check_authenticated");

    if (!req.isAuthenticated()) return res.redirect("/login");

    res.locals.user = req.user;

    return next();
  };
};

module.exports = check_authenticated;
