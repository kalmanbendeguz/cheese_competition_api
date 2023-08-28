const express = require('express')
const router = express.Router()

const forget_password = require('../../../controllers/actions/forget_password')

router.post('/', forget_password)

module.exports = router