const create_category_string = function (req, res, next) {
  try {
    //console.log('create_category_string')

    res.locals.category_string = "";

    for (let category of res.locals.cheese.product_category_list) {
      res.locals.category_string += `${category}-`;
    }

    res.locals.category_string = res.locals.category_string.slice(0, -1);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = create_category_string;
