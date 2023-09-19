const layer = require('../layer')

const start_transaction = require('./start_transaction')
const start_transaction_error = require('./start_transaction_error')
const accessor = require('../accessor')
const end_transaction = require('./end_transaction')
const end_transaction_error = require('./end_transaction_error')

const controller = layer(start_transaction, accessor, end_transaction, start_transaction_error, end_transaction_error)

module.exports = controller