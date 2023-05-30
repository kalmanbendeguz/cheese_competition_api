const set_confirm_registration_email_sent_cookie = function () {
  return function (req, res, next) {
    console.log("set_confirm_registration_email_sent_cookie");

    req.app.push_cookie_array(
      req,
      res,
      "successes",
      `Sikeres regisztráció, a belépés előtt erősítsd meg a regisztrációd, az emailben kapott linkre kattintva!
Ezt az oldalt bezárhatod.`
    );

    return next();
  };
};

module.exports = set_confirm_registration_email_sent_cookie;
