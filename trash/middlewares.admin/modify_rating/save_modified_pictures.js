const save_modified_pictures = function () {
  return async function (req, res, next) {
    console.log("save_modified_pictures");

    if (!(res.locals.rating?.table_leader ?? false)) return next();

    console.log("------");
    console.log(req.files);
    console.log(res.locals.rating);

    const Rating_Picture_Model = require("../../models/Rating_Picture");

    await Rating_Picture_Model.updateOne(
      { rating_id: res.locals.rating._id },
      {
        $set: {
          pictures: req.files,
        },
      },
      { upsert: true }
    );

    return next();
  };
};

module.exports = save_modified_pictures;
