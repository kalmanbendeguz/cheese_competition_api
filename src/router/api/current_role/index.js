const express = require('express')
const router = express.Router()

const current_role = require('../../../controllers/actions/current_role')

router.get('/', current_role)

module.exports = router