const get_number_of_pictures = async function (req, res, next) {
  try {
    //console.log('get_number_of_pictures')

    res.locals.number_of_pictures =
      (
        await req.app.models.temporary_rating_picture.aggregate([
          {
            $match: { confirm_id: req.query.confirm_id },
          },
          {
            $project: { number_of_pictures: { $size: "$pictures" } },
          },
        ])
      )?.map((item) => item.number_of_pictures)[0] ?? 0;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_number_of_pictures;
