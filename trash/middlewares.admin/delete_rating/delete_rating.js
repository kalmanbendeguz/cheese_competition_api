const delete_rating = function () {
  return async function (req, res, next) {
    console.log("delete_rating");

    const Rating_Model =
      require("../../config/db").mongoose.connection.db.collection("ratings");

    const rating = await Rating_Model.findOne({
      secret_id: req.query.secret_id,
      judge_email: req.query.judge_email,
    });

    res.locals.rating_id = rating?._id;

    await Rating_Model.findOneAndDelete({
      secret_id: req.query.secret_id,
      judge_email: req.query.judge_email,
    });

    return next();
  };
};

module.exports = delete_rating;
