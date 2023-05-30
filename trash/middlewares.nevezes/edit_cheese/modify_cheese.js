const modify_cheese = function (req, res, next) {
  try {
    //console.log('modify_cheese')

    res.locals.cheese.maturation_time_quantity = undefined;
    res.locals.cheese.maturation_time_unit = undefined;

    res.locals.cheese = Object.assign(res.locals.cheese, req.body);
    res.locals.cheese.product_category_list = res.locals.category_array;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = modify_cheese;
