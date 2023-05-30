const redirect_successful_rating = function () {
  return function (req, res, next) {
    console.log("redirect_successful_rating");
    ((req.session.context ||= {}).successes ||= []).push("Sikeres értékelés.");
    //;(req.session.context.successes ||= []).push('Sikeres értékelés.')
    return res.redirect("/");
  };
};

module.exports = redirect_successful_rating;
