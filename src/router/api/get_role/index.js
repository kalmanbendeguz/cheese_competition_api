const express = require('express')
const router = express.Router()

const get_role = require('../../../controllers/actions/get_role')

router.get('/', get_role)

module.exports = router