module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate_document(product/many/post/mw/validate_document)");

    const allowed_judge_validator = require("../../../../../../../validators/schemas/Allowed_Judge");

    try {
      const validator_promises = res.locals.allowed_judges.map(
        (allowed_judge) => allowed_judge_validator.validateAsync(allowed_judge)
      );
      //results = [product_validator.validateAsync(product1), product_validator.validateAsync(product2)]
      // this is an array of promises :) !!

      await Promise.all(validator_promises);
      // we dont need the results.
      // if any promises fail, then it will JUMP TO THE CATCH BLOCK
    } catch (err) {
      return res.status(400).json(err.details);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
