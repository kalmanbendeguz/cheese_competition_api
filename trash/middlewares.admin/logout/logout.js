const logout = function () {
  return function (req, res, next) {
    console.log("logout");

    req.logout((err) => {
      if (err) return next(err);
      return res.redirect("/login");
    });
  };
};

module.exports = logout;
