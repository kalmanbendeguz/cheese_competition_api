const express = require('express')
const router = express.Router()

const logout = require('../../../controllers/actions/logout')

router.post('/', logout)

module.exports = router