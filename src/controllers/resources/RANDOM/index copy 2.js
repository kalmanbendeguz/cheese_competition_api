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

//const controller = {
//    post: post,
//    get: get,
//    put: put,
//    delete: _delete
//}

module.exports = controller

const default_function = (produce, call, process, produce_error, process_error) => async (...p) => {
    let produced
    try { produced = await produce(p) } catch (error) { return produce_error(error) }

    const result = await call(produced)

    let processed // processed =
    try { processed = await process(result) } catch (error) { return process_error(error) }
    return processed
}

const default_api_middleware = (validate, call, process, produce_error, process_error) => async (req, res) => {
    let validated_req
    try { validated_req = await validate(req) } catch (error) { return produce_error(error) }

    const result = await call(validated_req)

    let processed // = res.status(...).json ()
    try { processed = await process(result) } catch (error) { return process_error(error) }
    return processed
    return res.status(200).json({})
}

module.exports = (produce, call, process, produce_error, process_error) => async (p) => {
    let produced
    try { produced = await produce(p) } catch (error) { return produce_error(error) }

    const result = await call(produced)

    let processed
    try { processed = await process(result) } catch (error) { return process_error(error) }
    return processed
}

// save ()


const middleware = (validate_request, controller, send_response, validate_request_error, send_response_error)
const controller = (start_transaction, access, end_transaction, start_transaction_error, end_transaction_error)
const access = (accessor, find, returner, accessor_error, returner_error)
const find = (finder, arrayize, returner, finder_error, returner_error)
const arrayize = (arrayizer, authorize, returner, arrayizer_error, returner_error)
const authorize = (authorizer_pre, alter, authorizer_project, authorizer_pre_error, authorizer_project_error)
const alter = (check_dependencies, generate, update_dependents, check_dependencies_error, update_dependents_error)
const generate = (generator, construct, returner, generator_error, returner_error)
const construct = (constructor, insert, returner, construct_error, returner_error)
const insert = (validator, save, returner, validator_error, returner_error)
const save = (saver, do_nothing, returner, saver_error, returner_error)

// what we know for sure: the steps for c/r/u/d are the described steps. this is implementation independent.

/**

UPDATE:
MW PRE
MW POST
MW PRE-STATIC
MW POST-STATIC
CONTROLLER PRE
CONTROLLER POST
CONTROLLER PRE-STATIC
CONTROLLER POST-STATIC
ACCESSOR PRE
ACCESSOR POST
ACCESSOR PRE-STATIC
ACCESSOR POST-STATIC
FINDER PRE
FINDER POST
FINDER PRE-STATIC
FINDER POST-STATIC
ARRAYIZER PRE
ARRAYIZER POST
ARRAYIZER PRE-STATIC
ARRAYIZER POST-STATIC
AUTHORIZER PRE
AUTHORIZER POST
AUTHORIZER PRE-STATIC
AUTHORIZER POST-STATIC
ALTER PRE
ALTER POST
ALTER PRE-STATIC
ALTER POST-STATIC
GENERATE PRE
GENERATE POST
GENERATE PRE-STATIC
GENERATE POST-STATIC
UPDATE PRE
UPDATE POST
UPDATE PRE-STATIC
UPDATE POST-STATIC
VALIDATOR PRE
VALIDATOR POST
VALIDATOR PRE-STATIC
VALIDATOR POST-STATIC
SAVER PRE: it produces a saved document. the save call will just be a dummy function.
SAVER POST
SAVER PRE-STATIC
SAVER POST-STATIC
 */