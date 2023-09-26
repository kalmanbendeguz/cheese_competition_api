
barion_payment_id: Joi.string()
.trim()
.min(1)
.prefs({ convert: false })
.when('pending', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),
barion_transaction_id: Joi.string()
.trim()
.min(1)
.prefs({ convert: false })
.when('pending', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),