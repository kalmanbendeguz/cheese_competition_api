const get_rating_sheet = function (req, res, next) {
  try {
    //console.log('get_rating_sheet')

    const rating_sheet_identifier =
      req.app.locals.rating_map[res.locals.category_string];

    res.locals.rating_sheet = JSON.parse(
      JSON.stringify(req.app.locals.rating_sheets[rating_sheet_identifier])
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_rating_sheet;
