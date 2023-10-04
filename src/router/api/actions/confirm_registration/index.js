const express = require('express')
const router_options = require('../../../../config/router')
const router = express.Router(router_options)

const controller = require('../../../../controllers/actions/confirm_registration')

router.get('/', controller.get)

module.exports = router