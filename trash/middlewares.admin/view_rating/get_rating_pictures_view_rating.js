const get_rating_pictures_view_rating = function () {
  return async function (req, res, next) {
    console.log("get_rating_pictures_view_rating");

    if (!(res.locals?.rating?.table_leader ?? false)) return next();

    //console.log(res.locals.rating)

    const Rating_Picture_Model = require("../../models/Rating_Picture");

    const rating_picture = await Rating_Picture_Model.findOne({
      rating_id: res.locals.rating._id,
    });

    //console.log(rating_picture)

    res.locals.rating_pictures = rating_picture?.pictures ?? [];

    return next();
  };
};

module.exports = get_rating_pictures_view_rating;
