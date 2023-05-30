const get_judges_of_ratings = function () {
  return async function (req, res, next) {
    console.log("get_judges_of_ratings");

    const Judge_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "judge_users"
      );

    for (let rating of res.locals.ratings) {
      let judge = await Judge_Model.findOne({ email: rating.judge_email });
      rating.judge_name = judge.full_name;
    }

    return next();
  };
};

module.exports = get_judges_of_ratings;
