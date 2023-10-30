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
controller.alter = {}
controller.alter.create = alter_create
controller.alter.find = alter_find(Model)
controller.alter.find_one = alter_find_one(Model)
controller.alter.update = alter_update
controller.alter.remove = alter_remove

// ACCESS gets: data, actor, session
controller.access = {}
controller.access.create = access_create(authorizer, controller.alter.create)
controller.access.find = access_find(authorizer, controller.alter.find)
controller.access.find_one = access_find_one(authorizer, controller.alter.find_one)
controller.access.update = access_update(authorizer, controller.alter.update)
controller.access.remove = access_remove(authorizer, controller.alter.remove)

// TR gets: data, actor
// data = content | array
controller.transaction = {}
controller.transaction.create = transaction_create(controller.access.create)
// data = filter, projection, options
controller.transaction.find = transaction_find(controller.access.find)
// data = filter, projection, options
controller.transaction.find_one = transaction_find_one(controller.access.find_one)
// data = filter, content
controller.transaction.update = transaction_update(controller.access.update)
// data = filter
controller.transaction.remove = transaction_remove(controller.access.remove)

// MW gets: req
controller.middlewares = {}
controller.middlewares.post = post(content_validator, controller.transaction.create)
controller.middlewares.get = get(filter_validator, controller.transaction.find)
controller.middlewares.put = put(filter_validator, content_validator, controller.transaction.update)
controller.middlewares._delete = _delete(filter_validator, controller.transaction.remove)

module.exports = controller