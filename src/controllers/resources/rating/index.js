// resource specific things

const post = (require('../_crud/create')).post(content_validator, create_controller)


const save = async (document_to_save, session) => {
    const result = await document_to_save.save({ session: session })
}

const Model = require('../../../models/Rating')
const filter_validator = require('../../../validators/controllers/resources/product/filter')
const content_validator = require('../../../validators/controllers/resources/product/content')
const schema_validator = require('../../../validators/schemas/models/Product')
const authorizer = require('../../../authorizers/resources/rating')

check_create_dependencies
generate_create_logic

//export:
/**
 * 
 * MWS:
 * post: postmw(validator)
 * get: getmw(validator)
 * put
 * delete
 * 
 * CONSISTENCY_LAYERS: (in this folder)
 * create
 * update
 * remove
 */

post_rating_middleware = require(post_middleware)(rating_content_validator_logic, transaction_create_rating)
// this is the middleware
// in middlewares/api/resources

transaction_create_rating = require(transaction_create)(rating_data, access_create_rating)
// in api_layers/transaction folder

access_create_rating = require(access_create)(rating_authorizer_logic, authorized_create_rating_document) // (data, actor,session)
// in api_layers/access folder

authorized_create_rating_document = (require(authorized_create))(rating_authorizer_logic, create_rating_document) // (data, actor, session)
// in api_layers/authorized folder

create_rating_document = require(create_rating_document) // data, session 
// in this folder

/////////////////////////////// 9. 19.

// ALTER gets: data, actor, session
//controller.alter_create = require('./alter/create')
//////controller.alter_find = require('../_layers/alter/find') (rating)
//////controller.alter_find_one = require('../_layers/alter/find_one')
//controller.alter_update = require('./alter/update')
//controller.alter_remove = require('./alter/remove')

// ACCESS gets: data, actor, session
//controller.access_create = access_create(authorizer_logic, controller.alter_create)
//////controller.access_find_one = access_find_one(authorizer_logic, alter_find_one)
//////controller.access_find = access_find_many(authorizer_logic, alter_find)
//controller.access_update = access_update(authorizer_logic, controller.alter_update)
//controller.access_remove = access_remove(authorizer_logic, controller.alter_remove)

// TR gets: data, actor
//controller.transaction_create = transaction_create(controller.access_create)
//////controller.transaction_find = transaction_find(access_find_rating)
//////controller.transaction_find_one = transaction_find_one(access_find_one_rating)
//controller.transaction_update = transaction_update(controller.access_update)
//controller.transaction_remove = transaction_remove(controller.access_remove)

// MW gets: req
//controller.post = post(validator_logic, controller.transaction_create )
//////controller.get = get(validator_logic, find_transaction)
//controller.put = put(validator_logic, controller.transaction_update)
//controller.delete = delete(validator_logic, controller.transaction_remove)