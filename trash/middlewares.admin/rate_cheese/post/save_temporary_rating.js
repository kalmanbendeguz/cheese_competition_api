const save_temporary_rating = function () {
  const Temporary_Rating_Model = require("../../../models/Temporary_Rating");

  return async function (req, res, next) {
    console.log("save_temporary_rating");

    await Temporary_Rating_Model.findOneAndUpdate(
      {
        "rating.secret_id": res.locals.rating.secret_id,
        "rating.judge_email": res.locals.rating.judge_email,
      },
      {
        rating: res.locals.rating,
        confirm_string: res.locals.confirm_link_identifier,
      },
      { upsert: true }
    );

    return next();
  };
};

module.exports = save_temporary_rating;
