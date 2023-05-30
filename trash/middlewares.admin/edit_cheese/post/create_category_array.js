const create_category_array = function () {
  return function (req, res, next) {
    console.log("create_category_array");

    res.locals.category_array = req.body.product_category_list.split("-");

    return next();
  };
};

module.exports = create_category_array;
