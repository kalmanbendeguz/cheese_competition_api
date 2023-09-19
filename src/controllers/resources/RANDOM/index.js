const create = require('./create')
const find = require('../find')
const update = require('../update')
const remove = require('../remove')

const filter_validator = require('../../../validators/controllers/entities/product/filter')
const content_validator = require('../../../validators/controllers/entities/product/content')
const schema_validator = require('../../../validators/schemas/models/Product')




const intent = async (validated_request, session, authorizer, entity_controller) => {
    const authorized_request = authorizer(validated_request, session)
    try {
        return await entity_controller(authorized_request, session)
    } catch (error) {
        // what kind of errors can be thrown from entity?
    }
}

const transaction = (validated_request, start_session, intent) => {
    const session = start_session()
    const intent_result = intent(validated_request, session)
    if (intent_result.ok) {
        session.commit()
    } else {
        session.abort()
    }
    return intent_result
}

const post = (validator, transaction) => async (req, res) => {
    const validated_request = await validator.validateAsync(req)
    const transaction_result = await transaction(validated_request)
    return res.status(transaction_result.status).json(transaction_result.json)
}


// 1. Validate query
const remove_product_validator = require('../../../validators/requests/api/product/remove')
try {
    await remove_product_validator.validateAsync(query)
} catch (err) {
    return { code: 400, data: err.details }
}


module.exports.create = create
module.exports.content_validator = content_validator
module.exports.post = post(content_validator, tr)