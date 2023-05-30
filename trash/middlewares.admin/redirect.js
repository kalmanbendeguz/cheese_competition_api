const redirect = function (target) {
  return function (req, res, next) {
    console.log("redirect");

    return res.redirect(target);
  };
};

module.exports = redirect;
