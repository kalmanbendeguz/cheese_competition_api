const create_category_string = function () {
  return function (req, res, next) {
    console.log("create_category_string");

    res.locals.category_string = "";
    res.locals.cheese.product_category_list.forEach((category) => {
      res.locals.category_string += category;
      res.locals.category_string += "-";
    });

    res.locals.category_string = res.locals.category_string.slice(0, -1);

    return next();
  };
};

module.exports = create_category_string;
