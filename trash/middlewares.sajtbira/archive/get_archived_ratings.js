const get_archived_ratings = async function (req, res, next) {
  try {
    //console.log('get_archived_ratings')

    res.locals.archived_ratings = await req.app.models.archived_rating.find({
      judge_email: req.user.email,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_archived_ratings;
