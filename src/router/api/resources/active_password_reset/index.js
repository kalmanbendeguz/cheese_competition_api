const express = require('express')
const router_options = require('../../../../config/router')
const router = express.Router(router_options)

const controller = require('../../../../controllers/resources/active_password_reset')

router.post('/', controller.post)
router.get('/', controller.get)
router.put('/', controller.put)
router.delete('/', controller._delete)

module.exports = router