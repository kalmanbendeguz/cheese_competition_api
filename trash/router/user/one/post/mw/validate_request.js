module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_request(product/one/post/mw/validate_request)')
        // GOAL: CHECK IF THE REQUEST OBJECT IS VALID ROLE-INDEPENDENTLY.
        // THAT MEANS WE VERIFY THE FORMAT OF EVERY FIELD THAT IS POSSIBLE ON THE REQUEST.

        const Joi = require('joi')

        const validator = Joi.object({
            body: Joi.object({
                username: Joi.string().trim().alphanum().min(5).max(40).required().prefs({ convert: false }),
                email: Joi.string().email().required(),
                hashed_password: Joi.string().min(1).required(),
                roles: Joi.array().items(
                    Joi.string().valid('competitor', 'judge', 'organizer')
                ).unique().min(1).required(),
                full_name: Joi.when('roles', {
                    is: Joi.array().length(1).items(Joi.string().valid('organizer')),
                    then: Joi.forbidden(),
                    otherwise: Joi.string().trim().min(1).required().prefs({ convert: false })
                }),
                contact_phone_number: Joi.when('roles', {
                    is: Joi.array().items(Joi.string().invalid('competitor')),
                    then: Joi.forbidden(),
                    otherwise: Joi.string().pattern(/^\+?\d+$/).required()
                }),
                billing_information: Joi.when('roles', {
                    is: Joi.array().items(Joi.string().invalid('competitor')),
                    then: Joi.forbidden(),
                    otherwise: Billing_Information_Validator.required()
                }),

                // only for competitor, but this is not set at registration
                /*association_member: Joi.when('roles', {
                    is: Joi.array().items(Joi.string().invalid('competitor')),
                    then: Joi.forbidden(),
                    otherwise: Joi.boolean().required()
                }),*/
                // only for judge, but this is not set at registration
                /*table_leader: Joi.when('roles', {
                    is: Joi.array().items(Joi.string().invalid('judge')),
                    then: Joi.forbidden(),
                    otherwise: Joi.boolean().required()
                }),*/
                //this is internally set
                //registration_temporary: Joi.boolean().required(),
                // this is internally set
                /*confirm_registration_id: Joi.when('registration_temporary', {
                    is: true,
                    then: Joi.string().trim().lowercase().length(32).alphanum().required().prefs({ convert: false }),
                    otherwise: Joi.forbidden()
                })*/
            }).required()
        }).unknown(true)

        try {
            await validator.validateAsync(req)
        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}