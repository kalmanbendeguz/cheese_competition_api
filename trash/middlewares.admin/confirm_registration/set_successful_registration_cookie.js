const set_successful_registration_cookie = function () {
  return function (req, res, next) {
    console.log("set_successful_registration_cookie");

    req.app.push_cookie_array(
      req,
      res,
      "successes",
      `Sikeres regisztráció-megerősítés. Most már beléphetsz.`
    );

    return next();
  };
};

module.exports = set_successful_registration_cookie;
