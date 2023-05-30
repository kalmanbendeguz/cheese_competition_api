module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate_document(product/one/put/mw/validate_document)");

    const allowed_judge_validator = require("../../../../../../../validators/schemas/Allowed_Judge");

    try {
      await allowed_judge_validator.validateAsync(res.locals.allowed_judge);
    } catch (err) {
      return res.status(400).json(err.details);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
