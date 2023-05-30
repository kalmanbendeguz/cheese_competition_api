const get_dictionary = function () {
  return function (req, res, next) {
    console.log("get_dictionary");

    res.locals.dictionary = require("../../../static/rating_sheets/dictionary");
    res.locals.category_dictionary = require("../../../static/category_dictionary");

    return next();
  };
};

module.exports = get_dictionary;
