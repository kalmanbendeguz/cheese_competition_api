const express = require('express')
const router_options = require('../../../../config/router')
const router = express.Router(router_options)

const controller = require('../../../../controllers/resources/rating')

router.post('/', controller.middlewares.post)
router.get('/', controller.middlewares.get)
router.put('/', controller.middlewares.put)
router.delete('/', controller.middlewares._delete)

module.exports = router