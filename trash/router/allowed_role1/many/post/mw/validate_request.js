module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate_request(product/many/post/mw/validate_request)");
    // GOAL: CHECK IF THE REQUEST OBJECT IS VALID ROLE-INDEPENDENTLY.
    // THAT MEANS WE VERIFY THE FORMAT OF EVERY FIELD THAT IS POSSIBLE ON THE REQUEST.

    const Joi = require("joi");

    const validator = Joi.object({
      body: Joi.array()
        .items(
          Joi.object({
            email: Joi.string().email().required(),
          })
        )
        .unique()
        .min(1)
        .required(), // minden unique-nál: meggyőződni arról, hogy az object típusokat is mélyen összehasonlítja egymással. ha nem, akkor saját komparátort kell írni mindenhova !!!
    }).unknown(true);

    try {
      await validator.validateAsync(req);
    } catch (err) {
      return res.status(400).json(err.details);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
