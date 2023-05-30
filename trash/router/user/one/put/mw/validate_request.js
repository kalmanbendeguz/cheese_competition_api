module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate_request(product/one/put/mw/validate_request)");
    const Joi = require("joi");

    const validator = Joi.object({
      query: Joi.object({
        _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

        public_id: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        secret_id: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
      })
        .or("_id", "public_id", "secret_id")
        .required(),

      body: Joi.object({
        // áttehetjük másik versenybe a a terméket, és át is adhatjuk másik versenyzőnek.
        competition_id: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),

        manufacturer_id: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),

        // we will ignore public id and secret id so we dont care about them here
        //public_id: Joi.string().optional().allow('').default(null),
        //secret_id: Joi.string().optional().allow('').default(null),

        // required
        product_name: Joi.string()
          .trim()
          .min(3)
          .max(25)
          .prefs({ convert: false })
          .optional(),
        // required
        factory_name: Joi.string()
          .trim()
          .min(3)
          .max(80)
          .prefs({ convert: false })
          .optional(),
        // required
        maturation_time_type: Joi.string()
          .trim()
          .valid("fresh", "matured")
          .prefs({ convert: false })
          .optional(),
        // required
        maturation_time_quantity: Joi.when("maturation_time_type", {
          is: "matured",
          then: Joi.number().integer().positive().required(),
          otherwise: Joi.forbidden(),
        }),
        // required
        maturation_time_unit: Joi.when("maturation_time_type", {
          is: "matured",
          then: Joi.string()
            .trim()
            .valid("day", "week", "month")
            .prefs({ convert: false })
            .required(),
          otherwise: Joi.forbidden(),
        }),
        // required
        milk_type: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(), // should validate based on json tree!!!!!
        // required

        product_category_list: Joi.array()
          .items(
            // should validate based on json tree!!!!!
            Joi.string().trim().min(1).prefs({ convert: false })
          )
          .min(1)
          .when("milk_type", {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.optional(),
          }),

        product_description: Joi.string()
          .trim()
          .min(25)
          .max(1000)
          .prefs({ convert: false })
          .optional(),
        // optional
        approved: Joi.boolean().optional(),
        // optional
        approval_type: Joi.when("approved", {
          is: true,
          then: Joi.string()
            .trim()
            .valid("payment", "association_member", "bypass")
            .prefs({ convert: false })
            .required(),
          otherwise: Joi.forbidden(),
        }),
        // optional
        handed_in: Joi.boolean().optional(),

        // fields not belonging to the model
        // change of plans, i dont need this.
        //manufacturer_username: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
      }).required(),
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
