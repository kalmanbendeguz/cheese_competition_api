const get_rating_sheet_view_archived_rating = function () {
  const rating_map = require("../../static/rating_sheets/rating_map");

  return function (req, res, next) {
    //console.log('get_rating_sheet_view_archived_rating')

    const rating_sheet_identifier = rating_map[res.locals.category_string];
    const rating_sheet = require(`../../static/rating_sheets/${rating_sheet_identifier}`);

    res.locals.rating_sheet = JSON.parse(JSON.stringify(rating_sheet));

    return next();
  };
};

module.exports = get_rating_sheet_view_archived_rating;
