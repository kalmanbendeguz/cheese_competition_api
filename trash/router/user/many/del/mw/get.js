module.exports = async function (req, res, next) {
  try {
    console.log("mw:get(product/many/del/mw/get)");

    const Product_Model = require("../../../../../../../models/Product");

    res.locals.products = await Product_Model.find(res.locals.filter);
    // seamlessly proceed if the array is empty

    return next();
  } catch (err) {
    return next(err);
  }
};
