const get_message_from_cookie = function () {
  return function (req, res, next) {
    console.log("get_message_from_cookie");

    if (!Object.hasOwnProperty.bind(req)("cookies")) return next();

    if (Object.hasOwnProperty.bind(req.cookies)("successes")) {
      res.locals.successes = JSON.parse(req.cookies["successes"]);
      res.clearCookie("successes", { httpOnly: true });
    }

    if (Object.hasOwnProperty.bind(req.cookies)("infos")) {
      res.locals.infos = JSON.parse(req.cookies["infos"]);
      res.clearCookie("infos", { httpOnly: true });
    }

    if (Object.hasOwnProperty.bind(req.cookies)("warnings")) {
      res.locals.warnings = JSON.parse(req.cookies["warnings"]);
      res.clearCookie("warnings", { httpOnly: true });
    }
    if (Object.hasOwnProperty.bind(req.cookies)("errors")) {
      res.locals.errors = JSON.parse(req.cookies["errors"]);
      res.clearCookie("errors", { httpOnly: true });
    }

    return next();
  };
};

module.exports = get_message_from_cookie;
