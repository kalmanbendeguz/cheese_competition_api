module.exports = async function (req, res, next) {
  try {
    console.log("mw:remove(product/many/del/mw/remove)");

    const ids_to_delete = res.locals.products.map((product) => product._id);

    const Product_Model = require("../../../../../../../models/Product");

    await Product_Model.deleteMany({
      _id: { $in: ids_to_delete },
    });

    return next();
  } catch (err) {
    return next(err);
  }
};
