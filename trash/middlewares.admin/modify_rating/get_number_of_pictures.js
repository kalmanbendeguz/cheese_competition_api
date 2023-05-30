const get_number_of_pictures = function () {
  return async function (req, res, next) {
    //console.log('get_number_of_pictures')

    if (!(res.locals.rating?.table_leader ?? false)) return next();

    const Rating_Picture_Model = require("../../models/Rating_Picture");

    res.locals.number_of_pictures =
      (
        await Rating_Picture_Model.aggregate([
          {
            $match: { rating_id: res.locals.rating?._id },
          },
          {
            $project: { number_of_pictures: { $size: "$pictures" } },
          },
        ])
      )?.map((item) => item.number_of_pictures)[0] ?? 0;

    return next();
  };
};

module.exports = get_number_of_pictures;
