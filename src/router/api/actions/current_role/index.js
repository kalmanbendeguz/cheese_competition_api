const express = require('express')
const router_options = require('../../../../config/router')
const router = express.Router(router_options)

const controller = require('../../../../controllers/actions/current_role')

router.get('/', controller.middlewares.get)

module.exports = router