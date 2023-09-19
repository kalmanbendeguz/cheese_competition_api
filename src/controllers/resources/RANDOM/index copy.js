// WE STILL NEED TO PROJECT SOMEWHERE

/**
* ROUTER LOOKS LIKE THIS: *

const express = require('express')
const router = express.Router()

const controller = require('../../../controllers/resources/rating')

router.post('/', controller.post)
router.get('/', controller.get)
router.put('/', controller.put)
router.delete('/', controller.delete)

module.exports = router
*/

const post = require('../../../middlewares/api/resources/post')
const create = require('../_create')
const start_session = require('...')
const attempts = require('../_attempts')
const attempt = require('../_attempt')
const operation = require('../_operation')
const alter_create = require('./create')
const alter_update = require('./update')
const alter_remove = require('./remove')
const generate = require('../_generate')
const construct = require('../_construct')
const insert = require('../_insert')
const save = require('../_save')

// Entity-specific
const filter_validator = require('../../../validators/controllers/entities/product/filter')

const schema_validator = require('../../../validators/schemas/models/Product')
const authorizer = require('../../../authorizers/entities/rating')
const model = require('../../../models/Rating')




controller.operation = operation

controller.attempt = attempt(controller.authorizer, controller.operation)

controller.start_session = start_session
controller.attempts = attempts(controller.attempt)

controller.create = create(controller.start_session, controller.attempts)

controller.post = post(controller.content_validator, controller.create)

const save_document = model.create // mongoose Model.create({doc}, {session:session}) // this is the original syntax

const creation = require('../CREATE_DOCUMENT')(model, model.create)


const create_controller = require('../RESOURCE_CONTROLLER')(alter_create)
const update_controller = require('../RESOURCE_CONTROLLER')(alter_update)
const remove_controller = require('../RESOURCE_CONTROLLER')(alter_remove)

const authorization = require('../AUTHORIZATION')(authorizer, resource_controller)

const one_many_adapter = require('../one_manyadapter')(authorization)

const transaction = require('../TRANSACTION')(start_session, one_many_adapter)








const intent = async (validated_request, session, authorizer, entity_controller) => {
    const authorized_request = authorizer(validated_request, session)
    try {
        return await entity_controller(authorized_request, session)
    } catch (error) {
        // what kind of errors can be thrown from entity?
    }
}

//const transaction = (validated_request, start_session, intent) => {
//    const session = start_session()
//    const intent_result = intent(validated_request, session)
//    if (intent_result.ok) {
//        session.commit()
//    } else {
//        session.abort()
//    }
//    return intent_result
//}



// 1. Validate query
const remove_product_validator = require('../../../validators/requests/api/product/remove')
try {
    await remove_product_validator.validateAsync(query)
} catch (err) {
    return { code: 400, data: err.details }
}

// entity specific:
// filter_validator: filter_validator,
// content_validator: content_validator,
// schema_validator: schema_validator,
// authorizer: authorizer,
// alter_create: alter_create,
// alter_update: alter_update,
// alter_remove: alter_remove,
// generate: generate,
// model: model,


const create = require('../create')()
const content_validator = require('../../../validators/controllers/resources/rating/content')

const post = require('../../../middlewares/api/resources/post')(content_validator, transaction)

const controller = {
    post: post,
    get: get,
    put: put,
    delete: _delete
}

module.exports = controller