const express = require('express')
const router_options = require('../../../config/router')
const router = express.Router(router_options)


const active_password_reset = require('./active_password_reset')
router.use('/active_password_reset', active_password_reset)

const allowed_role = require('./allowed_role')
router.use('/allowed_role', allowed_role)

const competition = require('./competition')
router.use('/competition', competition)

const competition__user = require('./competition__user')
router.use('/competition__user', competition__user)

const entry_fee_payment = require('./entry_fee_payment')
router.use('/entry_fee_payment', entry_fee_payment)

const product = require('./product')
router.use('/product', product)

const rating = require('./rating')
router.use('/rating', rating)

const rating_picture = require('./rating_picture')
router.use('/rating_picture', rating_picture)

const user = require('./user')
router.use('/user', user)


module.exports = router