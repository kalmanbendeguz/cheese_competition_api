const remove_rating_pictures = function () {
  return async function (req, res, next) {
    console.log("remove_rating_pictures");

    const Rating_Picture_Model = require("../../models/Rating_Picture");

    await Rating_Picture_Model.findOneAndDelete({
      rating_id: res.locals.rating_id,
    });

    return next();
  };
};

module.exports = remove_rating_pictures;
