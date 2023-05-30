const set_table_arrived_success_cookie = function () {
  return function (req, res, next) {
    console.log("set_table_arrived_success_cookie");

    req.app.push_cookie_array(req, res, "successes", `Sikeres módosítás.`);

    return next();
  };
};

module.exports = set_table_arrived_success_cookie;
