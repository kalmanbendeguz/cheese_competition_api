// resource specific things

const post = (require('../_crud/create')).post(content_validator, create_controller)


const save = async (document_to_save, session) => {
    const result = await document_to_save.save({ session: session })
}

const Model = require('../../../models/Rating')
const filter_validator = require('../../../validators/controllers/entities/product/filter')
const content_validator = require('../../../validators/controllers/entities/product/content')
const schema_validator = require('../../../validators/schemas/models/Product')
const authorizer = require('../../../authorizers/entities/rating')

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

post_rating_middleware = require(post_middleware)(rating_content_validator_logic,transaction_create_rating)
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