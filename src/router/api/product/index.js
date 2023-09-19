const express = require('express')
const router = express.Router()

const controller = require('../../../controllers/resources/product')
//const c

router.post('/', controller.post)
router.get('/', controller.get)
router.put('/', controller.put)
router.delete('/', controller._delete)

module.exports = router