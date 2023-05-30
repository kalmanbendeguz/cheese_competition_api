module.exports = async function (req, res, next) {
  try {
    console.log("mw:validate(product/many/get/mw/validate)");

    // success if req is valid for this request role-independently
    // fail if invalid
    const Joi = require("joi");

    // todo: exact, vagy partial keresés lehetőségének megadása, search by range lehetőségének megadása,
    // egyéb
    const req_validator = Joi.object({
      query: Joi.object({
        _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
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
        product_name: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        factory_name: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        maturation_time_type: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        maturation_time_quantity: Joi.number().integer().positive().optional(),
        maturation_time_unit: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        milk_type: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        product_category_list: Joi.array()
          .items(Joi.string().trim().min(1).prefs({ convert: false }))
          .optional()
          .min(1),
        approved: Joi.boolean().optional(),
        approval_type: Joi.string()
          .trim()
          .min(1)
          .prefs({ convert: false })
          .optional(),
        handed_in: Joi.boolean().optional(),

        // fields not belonging to the model // change of plans, i dont need this
        //competition_name: Joi.string().trim().optional().min(1).prefs({ convert: false }),
        //archived: Joi.boolean().optional(),
        //manufacturer_username: Joi.string().trim().optional().min(1).prefs({ convert: false }), // we dont need this

        // sorting
        sort_by: Joi.array()
          .items(
            Joi.object({
              key: Joi.string()
                .trim()
                .required()
                .valid(
                  "createdAt",
                  "updatedAt",
                  "public_id",
                  "secret_id",
                  "product_name",
                  "factory_name"
                )
                .prefs({ convert: false }),
              order: Joi.string()
                .trim()
                .required()
                .valid("asc", "desc")
                .prefs({ convert: false }),
            }).unknown(false)
          )
          .unique()
          .min(1)
          .optional(),
        // todo: sort by maturation time (külön metódus/logika kell hozzá)
        // todo: nyelvfüggő sorting. (máshogy nem lehet? backenden van egyáltalán nyelv? nem kéne!!! ha a frontend
        // paginationt csinál akkor ez mégis hogy lesz megoldva? tiltsuk le a nyelvfüggő sortingot hiszen ez valójában
        // egy csoportosítás/szűrés művelet?) szívem szerint letiltanám.

        // pagination
        page: Joi.number().integer().positive().optional(),
        page_size: Joi.number().integer().positive().optional(),

        // projection
        projection: Joi.array()
          .items(
            Joi.string().trim().min(1).required().prefs({ convert: false })
          )
          .unique()
          .min(1)
          .optional(),
      }).required(),
    }).unknown(true);

    try {
      await req_validator.validateAsync(req);
    } catch (err) {
      return res.status(400).json(err.details);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
