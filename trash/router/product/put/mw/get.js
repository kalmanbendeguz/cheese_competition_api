module.exports = async function (req, res, next) {
  try {
    console.log("mw:get(product/many/put/mw/get)");

    const Product_Model = require("../../../../../../../models/Product");

    res.locals.products = await Product_Model.find(res.locals.filter);

    //if(!res.locals.product) return res.sendStatus(404) // seamlessly proceed if no product found

    return next();
  } catch (err) {
    return next(err);
  }
};
