module.exports = async function (req, res, next) {
  try {
    console.log("mw:get(product/many/get/mw/get)");

    const Product_Model = require("../../../../../../../models/Product");

    res.locals.products = await Product_Model.find(
      res.locals.filter,
      res.locals.projection,
      res.locals.options
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
