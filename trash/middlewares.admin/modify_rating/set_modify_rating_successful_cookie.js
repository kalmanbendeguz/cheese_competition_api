const set_modify_rating_successful_cookie = function () {
  return function (req, res, next) {
    console.log("set_modify_rating_successful_cookie");

    req.app.push_cookie_array(req, res, "successes", "Sikeres módosítás.");

    return next();
  };
};

module.exports = set_modify_rating_successful_cookie;
