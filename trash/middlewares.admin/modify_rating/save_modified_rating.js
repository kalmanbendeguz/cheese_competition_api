const save_modified_rating = function () {
  return async function (req, res, next) {
    console.log("save_modified_rating");

    const Rating_Model =
      require("../../config/db").mongoose.connection.db.collection("ratings");

    await Rating_Model.updateOne(
      { secret_id: req.body.secret_id, judge_email: req.body.judge_email },
      {
        $set: {
          anonymous: res.locals.rating.anonymous,
          aspects: res.locals.rating.aspects,
          overall_impression: res.locals.rating.overall_impression,
        },
      },
      { upsert: true }
    );

    return next();
  };
};

module.exports = save_modified_rating;
