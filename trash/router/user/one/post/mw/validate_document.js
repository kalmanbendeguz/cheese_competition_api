module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate_document(product/one/post/mw/validate_document)");

    const product_validator = require("../../../../../../../validators/schemas/Product");

    try {
      await product_validator.validateAsync(res.locals.product);
    } catch (err) {
      return res.status(400).json(err.details);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
