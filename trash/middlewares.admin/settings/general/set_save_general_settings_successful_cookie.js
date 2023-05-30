const set_save_general_settings_successful_cookie = function () {
  return function (req, res, next) {
    console.log("set_save_general_settings_successful_cookie");

    req.app.push_cookie_array(req, res, "successes", "Sikeres mentés.");

    return next();
  };
};

module.exports = set_save_general_settings_successful_cookie;
