const express = require('express')
const router_options = require('../../../../config/router')
const router = express.Router(router_options)

const controller = require('../../../../controllers/actions/forget_password')

router.post('/', controller.middlewares.post)

module.exports = router