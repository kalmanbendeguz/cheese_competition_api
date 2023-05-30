const check_temporary_rating_belongs_to_judge = function () {
  return async function (req, res, next) {
    console.log("check_temporary_rating_belongs_to_judge");

    if (res.locals.temporary_rating.rating.judge_email === req.user.email)
      return next();

    req.app.push_cookie_array(
      req,
      res,
      "errors",
      "Ez az ideiglenes értékelés nem a bejelentkezett bírához tartozik."
    );
    return res.redirect("/authenticated_message");
  };
};

module.exports = check_temporary_rating_belongs_to_judge;
