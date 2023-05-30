const redirect_to_confirm_rating = function () {
  return function (req, res, next) {
    console.log("redirect_to_confirm_rating");

    return res.redirect(
      `/confirm_rating?confirm_link_identifier=${res.locals.confirm_link_identifier}`
    );
  };
};

module.exports = redirect_to_confirm_rating;
