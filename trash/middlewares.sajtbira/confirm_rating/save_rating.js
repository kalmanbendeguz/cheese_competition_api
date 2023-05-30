const save_rating = async function (req, res, next) {
  try {
    //console.log('save_rating')

    res.locals.rating = new req.app.models.rating(
      res.locals.temporary_rating.rating.toObject()
    );

    await res.locals.rating.save();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_rating;
