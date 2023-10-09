const Model = require('../../../models/Product')
const authorizer = require('../../../authorizers/resources/product')
const filter_validator = require('../../../validators/requests/api/resources/product/filter')
const content_validator = require('../../../validators/requests/api/resources/product/content')

const alter_create = require('./alter/create')
const alter_find = require('../_layers/alter/find')
const alter_find_one = require('../_layers/alter/find_one')
const alter_update = require('./alter/update')
const alter_remove = require('./alter/remove')

const access_create = require('../_layers/access/create')
const access_find = require('../_layers/access/find')
const access_find_one = require('../_layers/access/find_one')
const access_update = require('../_layers/access/update')
const access_remove = require('../_layers/access/remove')

const transaction_create = require('../_layers/transaction/create')
const transaction_find = require('../_layers/transaction/find')
const transaction_find_one = require('../_layers/transaction/find_one')
const transaction_update = require('../_layers/transaction/update')
const transaction_remove = require('../_layers/transaction/remove')

const post = require('../../../middlewares/api/resources/post')
const get = require('../../../middlewares/api/resources/get')
const put = require('../../../middlewares/api/resources/put')
const _delete = require('../../../middlewares/api/resources/delete')

const controller = {}

// ALTER gets: data, actor, session
controller.alter_create = alter_create
controller.alter_find = alter_find(Model)
controller.alter_find_one = alter_find_one(Model)
controller.alter_update = alter_update
controller.alter_remove = alter_remove

// ACCESS gets: data, actor, session
controller.access_create = access_create(authorizer, controller.alter_create)
controller.access_find = access_find(authorizer, controller.alter_find)
controller.access_find_one = access_find_one(authorizer, controller.alter_find_one)
controller.access_update = access_update(authorizer, controller.alter_update)
controller.access_remove = access_remove(authorizer, controller.alter_remove)

// TR gets: data, actor
// TR DOES THE FOR LOOP FOR THE ARRAY!
// data = doc | array
controller.transaction_create = transaction_create(controller.access_create)
// data = filter, projection, options
controller.transaction_find = transaction_find(controller.access_find)
// data = filter, projection, options
controller.transaction_find_one = transaction_find_one(controller.access_find_one)
// data = filter, content
controller.transaction_update = transaction_update(controller.access_update)
// data = filter
controller.transaction_remove = transaction_remove(controller.access_remove)

// MW gets: req
controller.post = post(content_validator, controller.transaction_create)
controller.get = get(filter_validator, controller.transaction_find)
controller.put = put(filter_validator, content_validator, controller.transaction_update)
controller._delete = _delete(filter_validator, controller.transaction_remove)

module.exports = controller