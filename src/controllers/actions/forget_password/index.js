const authorizer = require('../../../authorizers/actions/forget_password')
const validator = require('../../../validators/requests/api/actions/forget_password')

const action = require('./action')

const access_write = require('../_layers/access/write')
const transaction_write = require('../_layers/transaction/write')

const post = require('../../../middlewares/api/actions/post')

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
controller.middlewares.post = post(validator, controller.access.write)

module.exports = controller