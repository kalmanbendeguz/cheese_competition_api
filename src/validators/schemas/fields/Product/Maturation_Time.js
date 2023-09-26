maturation_time_quantity: Joi.number().integer().positive()
.when('maturation_time_type', {
    is: 'matured',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),
maturation_time_unit: Joi.string()
.trim()
.required()
.valid('day', 'week', 'month')
.prefs({ convert: false })
.when('maturation_time_type', {
    is: 'matured',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),