const save_temporary_rating = async function (req, res, next) {
  try {
    //console.log('save_temporary_rating')

    await req.app.models.temporary_rating.findOneAndUpdate(
      {
        "rating.secret_id": res.locals.rating.secret_id,
        "rating.judge_email": res.locals.rating.judge_email,
      },
      {
        rating: res.locals.rating,
        confirm_id: res.locals.confirm_id,
      },
      { upsert: true }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_temporary_rating;
