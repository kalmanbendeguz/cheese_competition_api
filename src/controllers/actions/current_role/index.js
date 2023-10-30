const authorizer = require('../../../authorizers/actions/current_role')
const validator = require('../../../validators/requests/api/actions/current_role')

const action = require('./action')

const access_read = require('../_layers/access/read')
const transaction_read = require('../_layers/transaction/read')

const get = require('../../../middlewares/api/actions/get')

const controller = {}

// action(read) gets: query, actor, session
controller.action = action

// transaction_read gets: query, actor, session
controller.transaction = {}
controller.transaction.read = transaction_read(controller.action)

// access_read gets: query, actor
controller.access = {}
controller.access.read = access_read(authorizer, controller.transaction.read)

// MW gets: req
controller.middlewares = {}
controller.middlewares.get = get(validator, controller.access.read)

module.exports = controller