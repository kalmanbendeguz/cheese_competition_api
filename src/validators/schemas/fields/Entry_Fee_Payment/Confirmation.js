confirm_payment_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),

    pending: Joi.boolean().required(),