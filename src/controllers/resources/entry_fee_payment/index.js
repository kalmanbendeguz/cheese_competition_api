const Model = require('../../../models/Entry_Fee_Payment')
const authorizer = require('../../../authorizers/resources/entry_fee_payment')
const filter_validator = require('../../../validators/requests/api/resources/entry_fee_payment/filter')
const content_validator = require('../../../validators/requests/api/resources/entry_fee_payment/content')
// const schema_validator = require('../../../validators/schemas/models/Entry_Fee_Payment')
// schema validator not needed because the alter function will import it.

const access_create = require('../_layers/access/create')
const access_find = require('../_layers/access/find')
const access_find_one = require('../_layers/access/find_one')
const access_update = require('../_layers/access/update')
const access_remove = require('../_layers/access/remove')

const post = require('../../../middlewares/api/resources/post')
const get = require('../../../middlewares/api/resources/get')
const put = require('../../../middlewares/api/resources/put')
const _delete = require('../../../middlewares/api/resources/delete')

const controller = {}

// ALTER gets: data, actor, session
controller.alter_create = require('./alter/create')
controller.alter_find = require('../_layers/alter/find')(Model)
controller.alter_find_one = require('../_layers/alter/find_one')(Model)
controller.alter_update = require('./alter/update')
controller.alter_remove = require('./alter/remove')

// ACCESS gets: data, actor, session
controller.access_create = access_create(authorizer, controller.alter_create)
controller.access_find = access_find(authorizer, controller.alter_find)
controller.access_find_one = access_find_one(authorizer, controller.alter_find_one)
controller.access_update = access_update(authorizer, controller.alter_update)
controller.access_remove = access_remove(authorizer, controller.alter_remove)

// TR gets: data, actor
controller.transaction_create = transaction_create(controller.access_create)
controller.transaction_find = transaction_find(controller.access_find)
controller.transaction_find_one = transaction_find_one(controller.access_find_one)
controller.transaction_update = transaction_update(controller.access_update)
controller.transaction_remove = transaction_remove(controller.access_remove)

// MW gets: req
controller.post = post(content_validator, controller.transaction_create)
controller.get = get(filter_validator, controller.transaction_find)
controller.put = put(filter_validator, content_validator, controller.transaction_update)
controller.delete = _delete(filter_validator, controller.transaction_remove)

module.exports = controller