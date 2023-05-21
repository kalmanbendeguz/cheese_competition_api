module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate')
        const validator = require('../../../../validators/requests/api/authenticated')

        try {
            await validator.validateAsync(req)
        } catch (err) {
            return res.status(400).send({ message: 'validation_failed' })
        }

        return next()
        // let's validate req.user
        // validating req.query
        // we don't need to.

        // validating req.body
        // we don't need to.


        // we get a request that is one request (req)

        // it has a req.user. i should validate req.user. but not here.
        // it can have query params
        // it can have cookies in its headers

        // it can have a body: we dont care.
        // it has as header with a jwt in it: we dont care.


        // validate req object:
        // sure: query
        // sure: body (no need for get request)
        // sure: cookies

        // if we query many documents, what does the query filter SHOULD have?
        // ANSWER: nothing.
        // if the filter is empty, it is fine, since we have a default for everything, or we dont even need default.


        // session: it is added by backend, the only thing that can come with a request is a session_id cookie. but i still think
        // that i need to validate this ....

        // etc... (see express documentation...)

        // if we validate BEFORE calling the session middleware, req.session WON'T BE PRESENT ! )
        // req.session? (not there by default, it is added by middleware. 

        // (no need, because validation is before authentication) req.user?
        // (no need, because it would not even reach the endpoint if the method is not right) method

        // + PAGE NUMBER (1-...)
        // + HOW MANY ITEMS ON ONE PAGE (1-...)

        /*competition_id: {
            type: ObjectId,
            ref: Competition_Model,
            index: true,
        },
        manufacturer_id: {
            type: ObjectId,
            ref: User_Model,
            index: true,
        },
        public_id: {
            type: String,
            unique: true,
        },
        secret_id: {
            type: String,
            unique: true,
        },
        product_name: {
            type: String,
            index: true,
        },
        factory_name: {
            type: String,
            index: true,
        },
        maturation_time_type: {
            type: String,
            index: true,
        },
        maturation_time_quantity: {
            type: Number,
        },
        maturation_time_unit: {
            type: String,
        },
        milk_type: {
            type: String,
            index: true,
        },
        product_category_list: {
            type: [{
                type: String,
            }],
            index: true,
        },
        product_description: {
            type: String,
        },
        approved: {
            type: Boolean,
            index: true,
            default: false,
        },
        approval_type: {
            type: String,
            index: true,
        },
        handed_in: {
            type: Boolean,
            index: true,
            default: false,
        }*/


    } catch (err) {
        return next(err)
    }
}