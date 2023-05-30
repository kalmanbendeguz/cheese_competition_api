const get_ratings = async function (req, res, next) {
  try {
    //console.log('get_ratings')

    res.locals.ratings = await req.app.models.rating.find({
      judge_email: req.user.email,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_ratings;
