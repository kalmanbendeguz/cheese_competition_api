module.exports = async function (req, res, next) {
  try {
    console.log("mw:create(product/one/post/mw/create)");

    const Product_Model = require("../../../../../../../models/Product");

    res.locals.products = res.locals._products.map(
      (product) => new Product_Model(product)
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
