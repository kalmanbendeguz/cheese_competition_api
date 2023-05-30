const set_successful_password_reset_cookie = function () {
  return function (req, res, next) {
    console.log("set_successful_password_reset_cookie");

    req.app.push_cookie_array(
      req,
      res,
      "successes",
      "Sikeres jelszóváltoztatás. Most már beléphetsz az új jelszavaddal."
    );

    return next();
  };
};

module.exports = set_successful_password_reset_cookie;
