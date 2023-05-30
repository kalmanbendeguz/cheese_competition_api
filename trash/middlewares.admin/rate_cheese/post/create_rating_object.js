const create_rating_object = function () {
  const Rating_Model = require("../../models/Rating");

  return function (req, res, next) {
    console.log("create_rating_object");

    const anonymous_rating =
      typeof req.body.anonymous_rating !== "undefined" ? true : false;

    res.locals.rating_sheet.forEach((aspect, i) => {
      aspect.score = req.body[`score_${aspect.title}`];
      aspect.comment = req.body[`comment_${aspect.title}`];
      aspect.blocks.forEach((block, j) => {
        block.forEach((property) => {
          if (
            !(
              `property_checkbox-${aspect.title}-${j + 1}-${property}` in
              req.body
            )
          ) {
            res.locals.rating_sheet[i].blocks[j] = res.locals.rating_sheet[
              i
            ].blocks[j].filter((e) => e !== property);
          }
        });
      });
    });

    res.locals.rating.anonymous = anonymous_rating;
    res.locals.rating.aspects = res.locals.rating_sheet;
    res.locals.rating.overall_impression = req.body.overall_impression;

    return next();
  };
};

module.exports = create_rating_object;
