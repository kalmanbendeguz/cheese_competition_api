const valid_currencies = require('../../../static/valid_currencies.json')

amount: Joi.object().instance(Decimal128).when('pending', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),
currency: Joi.string().valid(...valid_currencies).when('pending', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
}),