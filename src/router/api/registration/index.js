const express = require('express')
const router = express.Router()

const registration = require('../../../controllers/actions/registration')

router.post('/', registration)

module.exports = router