const authorizer = require('../../../authorizers/actions/confirm_registration')
const validator = require('../../../validators/requests/api/actions/confirm_registration')

const action = require('./action')

const access_write = require('../_layers/access/write')
const transaction_write = require('../_layers/transaction/write')

const get = require('../../../middlewares/api/actions/get')

const controller = {}

// action(write) gets: query, body, actor, session
controller.action = action

// transaction_write gets: query, body, actor, session
controller.transaction = {}
controller.transaction.write = transaction_write(controller.action)

// access_write gets: query, body, actor
controller.access = {}
controller.access.write = access_write(authorizer, controller.transaction.write)

// MW gets: req
controller.middlewares = {}
controller.middlewares.get = get(validator, controller.access.write)

module.exports = controller