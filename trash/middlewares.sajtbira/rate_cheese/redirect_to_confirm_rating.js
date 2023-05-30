const redirect_to_confirm_rating = function (req, res, next) {
  try {
    //console.log('redirect_to_confirm_rating')

    return res.redirect(`/confirm_rating?confirm_id=${res.locals.confirm_id}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = redirect_to_confirm_rating;
